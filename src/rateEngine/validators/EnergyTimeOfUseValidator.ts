import Validator from './_Validator';
import expandedDates from '../utils/expandedDates';
import { EnergyTimeOfUseArgs } from '../billingDeterminants/EnergyTimeOfUse';
import LoadProfileFilter from '../LoadProfileFilter';
import LoadProfile from '../LoadProfile';

class EnergyTimeOfUseValidator extends Validator {
  private _args: Array<EnergyTimeOfUseArgs>;
  private _year: number;
  
  constructor(args: Array<EnergyTimeOfUseArgs>, loadProfile: LoadProfile) {
    super();

    this._args = args;
    this._year = loadProfile.year;
  }

  validate() {
    const dates = expandedDates(this._year);
    const filters = this.filters();
    const errors = [];

    dates.forEach(date => {
      const matches = filters.filter(filter => filter.matches(date))
    
      if (matches.length === 0) {
        errors.push(`No filter set found that matches ${JSON.stringify(date)}`);
      } else if (matches.length > 1) {
        errors.push(`${matches.length} filter sets found that match ${JSON.stringify(date)}`);
      }
    });

    errors.length > 0 && this.addError('Energy Time Of Use Error', errors);

    return this;
  }

  filters() {
    return this._args.map(filters => new LoadProfileFilter(filters));
  }
}

export default EnergyTimeOfUseValidator;
