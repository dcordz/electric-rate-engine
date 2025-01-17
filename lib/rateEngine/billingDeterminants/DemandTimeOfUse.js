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
var constants_1 = require("../constants");
var DemandTimeOfUse = /** @class */ (function (_super) {
    __extends(DemandTimeOfUse, _super);
    function DemandTimeOfUse(filters, loadProfile) {
        var _this = _super.call(this) || this;
        _this.rateElementType = 'Time Of Use';
        _this.rateElementClassification = constants_1.RateElementClassification.DEMAND;
        _this.units = constants_1.BillingDeterminantsUnits.KW;
        _this._filters = filters;
        _this._loadProfile = loadProfile;
        return _this;
    }
    DemandTimeOfUse.prototype.filteredLoadProfile = function () {
        return this._loadProfile.filterBy(this._filters);
    };
    DemandTimeOfUse.prototype.calculate = function () {
        return this.filteredLoadProfile().maxByMonth();
    };
    return DemandTimeOfUse;
}(_BillingDeterminants_1.default));
exports.default = DemandTimeOfUse;
