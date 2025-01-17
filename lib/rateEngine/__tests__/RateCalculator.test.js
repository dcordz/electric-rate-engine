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
var constants_1 = require("../constants");
var LoadProfile_1 = __importDefault(require("../LoadProfile"));
var RateCalculator_1 = __importDefault(require("../RateCalculator"));
describe('RateCalculator', function () {
    describe('annualCost', function () {
        it('calculates annual the annual cost', function () {
            var rate = {
                name: 'a rate with multiple elements',
                title: 'anything',
                rateElements: [
                    {
                        name: 'One fixed charge',
                        billingCategory: constants_1.BillingCategory.SUPPLY,
                        rateElementType: 'FixedPerMonth',
                        rateComponents: [
                            {
                                charge: 10,
                                name: 'The first fixed charge',
                            },
                        ],
                    },
                    {
                        name: 'Second fixed charge',
                        billingCategory: constants_1.BillingCategory.DELIVERY,
                        rateElementType: 'FixedPerMonth',
                        rateComponents: [
                            {
                                charge: 20,
                                name: 'The second fixed charge',
                            },
                        ],
                    },
                ],
            };
            var loadProfile = new LoadProfile_1.default(Array(8760).fill(0), { year: 2019 });
            var rateCalculator = new RateCalculator_1.default(__assign({ loadProfile: loadProfile }, rate));
            expect(rateCalculator.annualCost()).toEqual(360);
            expect(rateCalculator.annualCost({ billingCategories: [constants_1.BillingCategory.SUPPLY] })).toEqual(120);
            expect(rateCalculator.annualCost({ billingCategories: [constants_1.BillingCategory.DELIVERY] })).toEqual(240);
        });
    });
});
