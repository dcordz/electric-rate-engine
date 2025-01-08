import { isLeapYear, setYearOnDate } from './datetimes';

export const daysPerMonth = (year?: number): Array<number> => {
  const _isLeapYear = year === undefined ? false : isLeapYear(setYearOnDate(new Date(), year));
  return [31, _isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};
