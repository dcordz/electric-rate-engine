import groupBy from 'lodash/groupBy';
import sumBy from 'lodash/sumBy';
import LoadProfile from '../LoadProfile';
import BillingDeterminants from './_BillingDeterminants';

const DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export interface BlockedTiersArgs {
  min: Array<number>;
  max: Array<number>;
}

class BlockedTiersInDays extends BillingDeterminants {
  private _loadProfile: LoadProfile;
  private _min: Array<number>;
  private _max: Array<number>;

  rateElementType = 'Blocked Tier';
  rateClassificationType = 'energy';
  units = 'kWh';

  constructor({ min, max }: BlockedTiersArgs, loadProfile: LoadProfile) {
    super();

    this._loadProfile = loadProfile;
    this._min = min;
    this._max = max;
  }

  calculate(): Array<number> {
    const mins = DAYS_PER_MONTH.map((days, i) => days * this._min[i]);
    const maxes = DAYS_PER_MONTH.map((days, i) => days * this._max[i]);

    const expandedLoadProfile = this._loadProfile.expanded();

    const monthlyExpandedLoadProfile = Object.values(groupBy(expandedLoadProfile, 'month'));
    const kwhPerMonth = monthlyExpandedLoadProfile.map((loadProfiles) => sumBy(loadProfiles, 'load'));

    return kwhPerMonth.map((kwh, i) => {
      if (kwh < mins[i]) {
        return 0;
      }
      if (kwh > maxes[i]) {
        return maxes[i] - mins[i];
      }
      return kwh - mins[i];
    });
  }
}

export default BlockedTiersInDays;
