var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import times from 'lodash/times';
import { BillingDeterminantsUnits, RateElementClassification } from '../constants';
import convertInfinities from '../utils/convertInfinities';
import BillingDeterminants from './_BillingDeterminants';
class DemandTiersInMonths extends BillingDeterminants {
    constructor(_a, loadProfile) {
        var { min, max } = _a, filters = __rest(_a, ["min", "max"]);
        super();
        this.rateElementType = 'Blocked Demand Tier';
        this.rateElementClassification = RateElementClassification.DEMAND;
        this.units = BillingDeterminantsUnits.KW;
        this._loadProfile = loadProfile;
        this._min = convertInfinities(min);
        this._max = convertInfinities(max);
        this._filters = filters;
    }
    filteredLoadProfile() {
        return this._loadProfile.filterBy(this._filters);
    }
    calculate() {
        const mins = this._min;
        const maxes = this._max;
        const kwByMonth = this.filteredLoadProfile().maxByMonth();
        return times(12, i => {
            const kw = kwByMonth[i] || 0;
            if (kw < mins[i]) {
                return 0;
            }
            if (kw > maxes[i]) {
                return maxes[i] - mins[i];
            }
            return kw - mins[i];
        });
    }
}
export default DemandTiersInMonths;
