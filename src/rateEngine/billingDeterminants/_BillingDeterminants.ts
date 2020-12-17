import { default as lodashMean } from 'lodash/mean';

abstract class BillingDeterminants {
  abstract rateElementType: string;
  abstract rateClassificationType: string;
  abstract units: string;
  abstract calculate(): Array<number>;

  mean(): number {
    return lodashMean(this.calculate());
  }

  all(): Array<number> {
    return this.calculate();
  }

  map(callback: (arg: number, idx: number) => any) {
    return this.calculate().map(callback);
  }
}

export default BillingDeterminants;
