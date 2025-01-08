import BillingDeterminants from './_BillingDeterminants.ts';
import {times} from 'lodash';
import { RateElementClassification, BillingDeterminantsUnits } from '../constants/index.ts';

const MONTHS_PER_YEAR = 12;

class FixedPerMonth extends BillingDeterminants {
  rateElementType = 'Fixed Per Month';
  rateElementClassification = RateElementClassification.FIXED;
  units = BillingDeterminantsUnits.MONTHS;

  calculate(): Array<number> {
    return times(MONTHS_PER_YEAR, () => 1);
  }
}

export default FixedPerMonth;
