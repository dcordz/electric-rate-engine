import { times } from 'lodash-es';
import BillingDeterminants from './_BillingDeterminants.ts';
import LoadProfile from '../LoadProfile.ts';
import { RateElementClassification, BillingDeterminantsUnits, ERateElementType } from '../constants/index.ts';

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
    return times(12, () => annualMax);
  }
}

export default AnnualDemand;
