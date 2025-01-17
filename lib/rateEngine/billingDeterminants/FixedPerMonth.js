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
var constants_1 = require("../constants");
var MONTHS_PER_YEAR = 12;
var FixedPerMonth = /** @class */ (function (_super) {
    __extends(FixedPerMonth, _super);
    function FixedPerMonth() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rateElementType = 'Fixed Per Month';
        _this.rateElementClassification = constants_1.RateElementClassification.FIXED;
        _this.units = constants_1.BillingDeterminantsUnits.MONTHS;
        return _this;
    }
    FixedPerMonth.prototype.calculate = function () {
        return (0, times_1.default)(MONTHS_PER_YEAR, function () { return 1; });
    };
    return FixedPerMonth;
}(_BillingDeterminants_1.default));
exports.default = FixedPerMonth;
