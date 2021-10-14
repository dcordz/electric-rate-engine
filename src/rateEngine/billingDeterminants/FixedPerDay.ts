import BillingDeterminants from './_BillingDeterminants';
import { RateElementClassification } from '../RateElement';

const DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

class FixedPerDay extends BillingDeterminants {
  rateElementType = 'Fixed Per Day';
  rateElementClassification = RateElementClassification.FIXED;
  units = 'days';

  calculate(): Array<number> {
    return DAYS_PER_MONTH;
  }
}

export default FixedPerDay;
