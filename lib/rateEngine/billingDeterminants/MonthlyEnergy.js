import BillingDeterminants from './_BillingDeterminants';
import { BillingDeterminantsUnits, RateElementClassification } from '../constants';
class MonthlyEnergy extends BillingDeterminants {
    constructor(loadProfile) {
        super();
        this.rateElementType = 'Monthly Energy';
        this.rateElementClassification = RateElementClassification.ENERGY;
        this.units = BillingDeterminantsUnits.KWH;
        this._loadProfile = loadProfile;
    }
    calculate() {
        return this._loadProfile.sumByMonth();
    }
}
export default MonthlyEnergy;
