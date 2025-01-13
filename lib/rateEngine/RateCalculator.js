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
import sum from 'lodash/sum';
import RateElement from './RateElement';
class RateCalculator {
    constructor({ name, utilityName, applicability, minimumBillAmount, rateElements, loadProfile }) {
        this.name = name;
        this.utilityName = utilityName;
        this.applicability = applicability;
        this.minimumBillAmount = minimumBillAmount;
        this._rateElements = rateElements.map((element, idx) => {
            return new RateElement(element, loadProfile, rateElements.filter((_, i) => i !== idx));
        });
    }
    rateElements(_a = {}) {
        var filters = __rest(_a, []);
        return this._rateElements.filter((element) => element.matches(filters));
    }
    annualCost(_a = {}) {
        var filters = __rest(_a, []);
        return sum(this.rateElements(filters).map((element) => element.annualCost()));
    }
}
RateCalculator.shouldValidate = true;
RateCalculator.shouldLogValidationErrors = true;
export default RateCalculator;
