"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sum_1 = __importDefault(require("lodash/sum"));
var RateCalculator_1 = __importDefault(require("./RateCalculator"));
var RateComponentsFactory_1 = __importDefault(require("./RateComponentsFactory"));
var ValidatorFactory_1 = __importDefault(require("./ValidatorFactory"));
var RateElement = /** @class */ (function () {
    function RateElement(rateElementArgs, loadProfile, otherRateElements) {
        if (otherRateElements === void 0) { otherRateElements = []; }
        var _a, _b;
        this.errors = [];
        var id = rateElementArgs.id, rateElementType = rateElementArgs.rateElementType, name = rateElementArgs.name, billingCategory = rateElementArgs.billingCategory;
        this.id = id;
        this.name = name;
        this.type = rateElementType;
        this.billingCategory = billingCategory;
        if (RateCalculator_1.default.shouldValidate) {
            var validator = ValidatorFactory_1.default.make(rateElementType, (_a = rateElementArgs['rateComponents']) !== null && _a !== void 0 ? _a : [], loadProfile).validate();
            if (RateCalculator_1.default.shouldLogValidationErrors) {
                validator.reportErrors();
            }
            this.errors = validator.allErrors();
        }
        this._rateComponents = RateComponentsFactory_1.default.make(rateElementArgs, loadProfile, otherRateElements);
        // Should we be assuming that all components
        // have the same classification?
        this.classification = (_b = this._rateComponents[0]) === null || _b === void 0 ? void 0 : _b.rateElementClassification();
    }
    RateElement.prototype.rateComponents = function () {
        return this._rateComponents;
    };
    RateElement.prototype.annualCost = function () {
        return (0, sum_1.default)(this.rateComponents().map(function (component) { return component.annualCost(); }));
    };
    RateElement.prototype.costs = function () {
        var costs = Array(12).fill(0);
        this.rateComponents().forEach(function (component) {
            component.costs().forEach(function (cost, monthIdx) {
                costs[monthIdx] += cost;
            });
        });
        return costs;
    };
    RateElement.prototype.matches = function (_a) {
        var billingCategories = _a.billingCategories, classifications = _a.classifications, ids = _a.ids;
        return ((this.billingCategory && billingCategories ? billingCategories.includes(this.billingCategory) : true) &&
            (this.classification && classifications ? classifications.includes(this.classification) : true) &&
            (this.id && ids ? ids.includes(this.id) : true));
    };
    return RateElement;
}());
exports.default = RateElement;
