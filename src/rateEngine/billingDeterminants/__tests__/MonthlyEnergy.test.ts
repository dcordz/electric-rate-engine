import LoadProfile from '../../LoadProfile.ts';
import {times} from "lodash-es";
import MonthlyEnergy from '../MonthlyEnergy.ts';
import { sum } from "lodash-es";

const getLoadProfileOfOnes = () => times(8760, () => 1);

describe('MonthlyEnergy', () => {
  let loadProfile: LoadProfile;

  beforeEach(() => {
    loadProfile = new LoadProfile(getLoadProfileOfOnes(), {year: 2019});
  });

  describe('calculate', () => {
    it('calculates the energy demand', () => {
      // March and November are off by +/- 1 hour because of Daylight Savings Time
      const hoursPerMonth = [744, 672, 743, 720, 744, 720, 744, 744, 720, 744, 721, 744];

      const result = new MonthlyEnergy(loadProfile).calculate();

      expect(result).toEqual(hoursPerMonth);
      expect(sum(result)).toEqual(8760);
    });
  });
});
