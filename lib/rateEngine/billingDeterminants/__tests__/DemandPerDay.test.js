"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadProfile_1 = __importDefault(require("../../LoadProfile"));
var times_1 = __importDefault(require("lodash/times"));
var DemandPerDay_1 = __importDefault(require("../DemandPerDay"));
var DemandPerDayData_1 = __importDefault(require("./DemandPerDayData"));
var assumptions_1 = require("../../utils/assumptions");
var getLoadProfileOfOnes = function () { return (0, times_1.default)(8760, function () { return 1; }); };
var zerosByMonth = (0, times_1.default)(12, function () { return 0; });
describe('DemandPerDay', function () {
    var loadProfile;
    beforeEach(function () {
        loadProfile = new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2019 });
    });
    describe('calculate', function () {
        it('calculates demand per day with nothing filtered', function () {
            var result = new DemandPerDay_1.default({
                months: [],
                daysOfWeek: [],
                hourStarts: [],
                onlyOnDays: [],
                exceptForDays: [],
            }, loadProfile).calculate();
            result.forEach(function (val, i) {
                expect(val).toBeCloseTo((0, assumptions_1.daysPerMonth)(loadProfile.year)[i]);
            });
        });
        it('calculates demand per day with everything filtered', function () {
            var result = new DemandPerDay_1.default({
                months: [],
                daysOfWeek: [],
                hourStarts: [],
                onlyOnDays: ['2015-01-01'],
                exceptForDays: [],
            }, loadProfile).calculate();
            result.forEach(function (val, i) {
                expect(val).toBeCloseTo(zerosByMonth[i]);
            });
        });
        DemandPerDayData_1.default.forEach(function (_a) {
            var name = _a.name, filters = _a.filters, inputLoadProfileData = _a.inputLoadProfileData, billingDeterminantsByMonth = _a.billingDeterminantsByMonth;
            var inputLoadProfile = new LoadProfile_1.default(inputLoadProfileData, { year: 2019 });
            it("calculates demand per day for ".concat(name), function () {
                var result = new DemandPerDay_1.default(filters, inputLoadProfile).calculate();
                result.forEach(function (val, i) {
                    expect(val).toBeCloseTo(billingDeterminantsByMonth[i]);
                });
            });
        });
    });
});
