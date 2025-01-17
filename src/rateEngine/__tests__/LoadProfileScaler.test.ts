import { jest } from '@jest/globals';
import { MONTHS } from '../constants/time.ts';
import LoadProfile from '../LoadProfile.ts';
import LoadProfileScaler from '../LoadProfileScaler.ts';
import e1 from '../__mocks__/rates/e-1.ts';

const getLoadProfileOfOnes = () => new Array(8760).fill(1);
const getLoadProfileOfTwos = () => new Array(8760).fill(2);

describe('LoadProfileScaler', () => {
  const initialLoadProfile = new LoadProfile(getLoadProfileOfOnes(), { year: 2019 });
  let loadProfileScaler: LoadProfileScaler;

  beforeEach(() => {
    loadProfileScaler = new LoadProfileScaler(initialLoadProfile);
  });

  describe('to', () => {
    it('multiplies all entries in the load profile by the given scaler', () => {
      expect(loadProfileScaler.to(2)).toEqual(new LoadProfile(getLoadProfileOfTwos(), { year: 2019 }));
    });
  });

  describe('toTotalKwh', () => {
    it('returns a loadprofile whose sum totals the given kWh', () => {
      const totalKwh = 18705;
      const loadProfile = new LoadProfile(
        new Array(8760).fill(0).map((_, i) => i % 10),
        {year: 2019}
      );
      const newLoadProfileScaler = new LoadProfileScaler(loadProfile);

      expect(loadProfileScaler.toTotalKwh(totalKwh).sum()).toBeCloseTo(totalKwh);
      expect(newLoadProfileScaler.toTotalKwh(totalKwh).sum()).toBeCloseTo(totalKwh);
    });
  });

  describe('toAverageMonthlyBill', () => {
    describe('with a mock', () => {
      it('scales by the scaler that goal-seek finds', () => {
        jest.spyOn(loadProfileScaler, "goalSeek").mockReturnValue(200);
        const scaledLoadProfile = loadProfileScaler.toAverageMonthlyBill(100, e1);
        expect(scaledLoadProfile).toEqual(new LoadProfile(getLoadProfileOfTwos(), { year: 2019 }));
      });

      it('throws the error if goal-seek fails', () => {
        jest.spyOn(loadProfileScaler, "goalSeek").mockImplementation(() => {
          throw 'some goal-seek error';
        });
        expect(() => loadProfileScaler.toAverageMonthlyBill(100, e1)).toThrow('some goal-seek error');
      });

      it('passes extra parameters to the goal-seek function', () => {
        
        const goalSeekParams = {
          maxStep: 55,
          aUselessParam: true,
        };
        
        const spy = jest.spyOn(loadProfileScaler, "goalSeek").mockReturnValue(200);
        loadProfileScaler.toAverageMonthlyBill(100, e1, goalSeekParams);
        expect(spy).toHaveBeenCalledWith(expect.objectContaining(goalSeekParams));
      });
    });
  });

  describe('toMonthlyKwh', () => {
    it('returns a LoadProfile scaled to the monthly load', () => {
      const monthlyLoad = MONTHS.map((i) => ((i + 1) * 100));
      const scaledLoadProfile = loadProfileScaler.toMonthlyKwh(monthlyLoad);

      scaledLoadProfile.sumByMonth().forEach((monthlyTotal, idx) => {
        expect(monthlyTotal).toBeCloseTo(monthlyLoad[idx]);
      });
    });

    it('throws an error with an array without 12 elements', () => {
      const monthlyLoad = MONTHS.slice(1).map((i) => ((i + 1) * 100));
      expect(() => loadProfileScaler.toMonthlyKwh(monthlyLoad)).toThrowError();
    });
  });
});
