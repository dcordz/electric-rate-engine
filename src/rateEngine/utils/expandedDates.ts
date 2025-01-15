import dayjs from "dayjs";
// @ts-ignore - no import from dayjs
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone)
// @ts-ignore - no import from dayjs
dayjs.tz.setDefault("America/New_York")

import type { ExpandedDate } from '../types/index.ts';
import { isLeapYear } from './datetimes.ts';

const dates: Record<number, Array<ExpandedDate>> = {};

const generateDates = (year: number): Array<ExpandedDate> => {
  let profileTime = dayjs().year(year).month(0).date(1).hour(0).minute(0).second(0);

  return new Array(isLeapYear(profileTime.toDate()) ? 8784 : 8760).fill(0).map((_, hourOfYear) => {
    const val = { 
      month: profileTime.month(), // 0-based, January is 0
      dayOfWeek: profileTime.day(), // 0-based, Sunday is 0
      hourStart: profileTime.hour(),
      date: profileTime.format('YYYY-MM-DD'),
      hourOfYear,
    };

    profileTime = profileTime.add(1, "hour")
    return val;
  });
};

export default (year: number): Array<ExpandedDate> => {
  if (!dates[year]) {
    dates[year] = generateDates(year);
  }

  return dates[year];
};
