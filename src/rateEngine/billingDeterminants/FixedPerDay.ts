import { BillingDeterminantsUnits, ERateElementType, RateElementClassification } from '../constants/index.ts';
import { daysPerMonth } from '../utils/assumptions.ts';
import BillingDeterminants from './_BillingDeterminants.ts';

class FixedPerDay extends BillingDeterminants {
  rateElementType = ERateElementType.FixedPerDay;
  rateElementClassification = RateElementClassification.FIXED;
  units = BillingDeterminantsUnits.DAYS;

  calculate(): Array<number> {
    return daysPerMonth();
  }
}

export default FixedPerDay;
