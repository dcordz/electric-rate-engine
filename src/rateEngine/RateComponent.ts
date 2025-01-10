import { mean as _mean, sum, times } from 'lodash';
import BillingDeterminants from './billingDeterminants/_BillingDeterminants';
import { RateElementClassification } from './constants';
import type { RateComponentArgs } from './types';
import { multiplyDecimals } from './utils/decimals';

const MONTHS_PER_YEAR = 12;

class RateComponent {
  charge: Array<number>;
  name: string;
  private _billingDeterminants: BillingDeterminants;
  private _classification: RateElementClassification;

  constructor({ charge, name, billingDeterminants }: RateComponentArgs) {
    this.charge = typeof charge === 'number' ? times(MONTHS_PER_YEAR, () => charge) : charge;
    this.name = name;
    this._billingDeterminants = billingDeterminants;
    this._classification = billingDeterminants.rateElementClassification;
  }

  costs(): Array<number> {
    return this._billingDeterminants.map((determinant, idx) => multiplyDecimals(determinant, this.charge[idx]));
  }

  billingDeterminants(): Array<number> {
    return this._billingDeterminants.all();
  }

  typicalMonthlyCost(): number {
    return _mean(this.costs());
  }

  costForMonth(month: number): number {
    return this.costs()[month];
  }

  typicalBillingDeterminant(): number {
    return this._billingDeterminants.mean();
  }

  billingDeterminantsForMonth(month: number): number {
    return this.billingDeterminants()[month];
  }

  annualCost(): number {
    return sum(this.costs());
  }

  rateElementClassification() {
    return this._billingDeterminants.rateElementClassification;
  }

  formatCharge(): string {
    switch (this._classification) {
      case RateElementClassification.ENERGY: {
        return _mean(this.charge).toFixed(5);
      }
      default: {
        return _mean(this.charge).toFixed(2);
      }
    }
  }

  formatBillingDeterminant(): string {
    const determinant = Math.round(this.typicalBillingDeterminant());
    const units =
      determinant === 1 && this._billingDeterminants.units.endsWith('s')
        ? this._billingDeterminants.units.slice(0, this._billingDeterminants.units.length - 1)
        : this._billingDeterminants.units;
    return `${determinant} ${units}`;
  }
}

export default RateComponent;
