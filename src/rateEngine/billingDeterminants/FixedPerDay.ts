import BillingDeterminants, { BillingDeterminantsUnits } from './_BillingDeterminants';
import { RateElementClassification } from '../RateElement';
import { DAYS_PER_MONTH } from '../utils/assumptions';
class FixedPerDay extends BillingDeterminants {
  rateElementType = 'Fixed Per Day';
  rateElementClassification = RateElementClassification.FIXED;
  units = BillingDeterminantsUnits.DAYS;

  calculate(): Array<number> {
    return DAYS_PER_MONTH;
  }
}

export default FixedPerDay;
