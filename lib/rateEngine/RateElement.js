import RateCalculator from './RateCalculator';
import sum from 'lodash/sum';
import ValidatorFactory from './ValidatorFactory';
import RateComponentsFactory from './RateComponentsFactory';
class RateElement {
    constructor(rateElementArgs, loadProfile, otherRateElements = []) {
        var _a, _b;
        this.errors = [];
        const { id, rateElementType, name, billingCategory } = rateElementArgs;
        this.id = id;
        this.name = name;
        this.type = rateElementType;
        this.billingCategory = billingCategory;
        if (RateCalculator.shouldValidate) {
            const validator = ValidatorFactory.make(rateElementType, (_a = rateElementArgs['rateComponents']) !== null && _a !== void 0 ? _a : [], loadProfile).validate();
            if (RateCalculator.shouldLogValidationErrors) {
                validator.reportErrors();
            }
            this.errors = validator.allErrors();
        }
        this._rateComponents = RateComponentsFactory.make(rateElementArgs, loadProfile, otherRateElements);
        // Should we be assuming that all components
        // have the same classification?
        this.classification = (_b = this._rateComponents[0]) === null || _b === void 0 ? void 0 : _b.rateElementClassification();
    }
    rateComponents() {
        return this._rateComponents;
    }
    annualCost() {
        return sum(this.rateComponents().map((component) => component.annualCost()));
    }
    costs() {
        const costs = Array(12).fill(0);
        this.rateComponents().forEach((component) => {
            component.costs().forEach((cost, monthIdx) => {
                costs[monthIdx] += cost;
            });
        });
        return costs;
    }
    matches({ billingCategories, classifications, ids }) {
        return ((this.billingCategory && billingCategories ? billingCategories.includes(this.billingCategory) : true) &&
            (this.classification && classifications ? classifications.includes(this.classification) : true) &&
            (this.id && ids ? ids.includes(this.id) : true));
    }
}
export default RateElement;
