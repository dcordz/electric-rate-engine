import BillingDeterminants from './_BillingDeterminants.ts';
import expandedDates from '../utils/expandedDates.ts';
import LoadProfile from '../LoadProfile.ts';
import { BillingDeterminantsUnits, RateElementClassification, RateElementTypeEnum } from '../constants/index.ts';
import type { HourlyEnergyArgs, ExpandedDate } from '../types/index.ts';

class HourlyEnergy extends BillingDeterminants {
  private _load: number;
  private _hourOfYear: number;
  private _year: number;

  rateElementType = RateElementTypeEnum.HourlyEnergy;
  rateElementClassification = RateElementClassification.ENERGY;
  units = BillingDeterminantsUnits.KWH;

  constructor({hourOfYear}: HourlyEnergyArgs, loadProfile: LoadProfile) {
    super();

    this._hourOfYear = hourOfYear
    this._load = loadProfile.expanded()[hourOfYear].load;
    this._year = loadProfile.year;
  }

  calculate(): Array<number> {
    const {month}: ExpandedDate = expandedDates(this._year)[this._hourOfYear];
    const months = Array(12).fill(0);
    months[month] = this._load;

    return months;
  }
}

export default HourlyEnergy;
