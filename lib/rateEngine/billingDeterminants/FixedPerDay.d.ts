import BillingDeterminants from './_BillingDeterminants';
import { RateElementClassification, BillingDeterminantsUnits } from '../constants';
declare class FixedPerDay extends BillingDeterminants {
    rateElementType: string;
    rateElementClassification: RateElementClassification;
    units: BillingDeterminantsUnits;
    calculate(): Array<number>;
}
export default FixedPerDay;
