import LoadProfile from '../LoadProfile.ts';
import RateCalculator from '../RateCalculator.ts';
import type { RateInterface } from '../types/index.ts';
import { BillingCategory, ERateElementType } from '../constants/index.ts';

describe('RateCalculator', () => {
  describe('annualCost', () => {
    it('calculates annual the annual cost', () => {
      const rate: RateInterface = {
        name: 'a rate with multiple elements',
        title: 'anything',
        rateElements: [
          {
            name: 'One fixed charge',
            billingCategory: BillingCategory.SUPPLY,
            rateElementType: ERateElementType.FixedPerMonth,
            rateComponents: [
              {
                charge: 10,
                name: 'The first fixed charge',
              },
            ],
          },
          {
            name: 'Second fixed charge',
            billingCategory: BillingCategory.DELIVERY,
            rateElementType: ERateElementType.FixedPerMonth,
            rateComponents: [
              {
                charge: 20,
                name: 'The second fixed charge',
              },
            ],
          },
        ],
      };

      const loadProfile = new LoadProfile(Array(8760).fill(0), {year: 2019});
      const rateCalculator = new RateCalculator({loadProfile, ...rate});

      expect(rateCalculator.annualCost()).toEqual(360);
      expect(rateCalculator.annualCost({billingCategories: [BillingCategory.SUPPLY]})).toEqual(120);
      expect(rateCalculator.annualCost({billingCategories: [BillingCategory.DELIVERY]})).toEqual(240);
    });
  });
});
