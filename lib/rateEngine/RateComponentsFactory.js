"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BillingDeterminantsFactory_1 = __importDefault(require("./BillingDeterminantsFactory"));
var PriceProfile_1 = __importDefault(require("./PriceProfile"));
var RateComponent_1 = __importDefault(require("./RateComponent"));
var RateElement_1 = __importDefault(require("./RateElement"));
var RateComponentsFactory = /** @class */ (function () {
    function RateComponentsFactory() {
    }
    RateComponentsFactory.make = function (rateElement, loadProfile, otherRateElements) {
        var convertedRateElement = this.preprocess(rateElement, loadProfile, otherRateElements);
        var billingDeterminantsSet = BillingDeterminantsFactory_1.default.make(convertedRateElement, loadProfile);
        return billingDeterminantsSet.map(function (_a) {
            var charge = _a.charge, name = _a.name, billingDeterminants = _a.billingDeterminants;
            return new RateComponent_1.default({ charge: charge, name: name, billingDeterminants: billingDeterminants });
        });
    };
    RateComponentsFactory.preprocess = function (rateElement, loadProfile, otherRateElements) {
        switch (rateElement.rateElementType) {
            case 'SurchargeAsPercent': {
                var rateComponents = rateElement.rateComponents.flatMap(function (_a) {
                    var rateComponentName = _a.name, charge = _a.charge, filterArgs = __rest(_a, ["name", "charge"]);
                    return otherRateElements
                        .map(function (element) { return new RateElement_1.default(element, loadProfile, []); })
                        .filter(function (element) { return element.matches(filterArgs); })
                        .map(function (element) {
                        return {
                            charge: charge,
                            name: "".concat(rateComponentName, " surcharge - ").concat(element.name),
                            rateElement: element,
                        };
                    });
                });
                return __assign(__assign({}, rateElement), { rateComponents: rateComponents });
            }
            case 'HourlyEnergy': {
                var priceProfile = new PriceProfile_1.default(rateElement.priceProfile, { year: loadProfile.year });
                return __assign(__assign({}, rateElement), { rateComponents: priceProfile.expanded().map(function (_a) {
                        var charge = _a.price, hourOfYear = _a.hourOfYear;
                        return ({
                            charge: charge,
                            name: "".concat(rateElement.name, " - Hour ").concat(hourOfYear),
                            hourOfYear: hourOfYear,
                        });
                    }) });
            }
            default: {
                return rateElement;
            }
        }
    };
    return RateComponentsFactory;
}());
exports.default = RateComponentsFactory;
