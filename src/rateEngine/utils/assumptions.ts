import moment from 'moment-timezone';

export const daysPerMonth = (year?: number): Array<number> => {
  const isLeapYear = year === undefined ? false : moment(year, 'Y').isLeapYear();
  return [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};
