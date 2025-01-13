import BillingDeterminants from './_BillingDeterminants';
import times from 'lodash/times';
import groupBy from 'lodash/groupBy';
import sum from 'lodash/sum';
import { RateElementClassification, BillingDeterminantsUnits } from '../constants';
class DemandPerDay extends BillingDeterminants {
    constructor(filters, loadProfile) {
        super();
        this.rateElementType = 'Demand Per Day';
        this.rateElementClassification = RateElementClassification.DEMAND;
        this.units = BillingDeterminantsUnits.KW;
        this._filters = filters;
        this._loadProfile = loadProfile;
    }
    filteredLoadProfile() {
        return this._loadProfile.filterBy(this._filters);
    }
    calculate() {
        const months = times(12, (i) => i);
        const expanded = this.filteredLoadProfile().expanded();
        return months.map((m) => {
            const monthLoads = expanded.filter(({ month }) => m === month);
            // chunk monthly loads by day (31-element array for January, etc.)
            const dayLoads = Object.values(groupBy(monthLoads, (val) => val.date));
            // sum the max demand for each day in the month
            return sum(dayLoads.map((day) => Math.max(...day.map(({ load }) => load))));
        });
    }
}
export default DemandPerDay;
