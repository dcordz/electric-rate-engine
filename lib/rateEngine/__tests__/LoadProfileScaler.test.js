"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadProfileScaler_1 = __importDefault(require("../LoadProfileScaler"));
var times_1 = __importDefault(require("lodash/times"));
var LoadProfile_1 = __importDefault(require("../LoadProfile"));
var goal_seek_1 = __importDefault(require("goal-seek"));
var e_1_1 = __importDefault(require("../__mocks__/rates/e-1"));
var getLoadProfileOfOnes = function () { return (0, times_1.default)(8760, function () { return 1; }); };
var getLoadProfileOfTwos = function () { return (0, times_1.default)(8760, function () { return 2; }); };
jest.mock('goal-seek');
describe('LoadProfileScaler', function () {
    var initialLoadProfile = new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2019 });
    var loadProfileScaler;
    beforeEach(function () {
        loadProfileScaler = new LoadProfileScaler_1.default(initialLoadProfile);
    });
    describe('to', function () {
        it('multiplies all entries in the load profile by the given scaler', function () {
            expect(loadProfileScaler.to(2)).toEqual(new LoadProfile_1.default(getLoadProfileOfTwos(), { year: 2019 }));
        });
    });
    describe('toTotalKwh', function () {
        it('returns a loadprofile whose sum totals the given kWh', function () {
            var totalKwh = 18705;
            var loadProfile = new LoadProfile_1.default((0, times_1.default)(8760, function (i) { return i % 10; }), { year: 2019 });
            var newLoadProfileScaler = new LoadProfileScaler_1.default(loadProfile);
            expect(loadProfileScaler.toTotalKwh(totalKwh).sum()).toBeCloseTo(totalKwh);
            expect(newLoadProfileScaler.toTotalKwh(totalKwh).sum()).toBeCloseTo(totalKwh);
        });
    });
    describe('toAverageMonthlyBill', function () {
        describe('with a mock', function () {
            it('scales by the scaler that goal-seek finds', function () {
                // @ts-ignore
                goal_seek_1.default.mockImplementationOnce(function () { return 200; });
                var scaledLoadProfile = loadProfileScaler.toAverageMonthlyBill(100, e_1_1.default);
                expect(scaledLoadProfile).toEqual(new LoadProfile_1.default(getLoadProfileOfTwos(), { year: 2019 }));
            });
            it('throws the error if goal-seek fails', function () {
                // @ts-ignore
                goal_seek_1.default.mockImplementationOnce(function () { throw ('some goal-seek error'); });
                expect(function () { return loadProfileScaler.toAverageMonthlyBill(100, e_1_1.default); }).toThrow('some goal-seek error');
            });
            it('passes extra parameters to the goal-seek function', function () {
                // @ts-ignore
                goal_seek_1.default.mockImplementationOnce(function () { return 200; });
                var goalSeekParams = {
                    maxStep: 55,
                    aUselessParam: true,
                };
                loadProfileScaler.toAverageMonthlyBill(100, e_1_1.default, goalSeekParams);
                // @ts-ignore
                expect(goal_seek_1.default).toHaveBeenCalledWith(expect.objectContaining(goalSeekParams));
            });
        });
    });
    describe('toMonthlyKwh', function () {
        it('returns a LoadProfile scaled to the monthly load', function () {
            var monthlyLoad = (0, times_1.default)(12, function (i) { return ((i + 1) * 100); });
            var scaledLoadProfile = loadProfileScaler.toMonthlyKwh(monthlyLoad);
            scaledLoadProfile.sumByMonth().forEach(function (monthlyTotal, idx) {
                expect(monthlyTotal).toBeCloseTo(monthlyLoad[idx]);
            });
        });
        it('throws an error with an array without 12 elements', function () {
            var monthlyLoad = (0, times_1.default)(11, function (i) { return ((i + 1) * 100); });
            expect(function () { return loadProfileScaler.toMonthlyKwh(monthlyLoad); }).toThrowError();
        });
    });
});
