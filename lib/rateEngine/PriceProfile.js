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
import { addDecimals } from './utils/decimals';
import expandedDates from './utils/expandedDates';
const isPriceProfileObject = (p) => {
    return 'expanded' in p && typeof p['expanded'] === 'function';
};
const isNumberArray = (p) => {
    return typeof p[0] === 'number';
};
class PriceProfile {
    constructor(priceProfileOrExpandedOrExisting, options) {
        this._year = options.year;
        if (isPriceProfileObject(priceProfileOrExpandedOrExisting)) {
            this._expanded = priceProfileOrExpandedOrExisting.expanded();
        }
        else if (isNumberArray(priceProfileOrExpandedOrExisting)) {
            this._expanded = this._buildFromNumberArray(priceProfileOrExpandedOrExisting);
        }
        else {
            this._expanded = priceProfileOrExpandedOrExisting;
        }
    }
    expanded() {
        return this._expanded;
    }
    priceValues() {
        return this.expanded().map(({ price }) => price);
    }
    filterBy(filters) {
        const filter = new LoadProfileFilter(filters);
        const filteredLoadProfile = this.expanded().map((_a) => {
            var { price } = _a, detailedPriceProfileHour = __rest(_a, ["price"]);
            return filter.matches(detailedPriceProfileHour) ? price : 0;
        });
        return new PriceProfile(filteredLoadProfile, { year: this._year });
    }
    maxByMonth() {
        const months = times(12, (i) => i);
        const expanded = this.expanded();
        return months.map((m) => {
            const monthPrices = expanded.filter(({ month }) => m === month).map(({ price }) => price);
            return Math.max(...monthPrices);
        });
    }
    sum() {
        return this.expanded().reduce((sum, { price }) => addDecimals(sum, price), 0);
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
        return (_b = (_a = maxBy(this.expanded(), 'price')) === null || _a === void 0 ? void 0 : _a.price) !== null && _b !== void 0 ? _b : 0;
    }
    _buildFromNumberArray(priceProfile) {
        const dates = expandedDates(this._year);
        if (dates.length !== priceProfile.length) {
            throw new Error("Price profile length didn't match annual hours length. Maybe a leap year is involved?");
        }
        return (this._expanded = priceProfile.map((price, i) => (Object.assign({ price }, dates[i]))));
    }
}
export default PriceProfile;
