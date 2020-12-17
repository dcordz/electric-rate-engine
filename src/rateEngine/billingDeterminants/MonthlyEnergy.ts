import BillingDeterminants from './_BillingDeterminants';
import LoadProfile from '../LoadProfile';

class MonthlyEnergy extends BillingDeterminants {
  private _loadProfile: LoadProfile;

  rateElementType = 'Monthly Energy';
  rateClassificationType = 'energy';
  units: 'kWh';

  constructor(loadProfile: LoadProfile) {
    super();

    this._loadProfile = loadProfile;
  }

  calculate(): Array<number> {
    return this._loadProfile.sumByMonth();
  }
}

export default MonthlyEnergy;
