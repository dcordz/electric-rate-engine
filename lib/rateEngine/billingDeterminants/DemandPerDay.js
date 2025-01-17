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
var times_1 = __importDefault(require("lodash/times"));
var groupBy_1 = __importDefault(require("lodash/groupBy"));
var sum_1 = __importDefault(require("lodash/sum"));
var constants_1 = require("../constants");
var DemandPerDay = /** @class */ (function (_super) {
    __extends(DemandPerDay, _super);
    function DemandPerDay(filters, loadProfile) {
        var _this = _super.call(this) || this;
        _this.rateElementType = 'Demand Per Day';
        _this.rateElementClassification = constants_1.RateElementClassification.DEMAND;
        _this.units = constants_1.BillingDeterminantsUnits.KW;
        _this._filters = filters;
        _this._loadProfile = loadProfile;
        return _this;
    }
    DemandPerDay.prototype.filteredLoadProfile = function () {
        return this._loadProfile.filterBy(this._filters);
    };
    DemandPerDay.prototype.calculate = function () {
        var months = (0, times_1.default)(12, function (i) { return i; });
        var expanded = this.filteredLoadProfile().expanded();
        return months.map(function (m) {
            var monthLoads = expanded.filter(function (_a) {
                var month = _a.month;
                return m === month;
            });
            // chunk monthly loads by day (31-element array for January, etc.)
            var dayLoads = Object.values((0, groupBy_1.default)(monthLoads, function (val) { return val.date; }));
            // sum the max demand for each day in the month
            return (0, sum_1.default)(dayLoads.map(function (day) { return Math.max.apply(Math, day.map(function (_a) {
                var load = _a.load;
                return load;
            })); }));
        });
    };
    return DemandPerDay;
}(_BillingDeterminants_1.default));
exports.default = DemandPerDay;
