import { BillingDeterminantsUnits, RateElementClassification } from '../constants';
import BillingDeterminants from './_BillingDeterminants';
class SurchargeAsPercent extends BillingDeterminants {
    constructor({ rateElement }) {
        super();
        this.rateElementType = 'Surcharge';
        this.rateElementClassification = RateElementClassification.SURCHARGE;
        this.units = BillingDeterminantsUnits.DOLLARS;
        this._rateElement = rateElement;
    }
    calculate() {
        return this._rateElement.costs();
    }
}
export default SurchargeAsPercent;
