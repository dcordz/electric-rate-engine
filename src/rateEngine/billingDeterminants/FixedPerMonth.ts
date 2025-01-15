import { BillingDeterminantsUnits, ERateElementType, MONTHS, RateElementClassification } from '../constants/index.ts';
import BillingDeterminants from './_BillingDeterminants.ts';

class FixedPerMonth extends BillingDeterminants {
  rateElementType = ERateElementType.FixedPerMonth;
  rateElementClassification = RateElementClassification.FIXED;
  units = BillingDeterminantsUnits.MONTHS;

  calculate(): Array<number> {
    return MONTHS.map(() => 1);
  }
}

export default FixedPerMonth;
