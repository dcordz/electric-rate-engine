import LoadProfile from '../../LoadProfile.ts';
import {times} from 'lodash-es';
import MonthlyDemand from '../MonthlyDemand.ts';

const getLoadProfileOfOneThroughTen = () => times(8760, num => num % 10 + 1);

describe('MonthlyDemand', () => {
  let loadProfile: LoadProfile;

  beforeEach(() => {
    loadProfile = new LoadProfile(getLoadProfileOfOneThroughTen(), {year: 2019});
  });

  describe('calculate', () => {
    it('calculates the energy demand', () => {
      const result = new MonthlyDemand(loadProfile).calculate();

      expect(result).toEqual(times(12, () => 10));
    });
  });
});
