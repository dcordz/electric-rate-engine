import LoadProfile from '../../LoadProfile.ts';
import {times} from "lodash-es";
import DemandPerDay from '../DemandPerDay.ts';
import data from './DemandPerDayData.ts';
import { daysPerMonth } from '../../utils/assumptions.ts';
import type { DemandPerDayArgs } from '../../types/index.ts';


interface TestData {
  name: string;
  filters: DemandPerDayArgs;
  inputLoadProfileData: number[];
  billingDeterminantsByMonth: number[];
}

const getLoadProfileOfOnes = () => times(8760, () => 1);

const zerosByMonth = times(12, () => 0);

describe('DemandPerDay', () => {
  let loadProfile: LoadProfile;

  beforeEach(() => {
    loadProfile = new LoadProfile(getLoadProfileOfOnes(), { year: 2019 });
  });

  describe('calculate', () => {
    it('calculates demand per day with nothing filtered', () => {
      const result = new DemandPerDay(
        {
          months: [],
          daysOfWeek: [],
          hourStarts: [],
          onlyOnDays: [],
          exceptForDays: [],
        },
        loadProfile,
      ).calculate();

      result.forEach((val, i) => {
        expect(val).toBeCloseTo(daysPerMonth(loadProfile.year)[i]);
      });
    });

    it('calculates demand per day with everything filtered', () => {
      const result = new DemandPerDay(
        {
          months: [],
          daysOfWeek: [],
          hourStarts: [],
          onlyOnDays: ['2015-01-01'],
          exceptForDays: [],
        },
        loadProfile,
      ).calculate();

      result.forEach((val, i) => {
        expect(val).toBeCloseTo(zerosByMonth[i]);
      });
    });

    data.forEach(({ name, filters, inputLoadProfileData, billingDeterminantsByMonth }: TestData) => {
      let inputLoadProfile = new LoadProfile(inputLoadProfileData, { year: 2019 });

      it(`calculates demand per day for ${name}`, () => {
        const result = new DemandPerDay(filters, inputLoadProfile).calculate();

        result.forEach((val, i) => {
          expect(val).toBeCloseTo(billingDeterminantsByMonth[i]);
        });
      });
    });
  });
});
