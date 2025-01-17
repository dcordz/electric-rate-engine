"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadProfileScaler_1 = __importDefault(require("../LoadProfileScaler"));
var times_1 = __importDefault(require("lodash/times"));
var LoadProfile_1 = __importDefault(require("../LoadProfile"));
var e_1_1 = __importDefault(require("../__mocks__/rates/e-1"));
var RateCalculator_1 = __importDefault(require("../RateCalculator"));
var getLoadProfileOfOnes = function () { return (0, times_1.default)(8760, function () { return 1; }); };
var dummyRate = {
    name: 'some rate',
    title: 'that will not converge',
    rateElements: [
        {
            rateElementType: 'FixedPerMonth',
            name: 'Customer Charge',
            rateComponents: [
                {
                    charge: 500,
                    name: 'Customer Charge',
                },
            ],
        },
        {
            rateElementType: 'MonthlyDemand',
            name: 'Demand Charge',
            rateComponents: [
                {
                    charge: 20,
                    name: 'Demand Charge',
                },
            ],
        },
        {
            rateElementType: 'MonthlyEnergy',
            name: 'Energy Charge',
            rateComponents: [
                {
                    charge: 0.18999,
                    name: 'Energy Charge',
                },
            ],
        },
    ],
};
describe('LoadProfileScaler', function () {
    var initialLoadProfile = new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2019 });
    var loadProfileScaler;
    beforeEach(function () {
        loadProfileScaler = new LoadProfileScaler_1.default(initialLoadProfile);
    });
    describe('toAverageMonthlyBill', function () {
        afterEach(function () {
            jest.resetModules();
        });
        describe('without a mock', function () {
            beforeEach(function () {
                jest.dontMock('goal-seek');
            });
            it('returns a LoadProfile', function () {
                var scaledLoadProfile = loadProfileScaler.toAverageMonthlyBill(100, e_1_1.default);
                expect(scaledLoadProfile).toBeInstanceOf(LoadProfile_1.default);
            });
            it('converges with a large bill amount', function () {
                var billAmount = 10000;
                var scaledLoadProfile = loadProfileScaler.toAverageMonthlyBill(billAmount, dummyRate);
                var rateCalculator = new RateCalculator_1.default(__assign(__assign({}, dummyRate), { loadProfile: scaledLoadProfile }));
                expect(rateCalculator.annualCost() / 12).toBeCloseTo(billAmount);
            });
        });
    });
    describe('optional debugging', function () {
        it('prints things to the console', function () {
            console.log = jest.fn();
            new LoadProfileScaler_1.default(initialLoadProfile, { debug: true }).toAverageMonthlyBill(100, e_1_1.default);
            expect(console.log).toHaveBeenCalled();
        });
    });
});
