import BillingDeterminants from './_BillingDeterminants';
import LoadProfile from '../LoadProfile';
import { RateElementClassification, BillingDeterminantsUnits } from '../constants';
import type { EnergyTimeOfUseArgs } from '../types';
declare class EnergyTimeOfUse extends BillingDeterminants {
    private _filters;
    private _loadProfile;
    rateElementType: string;
    rateElementClassification: RateElementClassification;
    units: BillingDeterminantsUnits;
    constructor(filters: EnergyTimeOfUseArgs, loadProfile: LoadProfile);
    filteredLoadProfile(): LoadProfile;
    calculate(): Array<number>;
}
export default EnergyTimeOfUse;
