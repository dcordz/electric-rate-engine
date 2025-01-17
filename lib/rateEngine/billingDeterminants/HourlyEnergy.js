"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _BillingDeterminants_1 = __importDefault(require("./_BillingDeterminants"));
var expandedDates_1 = __importDefault(require("../utils/expandedDates"));
var constants_1 = require("../constants");
var HourlyEnergy = /** @class */ (function (_super) {
    __extends(HourlyEnergy, _super);
    function HourlyEnergy(_a, loadProfile) {
        var hourOfYear = _a.hourOfYear;
        var _this = _super.call(this) || this;
        _this.rateElementType = 'Hourly Energy';
        _this.rateElementClassification = constants_1.RateElementClassification.ENERGY;
        _this.units = constants_1.BillingDeterminantsUnits.KWH;
        _this._hourOfYear = hourOfYear;
        _this._load = loadProfile.expanded()[hourOfYear].load;
        _this._year = loadProfile.year;
        return _this;
    }
    HourlyEnergy.prototype.calculate = function () {
        var month = (0, expandedDates_1.default)(this._year)[this._hourOfYear].month;
        var months = Array(12).fill(0);
        months[month] = this._load;
        return months;
    };
    return HourlyEnergy;
}(_BillingDeterminants_1.default));
exports.default = HourlyEnergy;
