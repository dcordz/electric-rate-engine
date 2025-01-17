"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadProfile_1 = __importDefault(require("../../LoadProfile"));
var times_1 = __importDefault(require("lodash/times"));
var MonthlyEnergy_1 = __importDefault(require("../MonthlyEnergy"));
var lodash_1 = require("lodash");
var getLoadProfileOfOnes = function () { return (0, times_1.default)(8760, function () { return 1; }); };
describe('MonthlyEnergy', function () {
    var loadProfile;
    beforeEach(function () {
        loadProfile = new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2019 });
    });
    describe('calculate', function () {
        it('calculates the energy demand', function () {
            // March and November are off by +/- 1 hour because of Daylight Savings Time
            var hoursPerMonth = [744, 672, 743, 720, 744, 720, 744, 744, 720, 744, 721, 744];
            var result = new MonthlyEnergy_1.default(loadProfile).calculate();
            expect(result).toEqual(hoursPerMonth);
            expect((0, lodash_1.sum)(result)).toEqual(8760);
        });
    });
});
