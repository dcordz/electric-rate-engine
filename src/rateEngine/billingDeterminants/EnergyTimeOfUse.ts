import BillingDeterminants from './_BillingDeterminants.ts';
import LoadProfile from '../LoadProfile.ts';
import { BillingDeterminantsUnits, RateElementClassification, RateElementTypeEnum } from '../constants/index.ts';

import type { EnergyTimeOfUseArgs, LoadProfileFilterArgs } from '../types/index.ts';

class EnergyTimeOfUse extends BillingDeterminants {
  private _filters: LoadProfileFilterArgs;
  private _loadProfile: LoadProfile;

  rateElementType = RateElementTypeEnum.EnergyTimeOfUse;
  rateElementClassification = RateElementClassification.ENERGY;
  units = BillingDeterminantsUnits.KWH;

  constructor(filters: EnergyTimeOfUseArgs, loadProfile: LoadProfile) {
    super();

    this._filters = filters;
    this._loadProfile = loadProfile;
  }

  filteredLoadProfile(): LoadProfile {
    return this._loadProfile.filterBy(this._filters);
  }

  calculate(): Array<number> {
    return this.filteredLoadProfile().sumByMonth();
  }
}

export default EnergyTimeOfUse;
