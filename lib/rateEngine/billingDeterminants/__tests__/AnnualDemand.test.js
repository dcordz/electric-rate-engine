"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadProfile_1 = __importDefault(require("../../LoadProfile"));
var times_1 = __importDefault(require("lodash/times"));
var AnnualDemand_1 = __importDefault(require("../AnnualDemand"));
var getLoadProfileOfOneThroughTen = function () { return (0, times_1.default)(8760, function (num) { return (num % 10) + 1; }); };
var getLoadProfileWithOneNonZero = function () { return (0, times_1.default)(8760, function (i) { return (i === 1234 ? 100 : 0); }); };
describe('AnnualDemand', function () {
    describe('calculate', function () {
        it('calculates the annual max demand for a load profile of 1 through 10', function () {
            var loadProfile = new LoadProfile_1.default(getLoadProfileOfOneThroughTen(), { year: 2019 });
            var result = new AnnualDemand_1.default(loadProfile).calculate();
            expect(result).toEqual((0, times_1.default)(12, function () { return 10; }));
        });
        it('calculates the annual max demand for a load profile with one non-zero value', function () {
            var loadProfile = new LoadProfile_1.default(getLoadProfileWithOneNonZero(), { year: 2019 });
            var result = new AnnualDemand_1.default(loadProfile).calculate();
            expect(result).toEqual((0, times_1.default)(12, function () { return 100; }));
        });
    });
});
