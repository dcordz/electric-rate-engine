import dayjs from "dayjs";
// @ts-expect-error - no import from dayjs
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone)
// @ts-expect-error - no import from dayjs
dayjs.tz.setDefault("America/New_York")

import { times } from 'lodash-es';
import type { ExpandedDate } from '../types/index.ts';
import { isLeapYear } from './datetimes.ts';

const dates: Record<number, Array<ExpandedDate>> = {};

const generateDates = (year: number): Array<ExpandedDate> => {
  let profileTime = dayjs().year(year).month(0).date(1).hour(0).minute(0).second(0);

  return times(isLeapYear(profileTime.toDate()) ? 8784 : 8760, (hourOfYear) => {
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
