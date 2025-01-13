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
import groupBy from 'lodash/groupBy';
import sumBy from 'lodash/sumBy';
import times from 'lodash/times';
import BillingDeterminants from './_BillingDeterminants';
import { RateElementClassification, BillingDeterminantsUnits } from '../constants';
import convertInfinities from '../utils/convertInfinities';
class BlockedTiersInMonths extends BillingDeterminants {
    constructor(_a, loadProfile) {
        var { min, max } = _a, filters = __rest(_a, ["min", "max"]);
        super();
        this.rateElementType = 'Blocked Tier';
        this.rateElementClassification = RateElementClassification.ENERGY;
        this.units = BillingDeterminantsUnits.KWH;
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
        const expandedLoadProfile = this.filteredLoadProfile().expanded();
        const monthlyExpandedLoadProfile = Object.values(groupBy(expandedLoadProfile, 'month'));
        const kwhByMonth = monthlyExpandedLoadProfile.map((loadProfiles) => sumBy(loadProfiles, 'load'));
        return times(12, i => {
            const kwh = kwhByMonth[i] || 0;
            if (kwh < mins[i]) {
                return 0;
            }
            if (kwh > maxes[i]) {
                return maxes[i] - mins[i];
            }
            return kwh - mins[i];
        });
    }
}
export default BlockedTiersInMonths;
