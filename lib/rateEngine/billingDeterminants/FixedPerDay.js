import BillingDeterminants from './_BillingDeterminants';
import { RateElementClassification, BillingDeterminantsUnits } from '../constants';
import { daysPerMonth } from '../utils/assumptions';
class FixedPerDay extends BillingDeterminants {
    constructor() {
        super(...arguments);
        this.rateElementType = 'Fixed Per Day';
        this.rateElementClassification = RateElementClassification.FIXED;
        this.units = BillingDeterminantsUnits.DAYS;
    }
    calculate() {
        return daysPerMonth();
    }
}
export default FixedPerDay;
