import BillingDeterminants from './_BillingDeterminants.ts';
import LoadProfile from '../LoadProfile.ts';
import { BillingDeterminantsUnits, ERateElementType, RateElementClassification } from '../constants/index.ts';

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
