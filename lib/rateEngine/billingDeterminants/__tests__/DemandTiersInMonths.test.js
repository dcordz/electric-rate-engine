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
var LoadProfile_1 = __importDefault(require("../../LoadProfile"));
var DemandTiersInMonths_1 = __importDefault(require("../DemandTiersInMonths"));
var KWS_GREATER_THAN_ONE = [2, 5, 20, 15, 12, 17, 4, 8, 30, 10, 4, 15];
var YEAR = 2019;
var loadProfileData = new Array(8760).fill(1);
var ONE_MONTH_IN_HOURS = 30 * 24;
var TEN_DAYS_IN_HOURS = 10 * 24; // one month in hours is approximate, so add a 10 day buffer at the end
KWS_GREATER_THAN_ONE.forEach(function (load, monthIdx) {
    // Set these load values to some arbitrary hour in each month
    var idx = (monthIdx * ONE_MONTH_IN_HOURS) + TEN_DAYS_IN_HOURS;
    loadProfileData[idx] = load;
});
var loadProfile = new LoadProfile_1.default(loadProfileData, { year: YEAR });
describe('DemandTiers', function () {
    describe('non time filtered', function () {
        it('calculates a limitless tier', function () {
            var tiers = new DemandTiersInMonths_1.default({
                min: Array(12).fill(0),
                max: Array(12).fill(Infinity),
            }, loadProfile);
            expect(tiers.calculate()).toEqual(KWS_GREATER_THAN_ONE);
        });
        it('calculates a lower bounded tier', function () {
            var tiers = new DemandTiersInMonths_1.default({
                min: Array(12).fill(1),
                max: Array(12).fill(Infinity),
            }, loadProfile);
            expect(tiers.calculate()).toEqual(KWS_GREATER_THAN_ONE.map(function (load) { return load - 1; }));
        });
        it('calculates an upper bounded tier', function () {
            var tiers = new DemandTiersInMonths_1.default({
                min: Array(12).fill(0),
                max: Array(12).fill(1),
            }, loadProfile);
            expect(tiers.calculate()).toEqual(Array(12).fill(1));
        });
        it('calculates a tier bounded on both sides', function () {
            var MIN = 1;
            var MAX = 5;
            var tiers = new DemandTiersInMonths_1.default({
                min: Array(12).fill(MIN),
                max: Array(12).fill(MAX),
            }, loadProfile);
            var expected = [1, 4, 4, 4, 4, 4, 3, 4, 4, 4, 3, 4];
            expect(tiers.calculate()).toEqual(expected);
        });
    });
    describe('with time specific filters', function () {
        it('calculates a limitless tier', function () {
            var tiers = new DemandTiersInMonths_1.default({
                min: Array(12).fill(0),
                max: Array(12).fill(Infinity),
                months: [0, 1],
            }, loadProfile);
            expect(tiers.calculate()).toEqual(__spreadArray([
                KWS_GREATER_THAN_ONE[0],
                KWS_GREATER_THAN_ONE[1]
            ], Array(10).fill(0), true));
        });
    });
});
