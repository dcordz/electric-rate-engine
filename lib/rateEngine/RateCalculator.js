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
var sum_1 = __importDefault(require("lodash/sum"));
var RateElement_1 = __importDefault(require("./RateElement"));
var RateCalculator = /** @class */ (function () {
    function RateCalculator(_a) {
        var name = _a.name, utilityName = _a.utilityName, applicability = _a.applicability, minimumBillAmount = _a.minimumBillAmount, rateElements = _a.rateElements, loadProfile = _a.loadProfile;
        this.name = name;
        this.utilityName = utilityName;
        this.applicability = applicability;
        this.minimumBillAmount = minimumBillAmount;
        this._rateElements = rateElements.map(function (element, idx) {
            return new RateElement_1.default(element, loadProfile, rateElements.filter(function (_, i) { return i !== idx; }));
        });
    }
    RateCalculator.prototype.rateElements = function (_a) {
        if (_a === void 0) { _a = {}; }
        var filters = __rest(_a, []);
        return this._rateElements.filter(function (element) { return element.matches(filters); });
    };
    RateCalculator.prototype.annualCost = function (_a) {
        if (_a === void 0) { _a = {}; }
        var filters = __rest(_a, []);
        return (0, sum_1.default)(this.rateElements(filters).map(function (element) { return element.annualCost(); }));
    };
    RateCalculator.shouldValidate = true;
    RateCalculator.shouldLogValidationErrors = true;
    return RateCalculator;
}());
exports.default = RateCalculator;
