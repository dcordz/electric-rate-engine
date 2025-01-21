import BillingDeterminants from './_BillingDeterminants.ts';
import {times} from "lodash-es";
import { BillingDeterminantsUnits, RateElementClassification, RateElementTypeEnum } from '../constants/index.ts';


const MONTHS_PER_YEAR = 12;

class FixedPerMonth extends BillingDeterminants {
  rateElementType = RateElementTypeEnum.FixedPerMonth;
  rateElementClassification = RateElementClassification.FIXED;
  units = BillingDeterminantsUnits.MONTHS;

  calculate(): Array<number> {
    return times(MONTHS_PER_YEAR, () => 1);
  }
}

export default FixedPerMonth;
