import { times } from 'lodash';
import { BillingDeterminantsUnits, ERateElementType, RateElementClassification } from '../constants/index.ts';
import BillingDeterminants from './_BillingDeterminants.ts';

const MONTHS_PER_YEAR = 12;

class FixedPerMonth extends BillingDeterminants {
  rateElementType = ERateElementType.FixedPerMonth;
  rateElementClassification = RateElementClassification.FIXED;
  units = BillingDeterminantsUnits.MONTHS;

  calculate(): Array<number> {
    return times(MONTHS_PER_YEAR, () => 1);
  }
}

export default FixedPerMonth;
