import BillingDeterminants from './_BillingDeterminants';
import LoadProfile from '../LoadProfile';
import { RateElementClassification } from '../RateElement';

class MonthlyDemand extends BillingDeterminants {
  private _loadProfile: LoadProfile;

  rateElementType = 'Monthly Demand';
  rateElementClassification = RateElementClassification.DEMAND;
  units: 'kW';

  constructor(loadProfile: LoadProfile) {
    super();

    this._loadProfile = loadProfile;
  }

  calculate(): Array<number> {
    return this._loadProfile.byMonth().map(monthOfLoads => Math.max(...monthOfLoads));
  }
}

export default MonthlyDemand;
