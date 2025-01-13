import FixedPerDay from './billingDeterminants/FixedPerDay';
import LoadProfile from './LoadProfile';
import type { ProcessedRateElementInterface } from './types';
declare class BillingDeterminantsFactory {
    static make(rateElement: ProcessedRateElementInterface, loadProfile: LoadProfile): {
        charge: number | number[];
        name: string;
        billingDeterminants: FixedPerDay;
    }[];
}
export default BillingDeterminantsFactory;
