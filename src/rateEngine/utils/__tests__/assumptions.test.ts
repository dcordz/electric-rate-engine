import { daysPerMonth } from '../assumptions.ts';

const leapYearDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const nonLeapYearDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

describe('daysPerMonth', () => {
  it('gets days per month for a non-leap year', () => {
    expect(daysPerMonth(2019)).toEqual(nonLeapYearDays);
  });

  it('gets days per month for a leap year', () => {
    expect(daysPerMonth(2016)).toEqual(leapYearDays);
  });

  it('gets days per month for an unspecified year', () => {
    expect(daysPerMonth()).toEqual(nonLeapYearDays);
  });
});
