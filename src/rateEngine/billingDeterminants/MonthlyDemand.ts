import BillingDeterminants from './_BillingDeterminants.ts';
import LoadProfile from '../LoadProfile.ts';
import { RateElementClassification, BillingDeterminantsUnits, ERateElementType } from '../constants/index.ts';

class MonthlyDemand extends BillingDeterminants {
  private _loadProfile: LoadProfile;

  rateElementType = ERateElementType.MonthlyDemand;
  rateElementClassification = RateElementClassification.DEMAND;
  units = BillingDeterminantsUnits.KW;

  constructor(loadProfile: LoadProfile) {
    super();

    this._loadProfile = loadProfile;
  }

  calculate(): Array<number> {
    return this._loadProfile.byMonth().map(monthOfLoads => Math.max(...monthOfLoads));
  }
}

export default MonthlyDemand;
