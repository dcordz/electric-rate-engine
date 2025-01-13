import { BillingDeterminantsUnits, RateElementClassification } from '../constants';
import type { SurchargeAsPercentArgs } from '../types';
import BillingDeterminants from './_BillingDeterminants';
declare class SurchargeAsPercent extends BillingDeterminants {
    private _rateElement;
    rateElementType: string;
    rateElementClassification: RateElementClassification;
    units: BillingDeterminantsUnits;
    constructor({ rateElement }: SurchargeAsPercentArgs);
    calculate(): Array<number>;
}
export default SurchargeAsPercent;
