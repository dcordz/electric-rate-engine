import BillingDeterminants, { BillingDeterminantsUnits } from './_BillingDeterminants';
import { RateElementClassification } from '../RateElement';
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
