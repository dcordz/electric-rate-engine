import type { ExpandedDate } from '../types/index.ts';
import { isLeapYear } from './datetimes.ts';

const dates: Record<number, Array<ExpandedDate>> = {};

function format(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const generateDates = (year: number): Array<ExpandedDate> => {
  const profileTime = new Date()
  profileTime.setFullYear(year)

  return new Array(isLeapYear(profileTime) ? 8784 : 8760).fill(0).map((_, hourOfYear) => {
    const startOfYear = new Date(year, 0, 1, 0, 0, 0);
    const date = new Date(startOfYear.getTime() + hourOfYear * 60 * 60 * 1000);

    return {
      month: date.getMonth(), // 0-based, January is 0
      dayOfWeek: date.getDay(), // 0-based, Sunday is 0
      hourStart: date.getHours(),
      date: format(date),
      hourOfYear,
    };
  });
};

export default (year: number): Array<ExpandedDate> => {
  if (!dates[year]) {
    dates[year] = generateDates(year);
  }
  return dates[year];
};
