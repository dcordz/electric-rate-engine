import BillingDeterminants, { BillingDeterminantsUnits } from './_BillingDeterminants';
import RateElement, { RateElementClassification } from '../RateElement';
import LoadProfile from '../LoadProfile';

export interface SurchargeAsPercentArgs {
  rateElement: RateElement;
  percent: number;
}

class SurchargeAsPercent extends BillingDeterminants {
  private _rateElement: RateElement;
  private _percent: number;

  rateElementType = 'Surcharge';
  rateElementClassification = RateElementClassification.ENERGY;
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
