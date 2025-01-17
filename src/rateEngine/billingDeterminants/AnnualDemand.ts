import LoadProfile from '../LoadProfile.ts';
import { BillingDeterminantsUnits, ERateElementType, MONTHS, RateElementClassification } from '../constants/index.ts';
import BillingDeterminants from './_BillingDeterminants.ts';

class AnnualDemand extends BillingDeterminants {
  private _loadProfile: LoadProfile;

  rateElementType = ERateElementType.AnnualDemand;
  rateElementClassification = RateElementClassification.DEMAND;
  units = BillingDeterminantsUnits.KW;

  constructor(loadProfile: LoadProfile) {
    super();

    this._loadProfile = loadProfile;
  }

  calculate(): Array<number> {
    const annualMax = this._loadProfile.max();
    return MONTHS.map((_) => annualMax);
  }
}

export default AnnualDemand;
