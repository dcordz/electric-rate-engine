"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs_1 = __importDefault(require("dayjs"));
var times_1 = __importDefault(require("lodash/times"));
var datetimes_1 = require("./datetimes");
var dates = {};
var generateDates = function (year) {
    var profileTime = (0, dayjs_1.default)().year(year).month(0).date(1).hour(0).minute(0).second(0);
    return (0, times_1.default)((0, datetimes_1.isLeapYear)(profileTime.toDate()) ? 8784 : 8760, function (hourOfYear) {
        var val = {
            month: profileTime.month(), // 0-based, January is 0
            dayOfWeek: profileTime.day(), // 0-based, Sunday is 0
            hourStart: profileTime.hour(),
            date: profileTime.format('YYYY-MM-DD'),
            hourOfYear: hourOfYear,
        };
        profileTime = profileTime.add(1, "hour");
        return val;
    });
};
exports.default = (function (year) {
    if (!dates[year]) {
        dates[year] = generateDates(year);
    }
    return dates[year];
});
