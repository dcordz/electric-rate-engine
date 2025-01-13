import BillingDeterminants from './_BillingDeterminants';
import { RateElementClassification, BillingDeterminantsUnits } from '../constants';
class DemandTimeOfUse extends BillingDeterminants {
    constructor(filters, loadProfile) {
        super();
        this.rateElementType = 'Time Of Use';
        this.rateElementClassification = RateElementClassification.DEMAND;
        this.units = BillingDeterminantsUnits.KW;
        this._filters = filters;
        this._loadProfile = loadProfile;
    }
    filteredLoadProfile() {
        return this._loadProfile.filterBy(this._filters);
    }
    calculate() {
        return this.filteredLoadProfile().maxByMonth();
    }
}
export default DemandTimeOfUse;
