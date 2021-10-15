import RateComponent from './RateComponent';
import RateCalculator from './RateCalculator';
import BillingDeterminantFactory, {
  BillingDeterminantFactoryInterface,
  RateElementType,
} from './BillingDeterminantFactory';
import sum from 'lodash/sum';
import LoadProfile from './LoadProfile';
import ValidatorFactory from './ValidatorFactory';
import { RateComponentInterface } from './RateComponent';
import { Error } from './validators/_Validator';
import SurchargeAsPercent from './billingDeterminants/SurchargeAsPercent';

export interface RateElementInterface {
  id?: string;
  rateElementType: RateElementType;
  rateComponents?: Array<RateComponentInterface & BillingDeterminantFactoryInterface>;
  name: string;
  billingCategory?: BillingCategory;
  rateElementIds?: Array<string>;
  percent?: number;
  appliesToAll ?: boolean;
}

export enum RateElementClassification {
  ENERGY = 'energy',
  DEMAND = 'demand',
  FIXED = 'fixed',
  SURCHARGE = 'surcharge',
};

// Since the billing category is passed into a RateCalculator as part of the
// arguments, this enum exists for documentation rather than actual type safety.
// Once this compiles to JS, nothing will prevent an application from passing in
// an abitrary string for the billingCategory.
export enum BillingCategory {
  TAX = 'tax',
  SUPPLY = 'supply',
  DELIVERY = 'delivery',
}

class RateComponentsFactory {
  static make(
    {id, rateElementType: type, rateElementIds = [], rateComponents, name, percent, appliesToAll}: RateElementInterface,
    loadProfile,
    otherRateElements,
  ): Array<RateComponentInterface> {
    switch (type) {
      case 'SurchargeAsPercent':
        return otherRateElements.filter(({id}) => {
          return appliesToAll ? true : rateElementIds.includes(id)
        }).map((element: RateElementInterface) => ({
          charge: percent / 100,
          name: `${name} surcharge - ${element.name}`,
          rateElementType: 'SurchargeAsPercent',
          rateElement: new RateElement(element, loadProfile, []),
        }));
      default:
        return rateComponents;
    }
  }
}

class RateElement {
  private _rateComponents: Array<RateComponent>;
  id: string;
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
}

export default RateElement;
