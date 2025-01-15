import { MONTHS } from '../../constants/time.ts';
import LoadProfile from '../../LoadProfile.ts';
import MonthlyDemand from '../MonthlyDemand.ts';

const getLoadProfileOfOneThroughTen = () => new Array(8760).fill(0).map((_, num) => (num % 10) + 1);

describe('MonthlyDemand', () => {
  let loadProfile: LoadProfile;

  beforeEach(() => {
    loadProfile = new LoadProfile(getLoadProfileOfOneThroughTen(), { year: 2019 });
  });

  describe('calculate', () => {
    it('calculates the energy demand', () => {
      const result = new MonthlyDemand(loadProfile).calculate();

      expect(result).toEqual(MONTHS.map(() => 10));
    });
  });
});
