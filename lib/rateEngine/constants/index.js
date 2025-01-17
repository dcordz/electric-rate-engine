"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingDeterminantsUnits = exports.BillingCategory = exports.RateElementClassification = void 0;
var RateElementClassification;
(function (RateElementClassification) {
    RateElementClassification["ENERGY"] = "energy";
    RateElementClassification["DEMAND"] = "demand";
    RateElementClassification["FIXED"] = "fixed";
    RateElementClassification["SURCHARGE"] = "surcharge";
})(RateElementClassification || (exports.RateElementClassification = RateElementClassification = {}));
;
var BillingCategory;
(function (BillingCategory) {
    BillingCategory["TAX"] = "tax";
    BillingCategory["SUPPLY"] = "supply";
    BillingCategory["DELIVERY"] = "delivery";
})(BillingCategory || (exports.BillingCategory = BillingCategory = {}));
;
var BillingDeterminantsUnits;
(function (BillingDeterminantsUnits) {
    BillingDeterminantsUnits["KWH"] = "kWh";
    BillingDeterminantsUnits["KW"] = "kW";
    BillingDeterminantsUnits["DAYS"] = "days";
    BillingDeterminantsUnits["MONTHS"] = "months";
    BillingDeterminantsUnits["DOLLARS"] = "dollars";
})(BillingDeterminantsUnits || (exports.BillingDeterminantsUnits = BillingDeterminantsUnits = {}));
;
