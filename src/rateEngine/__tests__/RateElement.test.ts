import RateElement from '../RateElement';
import LoadProfile from '../LoadProfile';
import { RateElementType } from '../BillingDeterminantFactory';

const getLoadProfileOfOnes = () => Array(8760).fill(1);

const FIXED_CHARGE = 10;
const PERCENT_SURCHARGE = 10;
const MONTHS_PER_YEAR = 12;

const FIXED_RATE_ELEMENT_DATA = {
  id: 'fixed-charge',
  rateElementType: 'FixedPerMonth' as RateElementType,
  name: 'A fixed monthly charge',
  rateComponents: [
    {
      charge: FIXED_CHARGE,
      name: 'A $10/mo charge',
    },
  ],
};

const ENERGY_CHARGE_DATA = {
  id: 'energy-charge',
  rateElementType: 'MonthlyEnergy' as RateElementType,
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
          rateElementType: 'SurchargeAsPercent',
          name: '10% surcharge',
          percent: PERCENT_SURCHARGE,
          rateElementIds: ['fixed-charge'],
        },
        new LoadProfile(getLoadProfileOfOnes(), {year: 2019}),
        [
          FIXED_RATE_ELEMENT_DATA
        ]
      );

      expect(rateElement.annualCost()).toEqual(
        FIXED_CHARGE * MONTHS_PER_YEAR * (PERCENT_SURCHARGE / 100)
      );
    });

    describe('when only certain elements need a surcharge', () => {
      it('only surcharges for the specified elements', () => {
        const rateElement = new RateElement(
          {
            rateElementType: 'SurchargeAsPercent',
            name: '10% surcharge',
            percent: PERCENT_SURCHARGE,
            rateElementIds: ['fixed-charge'],
          },
          new LoadProfile(getLoadProfileOfOnes(), {year: 2019}),
          [
            FIXED_RATE_ELEMENT_DATA,
            ENERGY_CHARGE_DATA,
          ]
        );

        expect(rateElement.annualCost()).toEqual(
          FIXED_CHARGE * MONTHS_PER_YEAR * (PERCENT_SURCHARGE / 100)
        );
      });
    });

    describe('when no other rate elements are specified', () => {
      it('returns 0 for the annual cost', () => {
        const rateElement = new RateElement(
          {
            rateElementType: 'SurchargeAsPercent',
            name: '10% surcharge',
            percent: PERCENT_SURCHARGE,
            rateElementIds: [],
          },
          new LoadProfile(getLoadProfileOfOnes(), {year: 2019}),
          [
            FIXED_RATE_ELEMENT_DATA,
            ENERGY_CHARGE_DATA,
          ]
        );

        expect(rateElement.annualCost()).toEqual(0);
      })
    });

    describe('when appliesToAll is specified', () => {
      it('surcharges all other rate elements', () => {
        const rateElement = new RateElement(
          {
            rateElementType: 'SurchargeAsPercent',
            name: '10% surcharge',
            percent: PERCENT_SURCHARGE,
            appliesToAll: true,
          },
          new LoadProfile(getLoadProfileOfOnes(), {year: 2019}),
          [
            FIXED_RATE_ELEMENT_DATA,
            ENERGY_CHARGE_DATA,
          ]
        );

        const ENERGY_CHARGE_FOR_YEAR = 8760;
        expect(rateElement.annualCost()).toEqual(
          (ENERGY_CHARGE_FOR_YEAR + FIXED_CHARGE * MONTHS_PER_YEAR) * PERCENT_SURCHARGE / 100
        );
      });
    });
  });
});
