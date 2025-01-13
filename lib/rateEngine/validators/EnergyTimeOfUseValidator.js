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
import Validator from './_Validator';
import expandedDates from '../utils/expandedDates';
import LoadProfileFilter from '../LoadProfileFilter';
class EnergyTimeOfUseValidator extends Validator {
    constructor(args, loadProfile) {
        super();
        this._args = args;
        this._year = loadProfile.year;
    }
    validate() {
        const dates = expandedDates(this._year);
        const filters = this.filters();
        const errors = [];
        dates.forEach((date) => {
            const matches = filters.filter(({ filter }) => filter.matches(date));
            if (matches.length === 0) {
                errors.push({
                    english: `No filter set found that matches ${JSON.stringify(date)}`,
                    data: date,
                    type: 'none',
                });
            }
            else if (matches.length > 1) {
                errors.push({
                    english: `${matches.length} filter sets found that match ${JSON.stringify(date)}`,
                    data: Object.assign(Object.assign({}, date), { rateComponents: matches.map(({ name }) => name) }),
                    type: 'duplicate',
                });
            }
        });
        if (errors.length > 0) {
            this.addError('Energy Time Of Use Error', errors);
        }
        return this;
    }
    filters() {
        return this._args.map((_a) => {
            var { name } = _a, filters = __rest(_a, ["name"]);
            return ({ name, filter: new LoadProfileFilter(filters) });
        });
    }
}
export default EnergyTimeOfUseValidator;
