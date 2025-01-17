"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assumptions_1 = require("../assumptions");
var leapYearDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var nonLeapYearDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
describe('daysPerMonth', function () {
    it('gets days per month for a non-leap year', function () {
        expect((0, assumptions_1.daysPerMonth)(2019)).toEqual(nonLeapYearDays);
    });
    it('gets days per month for a leap year', function () {
        expect((0, assumptions_1.daysPerMonth)(2016)).toEqual(leapYearDays);
    });
    it('gets days per month for an unspecified year', function () {
        expect((0, assumptions_1.daysPerMonth)()).toEqual(nonLeapYearDays);
    });
});
