// From ChatGPT
// A year is a leap year if:
// - it is divisible by 4, and
// - if divisible by 100, it must also be divisible by 400.
export function isLeapYear(_year) {
    const year = typeof _year === 'number' ? _year : _year.getFullYear();
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
export function setYearOnDate(date, year) {
    date.setFullYear(year);
    return date;
}
