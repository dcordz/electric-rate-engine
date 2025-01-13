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
import BillingDeterminantsFactory from './BillingDeterminantsFactory';
import PriceProfile from './PriceProfile';
import RateComponent from './RateComponent';
import RateElement from './RateElement';
export default class RateComponentsFactory {
    static make(rateElement, loadProfile, otherRateElements) {
        const convertedRateElement = this.preprocess(rateElement, loadProfile, otherRateElements);
        const billingDeterminantsSet = BillingDeterminantsFactory.make(convertedRateElement, loadProfile);
        return billingDeterminantsSet.map(({ charge, name, billingDeterminants }) => {
            return new RateComponent({ charge, name, billingDeterminants });
        });
    }
    static preprocess(rateElement, loadProfile, otherRateElements) {
        switch (rateElement.rateElementType) {
            case 'SurchargeAsPercent': {
                const rateComponents = rateElement.rateComponents.flatMap((_a) => {
                    var { name: rateComponentName, charge } = _a, filterArgs = __rest(_a, ["name", "charge"]);
                    return otherRateElements
                        .map((element) => new RateElement(element, loadProfile, []))
                        .filter((element) => element.matches(filterArgs))
                        .map((element) => {
                        return {
                            charge,
                            name: `${rateComponentName} surcharge - ${element.name}`,
                            rateElement: element,
                        };
                    });
                });
                return Object.assign(Object.assign({}, rateElement), { rateComponents });
            }
            case 'HourlyEnergy': {
                const priceProfile = new PriceProfile(rateElement.priceProfile, { year: loadProfile.year });
                return Object.assign(Object.assign({}, rateElement), { rateComponents: priceProfile.expanded().map(({ price: charge, hourOfYear }) => ({
                        charge,
                        name: `${rateElement.name} - Hour ${hourOfYear}`,
                        hourOfYear,
                    })) });
            }
            default: {
                return rateElement;
            }
        }
    }
}
