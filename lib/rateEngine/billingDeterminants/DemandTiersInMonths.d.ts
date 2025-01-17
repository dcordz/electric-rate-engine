import { BillingDeterminantsUnits, RateElementClassification } from '../constants';
import LoadProfile from '../LoadProfile';
import { BlockedTiersArgs } from '../types';
import BillingDeterminants from './_BillingDeterminants';
declare class DemandTiersInMonths extends BillingDeterminants {
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
export default DemandTiersInMonths;
