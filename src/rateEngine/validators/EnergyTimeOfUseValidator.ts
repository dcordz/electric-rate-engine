import Validator from './_Validator';
import expandedDates from '../utils/expandedDates';
import { EnergyTimeOfUseArgs } from '../billingDeterminants/EnergyTimeOfUse';
import LoadProfileFilter from '../LoadProfileFilter';
import LoadProfile from '../LoadProfile';
import { RateComponentInterface } from '../RateComponent';

class EnergyTimeOfUseValidator extends Validator {
  private _args: Array<RateComponentInterface & EnergyTimeOfUseArgs>;
  private _year: number;
  
  constructor(args: Array<RateComponentInterface & EnergyTimeOfUseArgs>, loadProfile: LoadProfile) {
    super();

    this._args = args;
    this._year = loadProfile.year;
  }

  validate() {
    const dates = expandedDates(this._year);
    const filters = this.filters();
    const errors: Array<{english: string, data: {}, type: string}> = [];

    dates.forEach(date => {
      const matches = filters.filter(({filter}) => filter.matches(date))
    
      if (matches.length === 0) {
        errors.push({
          english: `No filter set found that matches ${JSON.stringify(date)}`,
          data: date,
          type: 'none',
        });
      } else if (matches.length > 1) {
        errors.push({
          english: `${matches.length} filter sets found that match ${JSON.stringify(date)}`,
          data: {...date, rateComponents: matches.map(({name}) => name)},
          type: 'duplicate',
        });
      }
    });

    errors.length > 0 && this.addError('Energy Time Of Use Error', errors);

    return this;
  }

  filters() {
    return this._args.map(({name, ...filters}) => ({name, filter: new LoadProfileFilter(filters)}));
  }
}

export default EnergyTimeOfUseValidator;
