import groupBy from 'lodash/groupBy';
import sumBy from 'lodash/sumBy';
import LoadProfile from '../LoadProfile';
import BillingDeterminants from './_BillingDeterminants';
import { BlockedTiersArgs } from './BlockedTiersInDays';

class BlockedTiersInMonths extends BillingDeterminants {
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
    const mins = this._min;
    const maxes = this._max;

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

export default BlockedTiersInMonths;
