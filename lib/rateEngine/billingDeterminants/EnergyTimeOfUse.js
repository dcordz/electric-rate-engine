import BillingDeterminants from './_BillingDeterminants';
import { RateElementClassification, BillingDeterminantsUnits } from '../constants';
class EnergyTimeOfUse extends BillingDeterminants {
    constructor(filters, loadProfile) {
        super();
        this.rateElementType = 'Time Of Use';
        this.rateElementClassification = RateElementClassification.ENERGY;
        this.units = BillingDeterminantsUnits.KWH;
        this._filters = filters;
        this._loadProfile = loadProfile;
    }
    filteredLoadProfile() {
        return this._loadProfile.filterBy(this._filters);
    }
    calculate() {
        return this.filteredLoadProfile().sumByMonth();
    }
}
export default EnergyTimeOfUse;
