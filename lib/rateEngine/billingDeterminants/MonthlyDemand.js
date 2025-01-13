import BillingDeterminants from './_BillingDeterminants';
import { RateElementClassification, BillingDeterminantsUnits } from '../constants';
class MonthlyDemand extends BillingDeterminants {
    constructor(loadProfile) {
        super();
        this.rateElementType = 'Monthly Demand';
        this.rateElementClassification = RateElementClassification.DEMAND;
        this.units = BillingDeterminantsUnits.KW;
        this._loadProfile = loadProfile;
    }
    calculate() {
        return this._loadProfile.byMonth().map(monthOfLoads => Math.max(...monthOfLoads));
    }
}
export default MonthlyDemand;
