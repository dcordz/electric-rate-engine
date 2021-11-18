import LoadProfile from '../LoadProfile';
import { LoadProfileFilterArgs } from '../LoadProfileFilter';
import BillingDeterminants, { BillingDeterminantsUnits } from './_BillingDeterminants';
import { RateElementClassification } from '../RateElement';

export interface DemandPerDayArgs {
  months: Array<number>;
  daysOfWeek?: Array<number>;
  hourStarts: Array<number>;
  onlyOnDays: Array<string>;
  exceptForDays: Array<string>;
}

class DemandPerDay extends BillingDeterminants {
  private _filters: LoadProfileFilterArgs;
  private _loadProfile: LoadProfile;

  rateElementType = 'Demand Per Day';
  rateElementClassification = RateElementClassification.DEMAND;
  units = BillingDeterminantsUnits.KW;

  constructor(filters: DemandPerDayArgs, loadProfile: LoadProfile) {
    super();

    this._filters = filters;
    this._loadProfile = loadProfile;
  }

  filteredLoadProfile(): LoadProfile {
    return this._loadProfile.filterBy(this._filters);
  }

  calculate(): Array<number> {
    return this.filteredLoadProfile().maxPerDayByMonth();
  }
}

export default DemandPerDay;
