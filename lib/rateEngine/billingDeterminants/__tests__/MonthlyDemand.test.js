"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadProfile_1 = __importDefault(require("../../LoadProfile"));
var times_1 = __importDefault(require("lodash/times"));
var MonthlyDemand_1 = __importDefault(require("../MonthlyDemand"));
var getLoadProfileOfOneThroughTen = function () { return (0, times_1.default)(8760, function (num) { return num % 10 + 1; }); };
describe('MonthlyDemand', function () {
    var loadProfile;
    beforeEach(function () {
        loadProfile = new LoadProfile_1.default(getLoadProfileOfOneThroughTen(), { year: 2019 });
    });
    describe('calculate', function () {
        it('calculates the energy demand', function () {
            var result = new MonthlyDemand_1.default(loadProfile).calculate();
            expect(result).toEqual((0, times_1.default)(12, function () { return 10; }));
        });
    });
});
