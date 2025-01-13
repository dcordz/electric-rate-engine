import {mean} from 'lodash-es';
import { BillingDeterminantsUnits, ERateElementType, RateElementClassification } from '../constants/index.ts';

abstract class BillingDeterminants {
  abstract rateElementType: ERateElementType;
  abstract rateElementClassification: RateElementClassification;
  abstract units: BillingDeterminantsUnits;
  abstract calculate(): Array<number>;

  mean(): number {
    return mean(this.calculate());
  }

  all(): Array<number> {
    return this.calculate();
  }

  map(callback: (arg: number, idx: number) => number) {
    return this.calculate().map(callback);
  }

  format(): string {
    const determinant = Math.round(this.mean());
    const units =
      determinant === 1 && this.units.endsWith('s') ? this.units.slice(0, this.units.length - 1) : this.units;
    return `${determinant} ${units}`;
  }
}

export default BillingDeterminants;
