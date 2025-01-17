"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mean_1 = __importDefault(require("lodash/mean"));
var BillingDeterminants = /** @class */ (function () {
    function BillingDeterminants() {
    }
    BillingDeterminants.prototype.mean = function () {
        return (0, mean_1.default)(this.calculate());
    };
    BillingDeterminants.prototype.all = function () {
        return this.calculate();
    };
    BillingDeterminants.prototype.map = function (callback) {
        return this.calculate().map(callback);
    };
    return BillingDeterminants;
}());
exports.default = BillingDeterminants;
