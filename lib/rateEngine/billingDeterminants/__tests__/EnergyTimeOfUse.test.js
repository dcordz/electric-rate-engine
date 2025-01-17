"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadProfile_1 = __importDefault(require("../../LoadProfile"));
var times_1 = __importDefault(require("lodash/times"));
var EnergyTimeOfUse_1 = __importDefault(require("../EnergyTimeOfUse"));
var EnergyTimeOfUseData_1 = __importDefault(require("./EnergyTimeOfUseData"));
var getLoadProfileOfOnes = function () { return (0, times_1.default)(8760, function () { return 1; }); };
var sumByMonthNoFilters = [744, 672, 743, 720, 744, 720, 744, 744, 720, 744, 721, 744];
var zerosByMonth = (0, times_1.default)(12, function () { return 0; });
describe('EnergyTimeOfUse', function () {
    var loadProfile;
    beforeEach(function () {
        loadProfile = new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2019 });
    });
    describe('calculate', function () {
        it('calculates energy time of use with nothing filtered', function () {
            var result = new EnergyTimeOfUse_1.default({
                months: [],
                daysOfWeek: [],
                hourStarts: [],
                onlyOnDays: [],
                exceptForDays: [],
            }, loadProfile).calculate();
            expect(result).toEqual(sumByMonthNoFilters);
        });
        it('calculates energy time of use with everything filtered', function () {
            var result = new EnergyTimeOfUse_1.default({
                months: [],
                daysOfWeek: [],
                hourStarts: [],
                onlyOnDays: ['2015-01-01'],
                exceptForDays: [],
            }, loadProfile).calculate();
            expect(result).toEqual(zerosByMonth);
        });
        EnergyTimeOfUseData_1.default.forEach(function (_a) {
            var name = _a.name, filters = _a.filters, inputLoadProfileData = _a.inputLoadProfileData, billingDeterminantsByMonth = _a.billingDeterminantsByMonth;
            var inputLoadProfile = new LoadProfile_1.default(inputLoadProfileData, { year: 2019 });
            it("calculates energy time of use for ".concat(name, " filters"), function () {
                var result = new EnergyTimeOfUse_1.default(filters, inputLoadProfile).calculate();
                expect(result).toEqual(billingDeterminantsByMonth);
            });
        });
    });
});
