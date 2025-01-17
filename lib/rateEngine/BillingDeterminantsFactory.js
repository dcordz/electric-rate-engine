"use strict";
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
var AnnualDemand_1 = __importDefault(require("./billingDeterminants/AnnualDemand"));
var BlockedTiersInDays_1 = __importDefault(require("./billingDeterminants/BlockedTiersInDays"));
var BlockedTiersInMonths_1 = __importDefault(require("./billingDeterminants/BlockedTiersInMonths"));
var DemandPerDay_1 = __importDefault(require("./billingDeterminants/DemandPerDay"));
var DemandTiersInMonths_1 = __importDefault(require("./billingDeterminants/DemandTiersInMonths"));
var DemandTimeOfUse_1 = __importDefault(require("./billingDeterminants/DemandTimeOfUse"));
var EnergyTimeOfUse_1 = __importDefault(require("./billingDeterminants/EnergyTimeOfUse"));
var FixedPerDay_1 = __importDefault(require("./billingDeterminants/FixedPerDay"));
var FixedPerMonth_1 = __importDefault(require("./billingDeterminants/FixedPerMonth"));
var HourlyEnergy_1 = __importDefault(require("./billingDeterminants/HourlyEnergy"));
var MonthlyDemand_1 = __importDefault(require("./billingDeterminants/MonthlyDemand"));
var MonthlyEnergy_1 = __importDefault(require("./billingDeterminants/MonthlyEnergy"));
var SurchargeAsPercent_1 = __importDefault(require("./billingDeterminants/SurchargeAsPercent"));
var BillingDeterminantsFactory = /** @class */ (function () {
    function BillingDeterminantsFactory() {
    }
    BillingDeterminantsFactory.make = function (rateElement, loadProfile) {
        var rateElementType = rateElement.rateElementType, rateComponents = rateElement.rateComponents;
        switch (rateElementType) {
            case 'EnergyTimeOfUse':
                return rateComponents.map(function (_a) {
                    var charge = _a.charge, name = _a.name, args = __rest(_a, ["charge", "name"]);
                    return ({ charge: charge, name: name, billingDeterminants: new EnergyTimeOfUse_1.default(args, loadProfile) });
                });
            case 'BlockedTiersInDays':
                return rateComponents.map(function (_a) {
                    var charge = _a.charge, name = _a.name, args = __rest(_a, ["charge", "name"]);
                    return ({ charge: charge, name: name, billingDeterminants: new BlockedTiersInDays_1.default(args, loadProfile) });
                });
            case 'BlockedTiersInMonths':
                return rateComponents.map(function (_a) {
                    var charge = _a.charge, name = _a.name, args = __rest(_a, ["charge", "name"]);
                    return ({ charge: charge, name: name, billingDeterminants: new BlockedTiersInMonths_1.default(args, loadProfile) });
                });
            case 'FixedPerDay':
                return rateComponents.map(function (_a) {
                    var charge = _a.charge, name = _a.name;
                    return ({ charge: charge, name: name, billingDeterminants: new FixedPerDay_1.default() });
                });
            case 'FixedPerMonth':
                return rateComponents.map(function (_a) {
                    var charge = _a.charge, name = _a.name;
                    return ({ charge: charge, name: name, billingDeterminants: new FixedPerMonth_1.default() });
                });
            case 'MonthlyDemand':
                return rateComponents.map(function (_a) {
                    var charge = _a.charge, name = _a.name;
                    return ({ charge: charge, name: name, billingDeterminants: new MonthlyDemand_1.default(loadProfile) });
                });
            case 'AnnualDemand':
                return rateComponents.map(function (_a) {
                    var charge = _a.charge, name = _a.name;
                    return ({ charge: charge, name: name, billingDeterminants: new AnnualDemand_1.default(loadProfile) });
                });
            case 'MonthlyEnergy':
                return rateComponents.map(function (_a) {
                    var charge = _a.charge, name = _a.name;
                    return ({ charge: charge, name: name, billingDeterminants: new MonthlyEnergy_1.default(loadProfile) });
                });
            case 'SurchargeAsPercent':
                return rateComponents.map(function (_a) {
                    var charge = _a.charge, name = _a.name, args = __rest(_a, ["charge", "name"]);
                    return ({ charge: charge, name: name, billingDeterminants: new SurchargeAsPercent_1.default(args) });
                });
            case 'HourlyEnergy':
                return rateComponents.map(function (_a) {
                    var charge = _a.charge, name = _a.name, args = __rest(_a, ["charge", "name"]);
                    return ({ charge: charge, name: name, billingDeterminants: new HourlyEnergy_1.default(args, loadProfile) });
                });
            case 'DemandTiersInMonths':
                return rateComponents.map(function (_a) {
                    var charge = _a.charge, name = _a.name, args = __rest(_a, ["charge", "name"]);
                    return ({ charge: charge, name: name, billingDeterminants: new DemandTiersInMonths_1.default(args, loadProfile) });
                });
            case 'DemandTimeOfUse':
                return rateComponents.map(function (_a) {
                    var charge = _a.charge, name = _a.name, args = __rest(_a, ["charge", "name"]);
                    return ({ charge: charge, name: name, billingDeterminants: new DemandTimeOfUse_1.default(args, loadProfile) });
                });
            case 'DemandPerDay':
                return rateComponents.map(function (_a) {
                    var charge = _a.charge, name = _a.name, args = __rest(_a, ["charge", "name"]);
                    return ({ charge: charge, name: name, billingDeterminants: new DemandPerDay_1.default(args, loadProfile) });
                });
            default:
                throw new Error("Unknown rateElementType: ".concat(rateElementType));
        }
    };
    return BillingDeterminantsFactory;
}());
exports.default = BillingDeterminantsFactory;
