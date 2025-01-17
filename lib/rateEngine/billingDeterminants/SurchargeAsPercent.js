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
var constants_1 = require("../constants");
var _BillingDeterminants_1 = __importDefault(require("./_BillingDeterminants"));
var SurchargeAsPercent = /** @class */ (function (_super) {
    __extends(SurchargeAsPercent, _super);
    function SurchargeAsPercent(_a) {
        var rateElement = _a.rateElement;
        var _this = _super.call(this) || this;
        _this.rateElementType = 'Surcharge';
        _this.rateElementClassification = constants_1.RateElementClassification.SURCHARGE;
        _this.units = constants_1.BillingDeterminantsUnits.DOLLARS;
        _this._rateElement = rateElement;
        return _this;
    }
    SurchargeAsPercent.prototype.calculate = function () {
        return this._rateElement.costs();
    };
    return SurchargeAsPercent;
}(_BillingDeterminants_1.default));
exports.default = SurchargeAsPercent;
