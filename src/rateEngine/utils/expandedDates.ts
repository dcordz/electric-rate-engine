import moment from 'moment-timezone';
import times from 'lodash/times';

moment.tz.setDefault('America/New_York');

export interface ExpandedDate {
  month: number;
  hourStart: number;
  dayOfWeek: number;
  date: string;
  hourOfYear: number;
};

const dates = {};

const generateDates = (year: number): Array<ExpandedDate> => {
  const profileTime = moment(year, 'Y');

  return times(profileTime.isLeapYear() ? 8784 : 8760, (hourOfYear) => {
    const val = {
      month: profileTime.month(),
      dayOfWeek: profileTime.day(),
      hourStart: profileTime.hour(),
      date: profileTime.format('YYYY-MM-DD'),
      hourOfYear,
    };

    profileTime.add(1, 'hour');
    return val;
  });
};

export default (year: number): Array<ExpandedDate> => {
  if (!dates[year]) {
    dates[year] = generateDates(year);
  }

  return dates[year];
}
