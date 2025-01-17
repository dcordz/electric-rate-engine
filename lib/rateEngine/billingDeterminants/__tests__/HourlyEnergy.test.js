"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var HourlyEnergy_1 = __importDefault(require("../HourlyEnergy"));
var LoadProfile_1 = __importDefault(require("../../LoadProfile"));
describe('HourlyEnergy', function () {
    describe('with a February hour', function () {
        it('returns an array with the kWh for that hour in the second element', function () {
            var februaryHour = 40 * 24;
            var loadProfile = new LoadProfile_1.default(Array(8760).fill(1), { year: 2019 });
            var hourlyEnergy = new HourlyEnergy_1.default({ hourOfYear: februaryHour }, loadProfile);
            expect(hourlyEnergy.calculate()).toEqual([0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        });
    });
});
