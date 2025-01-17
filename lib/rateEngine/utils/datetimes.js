"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLeapYear = isLeapYear;
exports.setYearOnDate = setYearOnDate;
// From ChatGPT
// A year is a leap year if:
// - it is divisible by 4, and
// - if divisible by 100, it must also be divisible by 400.
function isLeapYear(_year) {
    var year = typeof _year === 'number' ? _year : _year.getFullYear();
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function setYearOnDate(date, year) {
    date.setFullYear(year);
    return date;
}
