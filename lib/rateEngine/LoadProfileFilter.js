"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoadProfileFilter = /** @class */ (function () {
    function LoadProfileFilter(filters) {
        this.months = this.sanitize(filters.months);
        this.daysOfWeek = this.sanitize(filters.daysOfWeek);
        this.hourStarts = this.sanitize(filters.hourStarts);
        this.onlyOnDays = this.sanitize(filters.onlyOnDays);
        this.exceptForDays = this.sanitize(filters.exceptForDays);
        this.hoursOfYear = this.sanitize(filters.hoursOfYear);
    }
    LoadProfileFilter.prototype.matches = function (_a) {
        var month = _a.month, date = _a.date, dayOfWeek = _a.dayOfWeek, hourStart = _a.hourStart, hourOfYear = _a.hourOfYear;
        return ((this.exceptForDays ? !this.exceptForDays.includes(date) : true) &&
            (this.onlyOnDays ? this.onlyOnDays.includes(date) : true) &&
            (this.months ? this.months.includes(month) : true) &&
            (this.daysOfWeek ? this.daysOfWeek.includes(dayOfWeek) : true) &&
            (this.hourStarts ? this.hourStarts.includes(hourStart) : true) &&
            (this.hoursOfYear ? this.hoursOfYear.includes(hourOfYear) : true));
    };
    LoadProfileFilter.prototype.sanitize = function (arg) {
        if (arg && arg.length === 0) {
            return undefined;
        }
        return arg;
    };
    return LoadProfileFilter;
}());
exports.default = LoadProfileFilter;
