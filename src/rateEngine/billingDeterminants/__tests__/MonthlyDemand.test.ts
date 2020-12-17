import LoadProfile from '../../LoadProfile';
import times from 'lodash/times';
import MonthlyDemand from '../MonthlyDemand';

const getLoadProfileOfOneThroughTen = () => times(8760, num => num % 10 + 1);

describe('MonthlyDemand', () => {
  let loadProfile;

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
