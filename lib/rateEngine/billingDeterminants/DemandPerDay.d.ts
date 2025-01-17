import LoadProfile from '../LoadProfile';
import BillingDeterminants from './_BillingDeterminants';
import { RateElementClassification, BillingDeterminantsUnits } from '../constants';
import type { DemandPerDayArgs } from '../types';
declare class DemandPerDay extends BillingDeterminants {
    private _filters;
    private _loadProfile;
    rateElementType: string;
    rateElementClassification: RateElementClassification;
    units: BillingDeterminantsUnits;
    constructor(filters: DemandPerDayArgs, loadProfile: LoadProfile);
    filteredLoadProfile(): LoadProfile;
    calculate(): Array<number>;
}
export default DemandPerDay;
