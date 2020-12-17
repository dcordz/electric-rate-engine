import BillingDeterminants from './_BillingDeterminants';
import times from 'lodash/times';

const MONTHS_PER_YEAR = 12;

class FixedPerMonth extends BillingDeterminants {
  rateElementType = 'Fixed Per Month';
  rateClassificationType = 'fixed';
  units = 'months';

  calculate(): Array<number> {
    return times(MONTHS_PER_YEAR, () => 1);
  }
}

export default FixedPerMonth;
