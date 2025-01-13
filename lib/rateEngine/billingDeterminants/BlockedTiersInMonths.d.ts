import LoadProfile from '../LoadProfile';
import BillingDeterminants from './_BillingDeterminants';
import { RateElementClassification, BillingDeterminantsUnits } from '../constants';
import type { BlockedTiersArgs } from '../types';
declare class BlockedTiersInMonths extends BillingDeterminants {
    private _loadProfile;
    private _min;
    private _max;
    private _filters;
    rateElementType: string;
    rateElementClassification: RateElementClassification;
    units: BillingDeterminantsUnits;
    constructor({ min, max, ...filters }: BlockedTiersArgs, loadProfile: LoadProfile);
    filteredLoadProfile(): LoadProfile;
    calculate(): Array<number>;
}
export default BlockedTiersInMonths;
