import { ERateElementType, MONTHS } from '../../constants/index.ts';
import type { RateInterface } from '../../types/index.ts';

const summerPeakCharge = 0.41333;
const summmerOffpeakCharge = 0.34989;
const winterPeakCharge = 0.31624;
const winterOffPeakCharge = 0.29891;

const etouc: RateInterface = {
  name: 'E-TOU-C',
  title: 'Residential Time-Of-Use Service (Peak Pricing 4-9pm Every Day)',
  rateElements: [
    {
      rateElementType: ERateElementType.FixedPerDay,
      name: 'Delivery Charge',
      rateComponents: [
        {
          charge: 0.32854,
          name: 'Delivery Charge',
        },
      ],
    },
    {
      name: 'California Clean Climate Credit',
      rateElementType: ERateElementType.FixedPerMonth,
      rateComponents: [
        {
          charge: [0, 0, 0, -35.73, 0, 0, 0, 0, 0, -35.73, 0, 0],
          name: 'California Clean Climate Credit',
        },
      ],
    },
    {
      name: 'Energy Charges',
      rateElementType: ERateElementType.EnergyTimeOfUse,
      rateComponents: [
        {
          charge: summerPeakCharge,
          months: [5, 6, 7, 8],
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
          hourStarts: [16, 17, 18, 19, 20],
          name: 'summer peak',
        },
        {
          charge: summmerOffpeakCharge,
          months: [5, 6, 7, 8],
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
          hourStarts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 21, 22, 23],
          name: 'summer offpeak',
        },
        {
          charge: winterPeakCharge,
          months: [0, 1, 2, 3, 4, 9, 10, 11],
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
          hourStarts: [16, 17, 18, 19, 20],
          name: 'winter peak',
        },
        {
          charge: winterOffPeakCharge,
          months: [0, 1, 2, 3, 4, 9, 10, 11],
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
          hourStarts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 21, 22, 23],
          name: 'winter offpeak',
        },
      ],
    },
    {
      rateElementType: ERateElementType.BlockedTiersInDays,
      name: 'First Block Discount',
      rateComponents: [
        {
          charge: -0.08633,
          min: MONTHS.map(_ => 0),
          max: MONTHS.map((i) => ([4, 5, 6, 7, 8, 9].includes(i) ? 14.2 : 12)),
          name: 'Discount',
        },
        {
          charge: 0,
          min: MONTHS.map((i) => ([4, 5, 6, 7, 8, 9].includes(i) ? 14.2 : 12)),
          max: MONTHS.map(_ => Infinity),
          name: 'Free Energy!',
        }
      ],
    },
  ],
};

export default etouc;
