import BillingDeterminants from './_BillingDeterminants';
import times from 'lodash/times';
import { RateElementClassification, BillingDeterminantsUnits } from '../constants';
class AnnualDemand extends BillingDeterminants {
    constructor(loadProfile) {
        super();
        this.rateElementType = 'Annual Demand';
        this.rateElementClassification = RateElementClassification.DEMAND;
        this.units = BillingDeterminantsUnits.KW;
        this._loadProfile = loadProfile;
    }
    calculate() {
        const annualMax = this._loadProfile.max();
        return times(12, () => annualMax);
    }
}
export default AnnualDemand;
