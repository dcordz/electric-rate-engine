import RateElement from './RateElement';
import type { RateCalculatorInterface, RateElementFilterArgs } from './types';
declare class RateCalculator {
    private _rateElements;
    name: string | undefined;
    utilityName: string | undefined;
    applicability: string | undefined;
    minimumBillAmount: number | undefined;
    static shouldValidate: boolean;
    static shouldLogValidationErrors: boolean;
    constructor({ name, utilityName, applicability, minimumBillAmount, rateElements, loadProfile }: RateCalculatorInterface);
    rateElements({ ...filters }?: RateElementFilterArgs): Array<RateElement>;
    annualCost({ ...filters }?: RateElementFilterArgs): number;
}
export default RateCalculator;
