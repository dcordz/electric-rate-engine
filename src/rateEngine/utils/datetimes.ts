// From ChatGPT
// A year is a leap year if:
// - it is divisible by 4, and
// - if divisible by 100, it must also be divisible by 400.
export function isLeapYear(_year: number | Date) {
  const year = typeof _year === 'number' ? _year : _year.getFullYear();
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function setYearOnDate(date: Date, year: number) {
  date.setFullYear(year);
  return date;
}

export function zeroDate(date: Date) {
    // Set the date to the beginning of the year (January 1st, 00:00:00)
    return new Date(date.getFullYear(), 0, 1, 2, 0, 0); // (year, month, day)
  }