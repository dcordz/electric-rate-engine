import Validator from './_Validator.ts';
import expandedDates from '../utils/expandedDates.ts';
import LoadProfileFilter from '../LoadProfileFilter.ts';
import LoadProfile from '../LoadProfile.ts';
import type { RateComponentInterface, EnergyTimeOfUseArgs } from '../types/index.ts';

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
    const errors: Array<{ english: string; data: Record<string, any>; type: string }> = [];

    dates.forEach((date) => {
      const matches = filters.filter(({ filter }) => filter.matches(date));

      if (matches.length === 0) {
        errors.push({
          english: `No filter set found that matches ${JSON.stringify(date)}`,
          data: date,
          type: 'none',
        });
      } else if (matches.length > 1) {
        errors.push({
          english: `${matches.length} filter sets found that match ${JSON.stringify(date)}`,
          data: { ...date, rateComponents: matches.map(({ name }) => name) },
          type: 'duplicate',
        });
      }
    });

    if (errors.length > 0) {
      this.addError('Energy Time Of Use Error', errors);
    }

    return this;
  }

  filters() {
    return this._args.map(({ name, ...filters }) => ({ name, filter: new LoadProfileFilter(filters) }));
  }
}

export default EnergyTimeOfUseValidator;
