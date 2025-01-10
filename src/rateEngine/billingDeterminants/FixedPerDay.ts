import BillingDeterminants from './_BillingDeterminants';
import { RateElementClassification, BillingDeterminantsUnits, ERateElementType } from '../constants';
import { daysPerMonth } from '../utils/assumptions';

class FixedPerDay extends BillingDeterminants {
  rateElementType = ERateElementType.FixedPerDay;
  rateElementClassification = RateElementClassification.FIXED;
  units = BillingDeterminantsUnits.DAYS;

  calculate(): Array<number> {
    return daysPerMonth();
  }
}

export default FixedPerDay;
