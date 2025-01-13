import BillingDeterminants from './_BillingDeterminants';
import times from 'lodash/times';
import { RateElementClassification, BillingDeterminantsUnits } from '../constants';
const MONTHS_PER_YEAR = 12;
class FixedPerMonth extends BillingDeterminants {
    constructor() {
        super(...arguments);
        this.rateElementType = 'Fixed Per Month';
        this.rateElementClassification = RateElementClassification.FIXED;
        this.units = BillingDeterminantsUnits.MONTHS;
    }
    calculate() {
        return times(MONTHS_PER_YEAR, () => 1);
    }
}
export default FixedPerMonth;
