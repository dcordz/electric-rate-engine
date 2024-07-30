import RateComponent from './RateComponent';
import RateCalculator from './RateCalculator';
import BillingDeterminantFactory from './BillingDeterminantFactory';
import sum from 'lodash/sum';
import LoadProfile from './LoadProfile';
import ValidatorFactory from './ValidatorFactory';
import SurchargeAsPercent from './billingDeterminants/SurchargeAsPercent';
import PriceProfile from './PriceProfile';
import { BillingCategory, RateElementClassification } from './constants';
import type {
  RateElementType,
  RateElementInterface,
  RateElementFilterArgs,
  ValidatorError as Error,
  RateComponentInterface,
  SurchargeAsPercentArgs,
} from './types';

class RateComponentsFactory {
  static make(
    rateElement: RateElementInterface,
    loadProfile: LoadProfile,
    otherRateElements: RateElementInterface[],
  ) {
    const {rateElementType, rateComponents, name} = rateElement;
    switch (rateElementType) {
      case 'SurchargeAsPercent':
        return rateComponents.map(({ name: rateComponentName, charge, ...filterArgs }: RateComponentInterface) => {
          return otherRateElements
            .filter((element: RateElementInterface) => (
              new RateElement(element, loadProfile, []).matches(filterArgs)
            ))
            .map((element: RateElementInterface) => ({
              charge,
              name: `${rateComponentName} surcharge - ${element.name}`,
              rateElementType: 'SurchargeAsPercent',
              rateElement: new RateElement(element, loadProfile, []),
            }))
        }).flat();
      case 'HourlyEnergy':
        const priceProfile = new PriceProfile(rateElement.priceProfile, {year: loadProfile.year})
        return priceProfile.expanded().map(({price, hourOfYear}) => ({
          name: `${name} - Hour ${hourOfYear}`,
          charge: price,
          hourOfYear,
          rateElementType: 'HourlyEnergy',
        }))
      default:
        return rateComponents;
    }
  }
}

class RateElement {
  private _rateComponents: Array<RateComponent>;
  id?: string;
  name: string;
  type: RateElementType;
  classification?: RateElementClassification;
  billingCategory?: BillingCategory;
  errors: Array<Error> = [];

  constructor(rateElementArgs: RateElementInterface, loadProfile: LoadProfile, otherRateElements: Array<RateElementInterface> = []) {
    const { id, rateElementType, name, billingCategory } = rateElementArgs;
    this.id = id;
    this.name = name;
    this.type = rateElementType;
    this.billingCategory = billingCategory;

    const rateComponents = RateComponentsFactory.make(
      rateElementArgs,
      loadProfile,
      otherRateElements
    );

    this._rateComponents = rateComponents.map(({ charge, name, ...rest }) => {
      const billingDeterminants = BillingDeterminantFactory.make(rateElementType, { ...rest }, loadProfile);

      // set the classification based on the billing determinant
      this.classification = billingDeterminants.rateElementClassification;
      return new RateComponent({ charge, name, billingDeterminants });
    });

    if (RateCalculator.shouldValidate) {
      const validator = ValidatorFactory.make(rateElementType, rateComponents, loadProfile).validate();
      RateCalculator.shouldLogValidationErrors && validator.reportErrors();
      this.errors = validator.allErrors();
    }
  }

  rateComponents(): Array<RateComponent> {
    return this._rateComponents;
  }

  annualCost(): number {
    return sum(this.rateComponents().map((component) => component.annualCost()));
  }

  costs(): Array<number> {
    const costs = Array(12).fill(0);

    this.rateComponents().forEach((component) => {
      component.costs().forEach((cost, monthIdx) => {
        costs[monthIdx] += cost;
      });
    });

    return costs;
  }

  matches({ billingCategories, classifications, ids }: RateElementFilterArgs) {
    return (billingCategories ? billingCategories.includes(this.billingCategory) : true) &&
      (classifications ? classifications.includes(this.classification) : true) &&
      (ids ? ids.includes(this.id) : true);
  }
}

export default RateElement;
