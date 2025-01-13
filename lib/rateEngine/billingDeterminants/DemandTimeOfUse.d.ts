import LoadProfile from '../LoadProfile';
import BillingDeterminants from './_BillingDeterminants';
import { RateElementClassification, BillingDeterminantsUnits } from '../constants';
import type { DemandTimeOfUseArgs } from '../types';
declare class DemandTimeOfUse extends BillingDeterminants {
    private _filters;
    private _loadProfile;
    rateElementType: string;
    rateElementClassification: RateElementClassification;
    units: BillingDeterminantsUnits;
    constructor(filters: DemandTimeOfUseArgs, loadProfile: LoadProfile);
    filteredLoadProfile(): LoadProfile;
    calculate(): Array<number>;
}
export default DemandTimeOfUse;
