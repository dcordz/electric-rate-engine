import { groupBy, sum, times } from "lodash-es";
import { BillingDeterminantsUnits, RateElementClassification } from '../constants/index.ts';
import LoadProfile from '../LoadProfile.ts';
import type { DemandPerDayArgs, LoadProfileFilterArgs } from '../types/index.ts';
import BillingDeterminants from './_BillingDeterminants.ts';

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
    const months = times(12, (i) => i);
    const expanded = this.filteredLoadProfile().expanded();

    return months.map((m) => {
      const monthLoads = expanded.filter(({ month }) => m === month);

      // chunk monthly loads by day (31-element array for January, etc.)
      const dayLoads = Object.values(groupBy(monthLoads, (val) => val.date));
      // sum the max demand for each day in the month
      return sum(dayLoads.map((day) => Math.max(...day.map(({ load }) => load))));
    });
  }
}

export default DemandPerDay;
