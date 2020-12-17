import Validator from './_Validator';
import times from 'lodash/times';
import { BlockedTiersArgs } from '../billingDeterminants/BlockedTiersInDays';

interface MinMaxPair {
  min: number;
  max: number;
}

class BlockedTiersValidator extends Validator {
  private _args: Array<BlockedTiersArgs>;
  private _localErrors = [];

  constructor (args: Array<BlockedTiersArgs>) {
    super();

    this._args = args;
  }

  validate() {
    this.validateBasics();
    this.validateOverlap();
    this.validateRange();

    this._localErrors.length > 0 && this.addError('Blocked Tiers Error', this._localErrors);

    return this;
  }

  protected validateBasics() {
    this._args.forEach(({min, max}: BlockedTiersArgs) => {
      if (min.length !== 12 || max.length !== 12) {
        this._localErrors.push(`Incorrect amound of arguments found in blocked tier: found ${min.length} min and ${max.length} max`);
      }
    });
  }

  protected getSortedPairs(): Array<Array<MinMaxPair>> {
    return times(12, i => {
      return this._args.map(({min, max}) => ({min: min[i], max: max[i]})).sort((a, b) => a.min - b.min);
    });
  }

  protected validateOverlap() {
    if (this._args.length < 2) return;

    const monthPairs = this.getSortedPairs();

    monthPairs.forEach((pairs, month) => {
      for (let i = 1; i < pairs.length; i++) {
        if (pairs[i - 1].max > pairs[i].min) {
          this._localErrors.push(`Overlap in blocked tier min/maxes found in month ${month} between max: ${pairs[i-1].max} and min: ${pairs[i].min}`);
        }
      }
    });
  }

  protected validateRange() {
    const monthPairs = this.getSortedPairs();

    monthPairs.forEach((pairs, month) => {
      if (pairs[0].min > 0) {
        this._localErrors.push(`Lowest blocked tier min for month ${month} is ${pairs[0].min}, expected 0.`);
      }

      if (pairs.map(({max}) => max).sort()[pairs.length - 1] < Infinity) {
        this._localErrors.push(`Highest blocked tier for month ${month} is less than Infinity.`);
      }

      if (pairs.length > 1) {

        for (let i = 1; i < pairs.length; i++) {
          if (pairs[i - 1].max !== pairs[i].min) {
            this._localErrors.push(`Gap in blocked tier min/maxes found in month ${month} between max: ${pairs[i - 1].max} and min: ${pairs[i].min}`);
          }
        }
      }
    });
  }
}

export default BlockedTiersValidator;
