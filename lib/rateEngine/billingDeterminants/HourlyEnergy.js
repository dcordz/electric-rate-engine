import BillingDeterminants from './_BillingDeterminants';
import expandedDates from '../utils/expandedDates';
import { BillingDeterminantsUnits, RateElementClassification } from '../constants';
class HourlyEnergy extends BillingDeterminants {
    constructor({ hourOfYear }, loadProfile) {
        super();
        this.rateElementType = 'Hourly Energy';
        this.rateElementClassification = RateElementClassification.ENERGY;
        this.units = BillingDeterminantsUnits.KWH;
        this._hourOfYear = hourOfYear;
        this._load = loadProfile.expanded()[hourOfYear].load;
        this._year = loadProfile.year;
    }
    calculate() {
        const { month } = expandedDates(this._year)[this._hourOfYear];
        const months = Array(12).fill(0);
        months[month] = this._load;
        return months;
    }
}
export default HourlyEnergy;
