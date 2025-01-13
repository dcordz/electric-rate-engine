import times from 'lodash/times';
import mean from 'lodash/mean';
import sum from 'lodash/sum';
import { multiplyDecimals } from './utils/decimals';
const MONTHS_PER_YEAR = 12;
class RateComponent {
    constructor({ charge, name, billingDeterminants }) {
        this.charge = typeof charge === 'number' ? times(MONTHS_PER_YEAR, () => charge) : charge;
        this.name = name;
        this._billingDeterminants = billingDeterminants;
    }
    costs() {
        return this._billingDeterminants.map((determinant, idx) => multiplyDecimals(determinant, this.charge[idx]));
    }
    billingDeterminants() {
        return this._billingDeterminants.all();
    }
    typicalMonthlyCost() {
        return mean(this.costs());
    }
    costForMonth(month) {
        return this.costs()[month];
    }
    typicalBillingDeterminant() {
        return this._billingDeterminants.mean();
    }
    billingDeterminantsForMonth(month) {
        return this.billingDeterminants()[month];
    }
    annualCost() {
        return sum(this.costs());
    }
    rateElementClassification() {
        return this._billingDeterminants.rateElementClassification;
    }
}
export default RateComponent;
