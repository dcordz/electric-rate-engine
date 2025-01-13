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
import maxBy from 'lodash/maxBy';
import times from 'lodash/times';
import LoadProfileFilter from './LoadProfileFilter';
import LoadProfileScaler from './LoadProfileScaler';
import { addDecimals } from './utils/decimals';
import expandedDates from './utils/expandedDates';
const isLoadProfileObject = (p) => {
    return 'expanded' in p && typeof p['expanded'] === 'function';
};
const isNumberArray = (p) => {
    return typeof p[0] === 'number';
};
class LoadProfile {
    constructor(loadProfileOrExpandedOrExisting, options) {
        this._year = options.year;
        if (isLoadProfileObject(loadProfileOrExpandedOrExisting)) {
            this._expanded = loadProfileOrExpandedOrExisting.expanded();
        }
        else if (isNumberArray(loadProfileOrExpandedOrExisting)) {
            this._expanded = this._buildFromNumberArray(loadProfileOrExpandedOrExisting);
        }
        else {
            this._expanded = loadProfileOrExpandedOrExisting;
        }
    }
    expanded() {
        return this._expanded;
    }
    loadValues() {
        return this.expanded().map(({ load }) => load);
    }
    filterBy(filters) {
        const filter = new LoadProfileFilter(filters);
        const filteredLoadProfile = this.expanded().map((_a) => {
            var { load } = _a, detailedLoadProfileHour = __rest(_a, ["load"]);
            return filter.matches(detailedLoadProfileHour) ? load : 0;
        });
        return new LoadProfile(filteredLoadProfile, { year: this._year });
    }
    loadShift(amount, filters) {
        const filter = new LoadProfileFilter(filters);
        const shiftedLoadProfile = this.expanded().map((detailedLoadProfileHour) => filter.matches(detailedLoadProfileHour) ? detailedLoadProfileHour.load + amount : detailedLoadProfileHour.load);
        return new LoadProfile(shiftedLoadProfile, { year: this._year });
    }
    sumByMonth() {
        const sums = times(12, () => 0);
        this.expanded().forEach(({ load, month }) => {
            sums[month] = addDecimals(sums[month], load);
        });
        return sums;
    }
    maxByMonth() {
        const months = times(12, (i) => i);
        const expanded = this.expanded();
        return months.map((m) => {
            const monthLoads = expanded.filter(({ month }) => m === month).map(({ load }) => load);
            return Math.max(...monthLoads);
        });
    }
    byMonth() {
        const months = times(12, () => []);
        this.expanded().forEach(({ load, month }) => {
            months[month].push(load);
        });
        return months;
    }
    sum() {
        return this.expanded().reduce((sum, { load }) => addDecimals(sum, load), 0);
    }
    count() {
        return this.expanded().length;
    }
    get length() {
        return this.count();
    }
    get year() {
        return this._year;
    }
    average() {
        return this.sum() / this.count();
    }
    max() {
        var _a, _b;
        if (this.count() === 0) {
            return 0;
        }
        // lodash's maxBy interface returns T | undefined so we need the ?? 0 here although it should never be 0
        return (_b = (_a = maxBy(this.expanded(), 'load')) === null || _a === void 0 ? void 0 : _a.load) !== null && _b !== void 0 ? _b : 0;
    }
    loadFactor() {
        if (this.count() === 0) {
            return 0;
        }
        return this.sum() / (this.count() * this.max());
    }
    scale(options) {
        return new LoadProfileScaler(this, options);
    }
    aggregate(otherLoadProfile) {
        return new LoadProfile(this.expanded().map(({ load }, idx) => {
            return addDecimals(load, otherLoadProfile.expanded()[idx].load);
        }), { year: this._year });
    }
    _buildFromNumberArray(loadProfileNumberArray) {
        const dates = expandedDates(this._year);
        if (!loadProfileNumberArray.length) {
            throw new Error('Cannot build LoadProfile instance. Instantiated with an empty loadProfile array.');
        }
        if (dates.length !== loadProfileNumberArray.length) {
            const isLeapYearInvolved = Math.abs(dates.length - loadProfileNumberArray.length) === 24;
            throw new Error(`Load profile length didn't match annual hours length.${isLeapYearInvolved ? " It's likely a leap year is involved." : ' Maybe a leap year is involved.'}`);
        }
        return loadProfileNumberArray.map((load, i) => (Object.assign({ load }, dates[i])));
    }
}
export default LoadProfile;
