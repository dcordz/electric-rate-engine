import { RateElementClassification, BillingDeterminantsUnits } from '../constants/index.ts';
import BillingDeterminants from './_BillingDeterminants.ts';
import { daysPerMonth } from '../utils/assumptions.ts';

class FixedPerDay extends BillingDeterminants {
  rateElementType = 'Fixed Per Day';
  rateElementClassification = RateElementClassification.FIXED;
  units = BillingDeterminantsUnits.DAYS;

  calculate(): Array<number> {
    return daysPerMonth();
  }
}

export default FixedPerDay;
