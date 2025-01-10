import BillingDeterminants from './_BillingDeterminants';
import LoadProfile from '../LoadProfile';
import { BillingDeterminantsUnits, ERateElementType, RateElementClassification } from '../constants';

class MonthlyEnergy extends BillingDeterminants {
  private _loadProfile: LoadProfile;

  rateElementType = ERateElementType.MonthlyEnergy;
  rateElementClassification = RateElementClassification.ENERGY;
  units = BillingDeterminantsUnits.KWH;

  constructor(loadProfile: LoadProfile) {
    super();

    this._loadProfile = loadProfile;
  }

  calculate(): Array<number> {
    return this._loadProfile.sumByMonth();
  }
}

export default MonthlyEnergy;
