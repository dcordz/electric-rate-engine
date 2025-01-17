"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var times_1 = __importDefault(require("lodash/times"));
var mean_1 = __importDefault(require("lodash/mean"));
var sum_1 = __importDefault(require("lodash/sum"));
var decimals_1 = require("./utils/decimals");
var MONTHS_PER_YEAR = 12;
var RateComponent = /** @class */ (function () {
    function RateComponent(_a) {
        var charge = _a.charge, name = _a.name, billingDeterminants = _a.billingDeterminants;
        this.charge = typeof charge === 'number' ? (0, times_1.default)(MONTHS_PER_YEAR, function () { return charge; }) : charge;
        this.name = name;
        this._billingDeterminants = billingDeterminants;
    }
    RateComponent.prototype.costs = function () {
        var _this = this;
        return this._billingDeterminants.map(function (determinant, idx) { return (0, decimals_1.multiplyDecimals)(determinant, _this.charge[idx]); });
    };
    RateComponent.prototype.billingDeterminants = function () {
        return this._billingDeterminants.all();
    };
    RateComponent.prototype.typicalMonthlyCost = function () {
        return (0, mean_1.default)(this.costs());
    };
    RateComponent.prototype.costForMonth = function (month) {
        return this.costs()[month];
    };
    RateComponent.prototype.typicalBillingDeterminant = function () {
        return this._billingDeterminants.mean();
    };
    RateComponent.prototype.billingDeterminantsForMonth = function (month) {
        return this.billingDeterminants()[month];
    };
    RateComponent.prototype.annualCost = function () {
        return (0, sum_1.default)(this.costs());
    };
    RateComponent.prototype.rateElementClassification = function () {
        return this._billingDeterminants.rateElementClassification;
    };
    return RateComponent;
}());
exports.default = RateComponent;
