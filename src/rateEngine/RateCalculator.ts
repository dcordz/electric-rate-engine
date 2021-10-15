import RateElement, { RateElementInterface } from './RateElement';
import LoadProfile from './LoadProfile';

import sum from 'lodash/sum';

export interface RateCalculatorInterface {
  name: string;
  utilityName?: string;
  applicability?: string;
  minimumBillAmount?: number;
  rateElements: Array<RateElementInterface>;
  loadProfile: LoadProfile;
}

class RateCalculator {
  private _rateElements: Array<RateElement>;
  utilityName: string | undefined;
  applicability: string | undefined;
  minimumBillAmount: number | undefined;
  static shouldValidate: Boolean = true;
  static shouldLogValidationErrors: Boolean = true;

  constructor({ name, utilityName, applicability, minimumBillAmount, rateElements, loadProfile }: RateCalculatorInterface) {
    this.utilityName = utilityName;
    this.applicability = applicability;
    this.minimumBillAmount = minimumBillAmount;
    this._rateElements = rateElements.map((element, idx): RateElement => {
      return new RateElement(
        element,
        loadProfile,
        rateElements.filter((_, i) => i !== idx)
      );
    });
  }

  rateElements(): Array<RateElement> {
    return this._rateElements;
  }

  annualCost(): number {
    return sum(this.rateElements().map((element) => element.annualCost()));
  }
}

export default RateCalculator;
