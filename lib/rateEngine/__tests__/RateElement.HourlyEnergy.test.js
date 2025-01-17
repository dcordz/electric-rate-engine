"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PriceProfile_1 = __importDefault(require("../PriceProfile"));
var LoadProfile_1 = __importDefault(require("../LoadProfile"));
var RateElement_1 = __importDefault(require("../RateElement"));
var YEAR = 2019;
var priceData = Array(8760).fill(0);
var ARBITRARY_HOUR_INDEX = 50;
priceData[ARBITRARY_HOUR_INDEX] = 5;
var rateElementData = {
    name: 'An hourly energy rate',
    rateElementType: 'HourlyEnergy',
    priceProfile: priceData,
    rateComponents: []
};
var loadProfile = new LoadProfile_1.default(Array(8760).fill(2), { year: YEAR });
var rateElement = new RateElement_1.default(rateElementData, loadProfile);
describe('RateElement', function () {
    describe('HourlyEnergy', function () {
        it('creates a rate component for each hour', function () {
            expect(rateElement.rateComponents().length).toEqual(8760);
        });
        it('calculates the monthly costs', function () {
            expect(rateElement.costs()).toEqual([10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        });
        it('works with a PriceProfile for backwards compatibility', function () {
            var data = {
                name: 'A rate element with a PriceProfile',
                rateElementType: 'HourlyEnergy',
                priceProfile: new PriceProfile_1.default(priceData, { year: YEAR }),
                rateComponents: []
            };
            var rateElement = new RateElement_1.default(data, loadProfile);
            expect(rateElement.costs()).toEqual([10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        });
    });
});
