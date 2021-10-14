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

export interface RateElementInterface {
  rateElementType: RateElementType;
  rateComponents: Array<RateComponentInterface & BillingDeterminantFactoryInterface>;
  name: string;
  billingCategory: BillingCategory;
}

export enum RateElementClassification {
  ENERGY = 'energy',
  DEMAND = 'demand',
  FIXED = 'fixed',
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

class RateElement {
  private _rateComponents: Array<RateComponent>;
  name: string;
  type: RateElementType;
  classification?: RateElementClassification;
  billingCategory?: BillingCategory;
  errors: Array<Error> = [];

  constructor({ rateElementType, name, rateComponents, billingCategory }: RateElementInterface, loadProfile: LoadProfile) {
    this.name = name;
    this.type = rateElementType;
    this.billingCategory = billingCategory;

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
