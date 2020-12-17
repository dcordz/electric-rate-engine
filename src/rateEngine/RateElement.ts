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

export interface RateElementInterface {
  rateElementType: RateElementType;
  rateComponents: Array<RateComponentInterface & BillingDeterminantFactoryInterface>;
  name: string;
}

class RateElement {
  private _rateComponents: Array<RateComponent>;
  name: string;
  type: RateElementType;
  classification?: string;

  constructor({ rateElementType, name, rateComponents }: RateElementInterface, loadProfile: LoadProfile) {
    this.name = name;
    this.type = rateElementType;

    this._rateComponents = rateComponents.map(({ charge, name, ...rest }) => {
      const billingDeterminants = BillingDeterminantFactory.make(rateElementType, { ...rest }, loadProfile);

      // set the classification based on the billing determinant
      this.classification = billingDeterminants.rateClassificationType;
      return new RateComponent({ charge, name, billingDeterminants });
    });

    if (RateCalculator.shouldValidate) {
      ValidatorFactory.make(rateElementType, rateComponents, loadProfile).validate().reportErrors();
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
