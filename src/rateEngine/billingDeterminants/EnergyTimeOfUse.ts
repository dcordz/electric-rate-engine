import BillingDeterminants from './_BillingDeterminants';
import LoadProfile from '../LoadProfile';
import LoadProfileFilter, {LoadProfileFilterArgs} from '../LoadProfileFilter';

type HourStart =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23;

type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface EnergyTimeOfUseArgs {
  months: Array<number>;
  daysOfWeek?: Array<number>;
  hourStarts: Array<number>;
  onlyOnDays: Array<string>;
  exceptForDays: Array<string>;
}

class EnergyTimeOfUse extends BillingDeterminants {
  private _filters: LoadProfileFilterArgs;
  private _loadProfile: LoadProfile;

  rateElementType = 'Time Of Use';
  rateClassificationType = 'energy';
  units = 'kWh';

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
