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
var times_1 = __importDefault(require("lodash/times"));
var constants_1 = require("../constants");
var convertInfinities_1 = __importDefault(require("../utils/convertInfinities"));
var _BillingDeterminants_1 = __importDefault(require("./_BillingDeterminants"));
var DemandTiersInMonths = /** @class */ (function (_super) {
    __extends(DemandTiersInMonths, _super);
    function DemandTiersInMonths(_a, loadProfile) {
        var _this = this;
        var min = _a.min, max = _a.max, filters = __rest(_a, ["min", "max"]);
        _this = _super.call(this) || this;
        _this.rateElementType = 'Blocked Demand Tier';
        _this.rateElementClassification = constants_1.RateElementClassification.DEMAND;
        _this.units = constants_1.BillingDeterminantsUnits.KW;
        _this._loadProfile = loadProfile;
        _this._min = (0, convertInfinities_1.default)(min);
        _this._max = (0, convertInfinities_1.default)(max);
        _this._filters = filters;
        return _this;
    }
    DemandTiersInMonths.prototype.filteredLoadProfile = function () {
        return this._loadProfile.filterBy(this._filters);
    };
    DemandTiersInMonths.prototype.calculate = function () {
        var mins = this._min;
        var maxes = this._max;
        var kwByMonth = this.filteredLoadProfile().maxByMonth();
        return (0, times_1.default)(12, function (i) {
            var kw = kwByMonth[i] || 0;
            if (kw < mins[i]) {
                return 0;
            }
            if (kw > maxes[i]) {
                return maxes[i] - mins[i];
            }
            return kw - mins[i];
        });
    };
    return DemandTiersInMonths;
}(_BillingDeterminants_1.default));
exports.default = DemandTiersInMonths;
