import LoadProfile from '../LoadProfile.ts';
import BillingDeterminants from './_BillingDeterminants.ts';
import { RateElementClassification, BillingDeterminantsUnits, ERateElementType } from '../constants/index.ts';
import type { DemandTimeOfUseArgs, LoadProfileFilterArgs } from '../types/index.ts';

class DemandTimeOfUse extends BillingDeterminants {
  private _filters: LoadProfileFilterArgs;
  private _loadProfile: LoadProfile;

  rateElementType = ERateElementType.DemandTimeOfUse;
  rateElementClassification = RateElementClassification.DEMAND;
  units = BillingDeterminantsUnits.KW;

  constructor(filters: DemandTimeOfUseArgs, loadProfile: LoadProfile) {
    super();

    this._filters = filters;
    this._loadProfile = loadProfile;
  }

  filteredLoadProfile(): LoadProfile {
    return this._loadProfile.filterBy(this._filters);
  }

  calculate(): Array<number> {
    return this.filteredLoadProfile().maxByMonth();
  }
}

export default DemandTimeOfUse;
