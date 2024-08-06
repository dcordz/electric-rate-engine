import BillingDeterminants from './_BillingDeterminants';
import { RateElementClassification, BillingDeterminantsUnits } from '../constants';
import { daysPerMonth } from '../utils/assumptions';

class FixedPerDay extends BillingDeterminants {
  rateElementType = 'Fixed Per Day';
  rateElementClassification = RateElementClassification.FIXED;
  units = BillingDeterminantsUnits.DAYS;

  calculate(): Array<number> {
    return daysPerMonth();
  }
}

export default FixedPerDay;
