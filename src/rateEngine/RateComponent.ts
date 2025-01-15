
import BillingDeterminants from './billingDeterminants/_BillingDeterminants.ts';
import { MONTHS, RateElementClassification } from './constants/index.ts';
import type { RateComponentArgs } from './types/index.ts';
import { multiplyDecimals } from './utils/decimals.ts';
import { sum, mean as _mean } from './utils/index.ts';

class RateComponent {
  charge: Array<number>;
  name: string;
  private _billingDeterminants: BillingDeterminants;
  private _classification: RateElementClassification;

  constructor({ charge, name, billingDeterminants }: RateComponentArgs) {
    this.charge = typeof charge === 'number' ? MONTHS.map(() => charge) : charge;
    this.name = name;
    this._billingDeterminants = billingDeterminants;
    this._classification = billingDeterminants.rateElementClassification;
  }

  costs(): Array<number> {
    return this._billingDeterminants.map((determinant, idx) => multiplyDecimals(determinant, this.charge[idx]));
  }

  getDeterminants(): BillingDeterminants {
    return this._billingDeterminants;
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
}

export default RateComponent;
