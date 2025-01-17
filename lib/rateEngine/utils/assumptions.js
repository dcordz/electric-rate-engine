"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daysPerMonth = void 0;
var datetimes_1 = require("./datetimes");
var daysPerMonth = function (year) {
    var _isLeapYear = year === undefined ? false : (0, datetimes_1.isLeapYear)((0, datetimes_1.setYearOnDate)(new Date(), year));
    return [31, _isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};
exports.daysPerMonth = daysPerMonth;
