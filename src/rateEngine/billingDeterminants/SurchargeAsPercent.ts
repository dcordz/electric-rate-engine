import RateElement from '../RateElement.ts';
import BillingDeterminants from './_BillingDeterminants.ts';
import { BillingDeterminantsUnits, RateElementClassification, RateElementTypeEnum } from '../constants/index.ts';
import type { SurchargeAsPercentArgs } from '../types/index.ts';

class SurchargeAsPercent extends BillingDeterminants {
  private _rateElement: RateElement;

  rateElementType = RateElementTypeEnum.SurchargeAsPercent;
  rateElementClassification = RateElementClassification.SURCHARGE;
  units = BillingDeterminantsUnits.DOLLARS;

  constructor({rateElement}: SurchargeAsPercentArgs) {
    super();

    this._rateElement = rateElement;
  }

  calculate(): Array<number> {
    return this._rateElement.costs();
  }
}

export default SurchargeAsPercent;
