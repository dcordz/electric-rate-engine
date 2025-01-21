import LoadProfileScaler from '../LoadProfileScaler.ts';
import { times } from 'lodash-es';
import LoadProfile from '../LoadProfile.ts';
import e1 from '../__mocks__/rates/e-1.ts';
import RateCalculator from '../RateCalculator.ts';
import type { RateInterface } from '../types/index.ts';
import { ERateElementType } from '../constants/index.ts';
import { jest } from '@jest/globals';

const getLoadProfileOfOnes = () => times(8760, () => 1);

const dummyRate: RateInterface = {
  name: 'some rate',
  title: 'that will not converge',
  rateElements: [
    {
      rateElementType: ERateElementType.FixedPerMonth,
      name: 'Customer Charge',
      rateComponents: [
        {
          charge: 500,
          name: 'Customer Charge',
        },
      ],
    },
    {
      rateElementType: ERateElementType.MonthlyDemand,
      name: 'Demand Charge',
      rateComponents: [
        {
          charge: 20,
          name: 'Demand Charge',
        },
      ],
    },
    {
      rateElementType: ERateElementType.MonthlyEnergy,
      name: 'Energy Charge',
      rateComponents: [
        {
          charge: 0.18999,
          name: 'Energy Charge',
        },
      ],
    },
  ],
};

describe('LoadProfileScaler', () => {
  const initialLoadProfile = new LoadProfile(getLoadProfileOfOnes(), { year: 2019 });
  let loadProfileScaler: LoadProfileScaler;

  beforeEach(() => {
    loadProfileScaler = new LoadProfileScaler(initialLoadProfile);
  });

  describe('toAverageMonthlyBill', () => {
    afterEach(() => {
      jest.resetModules();
    });

    describe('without a mock', () => {
      beforeEach(() => {
        jest.dontMock('goal-seek');
      });

      it('returns a LoadProfile', () => {
        const scaledLoadProfile = loadProfileScaler.toAverageMonthlyBill(100, e1);
        expect(scaledLoadProfile).toBeInstanceOf(LoadProfile);
      });

      it('converges with a large bill amount', () => {
        const billAmount = 10000;
        const scaledLoadProfile = loadProfileScaler.toAverageMonthlyBill(billAmount, dummyRate);

        const rateCalculator = new RateCalculator({
          ...dummyRate,
          loadProfile: scaledLoadProfile,
        });
        expect(rateCalculator.annualCost() / 12).toBeCloseTo(billAmount);
      });
    });
  });

  describe('optional debugging', () => {
    it('prints things to the console', () => {
      console.log = jest.fn();

      new LoadProfileScaler(initialLoadProfile, { debug: true }).toAverageMonthlyBill(100, e1);

      expect(console.log).toHaveBeenCalled();
    });
  });
});
