import RateComponent from './RateComponent';
import LoadProfile from './LoadProfile';
import { BillingCategory, RateElementClassification } from './constants';
import type { RateElementType, RateElementInterface, RateElementFilterArgs, ValidatorError } from './types';
declare class RateElement {
    private _rateComponents;
    id?: string;
    name: string;
    type: RateElementType;
    classification?: RateElementClassification;
    billingCategory?: BillingCategory;
    errors: Array<ValidatorError>;
    constructor(rateElementArgs: RateElementInterface, loadProfile: LoadProfile, otherRateElements?: Array<RateElementInterface>);
    rateComponents(): Array<RateComponent>;
    annualCost(): number;
    costs(): Array<number>;
    matches({ billingCategories, classifications, ids }: RateElementFilterArgs): boolean;
}
export default RateElement;
