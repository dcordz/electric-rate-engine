import { mean as lodashMean } from 'lodash';
import { BillingDeterminantsUnits, ERateElementType, RateElementClassification } from '../constants';

abstract class BillingDeterminants {
  abstract rateElementType: ERateElementType;
  abstract rateElementClassification: RateElementClassification;
  abstract units: BillingDeterminantsUnits;
  abstract calculate(): Array<number>;

  mean(): number {
    return lodashMean(this.calculate());
  }

  all(): Array<number> {
    return this.calculate();
  }

  map(callback: (arg: number, idx: number) => number) {
    return this.calculate().map(callback);
  }
}

export default BillingDeterminants;
