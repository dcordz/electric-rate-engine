import { BillingDeterminantsUnits, RateElementClassification, RateElementTypeEnum } from '../constants/index.ts';

import BillingDeterminants from './_BillingDeterminants.ts';
import { daysPerMonth } from '../utils/assumptions.ts';

class FixedPerDay extends BillingDeterminants {
  rateElementType = RateElementTypeEnum.FixedPerDay;
  rateElementClassification = RateElementClassification.FIXED;
  units = BillingDeterminantsUnits.DAYS;

  calculate(): Array<number> {
    return daysPerMonth();
  }
}

export default FixedPerDay;
