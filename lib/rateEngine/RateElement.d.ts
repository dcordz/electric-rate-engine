import LoadProfile from './LoadProfile';
import RateComponent from './RateComponent';
import type { RateElementFilterArgs, RateElementInterface, RateElementType, TBillingCategory, TRateElementClassification, ValidatorError } from './types';
declare class RateElement {
    private _rateComponents;
    id?: string;
    name: string;
    type: RateElementType;
    classification?: TRateElementClassification;
    billingCategory?: TBillingCategory;
    errors: Array<ValidatorError>;
    constructor(rateElementArgs: RateElementInterface, loadProfile: LoadProfile, otherRateElements?: Array<RateElementInterface>);
    rateComponents(): Array<RateComponent>;
    annualCost(): number;
    costs(): Array<number>;
    matches({ billingCategories, classifications, ids }: RateElementFilterArgs): boolean;
}
export default RateElement;
