"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadProfile_1 = __importDefault(require("../LoadProfile"));
var times_1 = __importDefault(require("lodash/times"));
var LoadProfileScaler_1 = __importDefault(require("../LoadProfileScaler"));
var getLoadProfileOfOnes = function () { return (0, times_1.default)(8760, function () { return 1; }); };
var options = { year: 2018 };
describe('Load Profile', function () {
    var loadProfile;
    beforeEach(function () {
        loadProfile = new LoadProfile_1.default(getLoadProfileOfOnes(), options);
    });
    describe('instantiation', function () {
        it('can be instantiated with another load profile', function () {
            var newLoadProfile = new LoadProfile_1.default(loadProfile, options);
            var expanded = newLoadProfile.expanded();
            expect(expanded[0]).toEqual({
                load: 1,
                month: 0,
                dayOfWeek: 1,
                hourOfYear: 0,
                hourStart: 0,
                date: '2018-01-01',
            });
        });
    });
    describe('expanded', function () {
        it('creates an expanded load profile', function () {
            var expanded = loadProfile.expanded();
            expect(expanded[0]).toEqual({
                load: 1,
                month: 0,
                dayOfWeek: 1,
                hourOfYear: 0,
                hourStart: 0,
                date: '2018-01-01',
            });
        });
    });
    describe('filterBy', function () {
        it('filters by month', function () {
            var filteredByMonth = loadProfile.filterBy({ months: [0] });
            expect(filteredByMonth.expanded().map(function (_a) {
                var load = _a.load;
                return load;
            })).toEqual((new Array(31 * 24).fill(1)).concat((new Array(8760 - (31 * 24))).fill(0)));
        });
    });
    describe('sum', function () {
        it('sums the load profile values', function () {
            expect(loadProfile.sum()).toEqual(8760);
            expect(loadProfile.filterBy({ months: [0] }).sum()).toEqual(31 * 24);
        });
    });
    describe('leap year', function () {
        it('handles leap year load profiles', function () {
            var leapYearLoadProfile = new LoadProfile_1.default((0, times_1.default)(8784, function () { return 1; }), { year: 2020 });
            expect(leapYearLoadProfile.sum()).toEqual(8784);
            expect(leapYearLoadProfile.filterBy({ months: [1] }).sum()).toEqual(29 * 24);
        });
        it('raises an error when the data and the expected year hours dont match up', function () {
            expect(function () { return new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2020 }); }).toThrow("Load profile length didn't match annual hours length. It's likely a leap year is involved.");
            expect(function () { return new LoadProfile_1.default((0, times_1.default)(8784, function () { return 1; }), { year: 2019 }); }).toThrow("Load profile length didn't match annual hours length. It's likely a leap year is involved.");
        });
    });
    describe('count', function () {
        it('returns the count', function () {
            expect(loadProfile.count()).toEqual(8760);
        });
        it('allows a length property too', function () {
            expect(loadProfile.length).toEqual(8760);
        });
    });
    describe('average', function () {
        it('calculates the average load', function () {
            expect(loadProfile.average()).toEqual(1);
        });
    });
    describe('max', function () {
        it('returns the max load', function () {
            var maxLoadData = getLoadProfileOfOnes();
            maxLoadData[83] = 4; // set some arbitrary element to somethign bigger than a 1
            loadProfile = new LoadProfile_1.default(maxLoadData, options);
            expect(loadProfile.max()).toEqual(4);
        });
        it('works empty', function () {
            loadProfile = new LoadProfile_1.default([], { year: 2018 });
            expect(loadProfile.max()).toEqual(0);
        });
    });
    describe('sumByMonth', function () {
        it('returns a monthly array of summed load', function () {
            var loadProfile = new LoadProfile_1.default(getLoadProfileOfOnes(), options);
            expect(loadProfile.sumByMonth()).toEqual([744, 672, 743, 720, 744, 720, 744, 744, 720, 744, 721, 744]);
        });
    });
    describe('maxByMonth', function () {
        it('returns a monthly array of max load', function () {
            var loadProfileData = getLoadProfileOfOnes();
            var loadProfileOfOnes = new LoadProfile_1.default(getLoadProfileOfOnes(), options);
            // This gets the index of the first Wednesday of each month
            // so that we can set a max value for each month that is > 1.
            var maxhours = (0, times_1.default)(12).map(function (monthIdx) {
                var _a;
                var hourOfMonth = loadProfileOfOnes.expanded().find(function (_a) {
                    var month = _a.month, dayOfWeek = _a.dayOfWeek;
                    return (month === monthIdx && dayOfWeek === 3);
                });
                // .find's interface returns T | undefined so we need the ?? 0 here although it should never be 0
                return (_a = hourOfMonth === null || hourOfMonth === void 0 ? void 0 : hourOfMonth.hourOfYear) !== null && _a !== void 0 ? _a : 0;
            });
            var maxes = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
            maxhours.forEach(function (hour, idx) {
                loadProfileData[hour] = maxes[idx];
            });
            expect(new LoadProfile_1.default(loadProfileData, options).maxByMonth()).toEqual(maxes);
        });
    });
    describe('loadFactor', function () {
        it('returns one from our load profile of ones', function () {
            expect(loadProfile.loadFactor()).toEqual(1);
        });
        it('returns nearly 0 for a load profile with just one 1', function () {
            loadProfile = new LoadProfile_1.default(__spreadArray([1], (0, times_1.default)(8759, function () { return 0; }), true), options);
            expect(loadProfile.loadFactor()).toBeCloseTo(0);
        });
        it('returns .5 for a half and half load profile', function () {
            loadProfile = new LoadProfile_1.default(__spreadArray(__spreadArray([], (0, times_1.default)(4380, function () { return 10; }), true), (0, times_1.default)(4380, function () { return 0; }), true), options);
            expect(loadProfile.loadFactor()).toEqual(.5);
        });
        it('works empty', function () {
            var lp = new LoadProfile_1.default([], { year: 2018 });
            expect(lp.loadFactor()).toEqual(0);
        });
    });
    describe('scale', function () {
        it('returns a LoadProfileScaler instance', function () {
            expect(loadProfile.scale()).toEqual(new LoadProfileScaler_1.default(loadProfile));
        });
    });
    describe('loadShift', function () {
        it('returns a shifted load profile instance', function () {
            var shiftedLoadProfile = loadProfile.loadShift(1, { months: [0] });
            expect(shiftedLoadProfile).toEqual(new LoadProfile_1.default((new Array(31 * 24).fill(2)).concat((new Array(8760 - (31 * 24))).fill(1)), options));
        });
    });
    describe('aggregate', function () {
        it('sums the load profiles by indexes', function () {
            expect(loadProfile.aggregate(loadProfile)).toEqual(new LoadProfile_1.default((new Array(8760).fill(2)), options));
        });
    });
    describe('loadValues', function () {
        it('returns an array of load values', function () {
            expect(loadProfile.loadValues()).toEqual(getLoadProfileOfOnes());
        });
    });
});
