import { sum } from "lodash"
import RateElement from './RateElement.ts';
import type { RateCalculatorInterface, RateElementFilterArgs } from './types/index.ts';
import { RATE_ELEMENT_SORT_ORDER } from "./constants/index.ts";

class RateCalculator {
  private _rateElements: Array<RateElement>;
  name: string | undefined;
  utilityName: string | undefined;
  applicability: string | undefined;
  minimumBillAmount: number | undefined;
  static shouldValidate = true;
  static shouldLogValidationErrors = true;

  constructor({
    name,
    utilityName,
    applicability,
    minimumBillAmount,
    rateElements,
    loadProfile,
  }: RateCalculatorInterface) {
    this.name = name;
    this.utilityName = utilityName;
    this.applicability = applicability;
    this.minimumBillAmount = minimumBillAmount;
    this._rateElements = rateElements.map((element, idx): RateElement => {
      return new RateElement(
        element,
        loadProfile,
        rateElements.filter((_, i) => i !== idx),
      );
    });
  }

  rateElements({ ...filters }: RateElementFilterArgs = {}): Array<RateElement> {
    return this._rateElements
      .filter((element) => element.matches(filters))
      .sort((a, b) => (RATE_ELEMENT_SORT_ORDER[a.type] ?? 0) - (RATE_ELEMENT_SORT_ORDER[b.type] ?? 0));
  }

  annualCost({ ...filters }: RateElementFilterArgs = {}): number {
    return sum(this.rateElements(filters).map((element) => element.annualCost()));
  }
}

export default RateCalculator;
