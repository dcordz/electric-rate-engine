"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadProfile_1 = __importDefault(require("../../LoadProfile"));
var times_1 = __importDefault(require("lodash/times"));
var BlockedTiersInMonths_1 = __importDefault(require("../BlockedTiersInMonths"));
// For reference: the number of hours in each month:
// [ 744, 672, 743, 720, 744, 720, 744, 744, 720, 744, 721, 744 ]
var getLoadProfileOfOnes = function () { return (0, times_1.default)(8760, function () { return 1; }); };
describe('BlockedTiersInMonths', function () {
    var loadProfile;
    var min;
    var max;
    beforeEach(function () {
        loadProfile = new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2018 });
        min = [0, 0, 0, 10, 10, 10, 700, 700, 700, 750, 750, 750];
        max = [10, 10, 10, 15, 15, 15, 725, 725, 725, 55, 55, 55];
    });
    describe('calculate', function () {
        it('calculates blocked tiers in months', function () {
            var result = new BlockedTiersInMonths_1.default({
                min: min,
                max: max,
            }, loadProfile).calculate();
            // This is a handcrafted™ array to test various min/max scenarios.
            expect(result).toEqual([10, 10, 10, 5, 5, 5, 25, 25, 20, 0, 0, 0]);
        });
        describe('filtered for January only', function () {
            it('calculates blocked tiers in months', function () {
                var result = new BlockedTiersInMonths_1.default({
                    min: min,
                    max: max,
                    months: [0]
                }, loadProfile).calculate();
                expect(result).toEqual([10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            });
        });
    });
});
