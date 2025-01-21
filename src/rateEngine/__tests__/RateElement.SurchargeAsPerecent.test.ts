import RateElement from '../RateElement.ts';
import LoadProfile from '../LoadProfile.ts';
import type { RateElementInterface } from '../types/index.ts';
import { BillingCategory, RateElementClassification, RateElementTypeEnum } from '../constants/index.ts';

const getLoadProfileOfOnes = () => Array(8760).fill(1);

const FIXED_CHARGE = 10;
const SURCHARGE_AS_DECIMAL = 0.10;
const MONTHS_PER_YEAR = 12;

const FIXED_RATE_ELEMENT_DATA: RateElementInterface = {
  id: 'fixed-charge',
  rateElementType: RateElementTypeEnum.FixedPerMonth,
  name: 'A fixed monthly charge',
  rateComponents: [
    {
      charge: FIXED_CHARGE,
      name: 'A $10/mo charge',
    },
  ],
};

const ENERGY_CHARGE_DATA: RateElementInterface = {
  id: 'energy-charge',
  rateElementType: RateElementTypeEnum.MonthlyEnergy,
  name: 'An energy charge',
  rateComponents: [
    {
      charge: 1,
      name: 'An energy charge',
    }
  ]
};

describe('RateElement', () => {
  describe('SurchargeAsPercent', () => {
    it('calculates the surcharge', () => {
      const rateElement = new RateElement(
        {
          rateElementType: RateElementTypeEnum.SurchargeAsPercent,
          name: '10% surcharge',
          rateComponents: [
            {
              name: '10% surcharge',
              charge: SURCHARGE_AS_DECIMAL,
              ids: ['fixed-charge'],
            },
          ],
        },
        new LoadProfile(getLoadProfileOfOnes(), {year: 2019}),
        [
          FIXED_RATE_ELEMENT_DATA
        ]
      );

      expect(rateElement.annualCost()).toEqual(
        FIXED_CHARGE * MONTHS_PER_YEAR * SURCHARGE_AS_DECIMAL
      );
    });

    describe('when only certain elements need a surcharge', () => {
      it('only surcharges for the specified elements', () => {
        const rateElement = new RateElement(
          {
            rateElementType: RateElementTypeEnum.SurchargeAsPercent,
            name: '10% surcharge',
            rateComponents: [
              {
                name: '10% surcharge',
                charge: SURCHARGE_AS_DECIMAL,
                ids: ['fixed-charge'],
              },
            ]
          },
          new LoadProfile(getLoadProfileOfOnes(), {year: 2019}),
          [
            FIXED_RATE_ELEMENT_DATA,
            ENERGY_CHARGE_DATA,
          ]
        );

        expect(rateElement.annualCost()).toEqual(
          FIXED_CHARGE * MONTHS_PER_YEAR * SURCHARGE_AS_DECIMAL
        );
      });
    });

    describe('when no other rate elements are specified', () => {
      it('surcharges all other rate elements', () => {
        const rateElement = new RateElement(
          {
            rateElementType: RateElementTypeEnum.SurchargeAsPercent,
            name: '10% surcharge',
            rateComponents: [
              {
                name: '10% surcharge',
                charge: SURCHARGE_AS_DECIMAL,
              }
            ]
          },
          new LoadProfile(getLoadProfileOfOnes(), {year: 2019}),
          [
            FIXED_RATE_ELEMENT_DATA,
            ENERGY_CHARGE_DATA,
          ]
        );

        const ENERGY_CHARGE_FOR_YEAR = 8760;
        expect(rateElement.annualCost()).toEqual(
          (ENERGY_CHARGE_FOR_YEAR + FIXED_CHARGE * MONTHS_PER_YEAR) * SURCHARGE_AS_DECIMAL
        );
      })
    });
  });

  describe('.matches()', () => {
    describe('with a blank object', () => {
      it('returns true', () => {
        const rateElement = new RateElement(
          {
            name: 'rate element',
            rateElementType: RateElementTypeEnum.FixedPerMonth,
            rateComponents: [],
          },
          new LoadProfile(getLoadProfileOfOnes(), {year: 2019})
        );

        expect(rateElement.matches({})).toBe(true);
      });
    });

    describe('with an id', () => {
      it('returns true with a match', () => {
        const rateElement = new RateElement(
          {
            id: 'some-id',
            name: 'rate element',
            rateElementType: RateElementTypeEnum.FixedPerMonth,
            rateComponents: [],
          },
          new LoadProfile(getLoadProfileOfOnes(), {year: 2019})
        );

        expect(rateElement.matches({ids: ['some-id']})).toBe(true);
      });

      it('returns false when it does not match', () => {
        const rateElement = new RateElement(
          {
            id: 'some-id',
            name: 'rate element',
            rateElementType: RateElementTypeEnum.FixedPerMonth,
            rateComponents: [],
          },
          new LoadProfile(getLoadProfileOfOnes(), {year: 2019})
        );

        expect(rateElement.matches({ids: ['non-matching']})).toBe(false);
      });
    });

    describe('with a billingCategory', () => {
      it('returns true with a match', () => {
        const rateElement = new RateElement(
          {
            billingCategory: BillingCategory.SUPPLY,
            name: 'rate element',
            rateElementType: RateElementTypeEnum.FixedPerMonth,
            rateComponents: [],
          },
          new LoadProfile(getLoadProfileOfOnes(), {year: 2019})
        );

        expect(rateElement.matches({billingCategories: [BillingCategory.SUPPLY]})).toBe(true);
      });

      it('returns false when it does not match', () => {
        const rateElement = new RateElement(
          {
            billingCategory: BillingCategory.SUPPLY,
            name: 'rate element',
            rateElementType: RateElementTypeEnum.FixedPerMonth,
            rateComponents: [],
          },
          new LoadProfile(getLoadProfileOfOnes(), {year: 2019})
        );

        expect(rateElement.matches({billingCategories: [BillingCategory.DELIVERY]})).toBe(false);
      });
    });

    describe('with a classification', () => {
      it('returns true with a match', () => {
        const rateElement = new RateElement(
          {
            name: 'rate element',
            rateElementType: RateElementTypeEnum.FixedPerMonth,
            rateComponents: [
              {
                charge: 1.5,
                name: 'this has to exist to set the classification'
              }
            ],
          },
          new LoadProfile(getLoadProfileOfOnes(), {year: 2019})
        );

        expect(rateElement.matches({classifications: [RateElementClassification.FIXED]})).toBe(true);
      });

      it('returns false when it does not match', () => {
        const rateElement = new RateElement(
          {
            name: 'rate element',
            rateElementType: RateElementTypeEnum.FixedPerMonth,
            rateComponents: [
              {
                charge: 1.5,
                name: 'this has to exist to set the classification'
              }
            ],
          },
          new LoadProfile(getLoadProfileOfOnes(), {year: 2019})
        );

        expect(rateElement.matches({classifications: [RateElementClassification.DEMAND]})).toBe(false);
      });
    });
  });
});
