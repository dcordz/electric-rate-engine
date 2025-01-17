import { ERateElementType, MONTHS } from '../../constants/index.ts';
import type { RateInterface } from '../../types/index.ts';

const SUMMMER_MONTHS = [4, 5, 6, 7, 8, 9];
const cutoff_1 = MONTHS.map((i) => (SUMMMER_MONTHS.includes(i) ? 13 : 12.5));
const cutoff_2 = MONTHS.map((i) => (SUMMMER_MONTHS.includes(i) ? 52 : 50));

const e1: RateInterface = {
  name: 'E-1',
  title: 'Residential Services',
  rateElements: [
    {
      name: 'Delivery Charge',
      rateElementType: ERateElementType.FixedPerDay,
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
      name: 'Total Energy Rates',
      rateElementType: ERateElementType.BlockedTiersInDays,
      rateComponents: [
        {
          charge: 0.24373,
          min: MONTHS.map(_ => 0),
          max: cutoff_1,
          name: 'Tier 1',
        },
        {
          charge: 0.30672,
          min: cutoff_1,
          max: cutoff_2,
          name: 'Tier 2',
        },
        {
          charge: 0.53738,
          min: cutoff_2,
          max: MONTHS.map(_ => Infinity),
          name: 'Tier 3',
        },
      ],
    },
  ],
};

export default e1;
