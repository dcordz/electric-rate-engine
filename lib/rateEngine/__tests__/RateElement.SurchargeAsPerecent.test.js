"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RateElement_1 = __importDefault(require("../RateElement"));
var LoadProfile_1 = __importDefault(require("../LoadProfile"));
var constants_1 = require("../constants");
var getLoadProfileOfOnes = function () { return Array(8760).fill(1); };
var FIXED_CHARGE = 10;
var SURCHARGE_AS_DECIMAL = 0.10;
var MONTHS_PER_YEAR = 12;
var FIXED_RATE_ELEMENT_DATA = {
    id: 'fixed-charge',
    rateElementType: 'FixedPerMonth',
    name: 'A fixed monthly charge',
    rateComponents: [
        {
            charge: FIXED_CHARGE,
            name: 'A $10/mo charge',
        },
    ],
};
var ENERGY_CHARGE_DATA = {
    id: 'energy-charge',
    rateElementType: 'MonthlyEnergy',
    name: 'An energy charge',
    rateComponents: [
        {
            charge: 1,
            name: 'An energy charge',
        }
    ]
};
describe('RateElement', function () {
    describe('SurchargeAsPercent', function () {
        it('calculates the surcharge', function () {
            var rateElement = new RateElement_1.default({
                rateElementType: 'SurchargeAsPercent',
                name: '10% surcharge',
                rateComponents: [
                    {
                        name: '10% surcharge',
                        charge: SURCHARGE_AS_DECIMAL,
                        ids: ['fixed-charge'],
                    },
                ],
            }, new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2019 }), [
                FIXED_RATE_ELEMENT_DATA
            ]);
            expect(rateElement.annualCost()).toEqual(FIXED_CHARGE * MONTHS_PER_YEAR * SURCHARGE_AS_DECIMAL);
        });
        describe('when only certain elements need a surcharge', function () {
            it('only surcharges for the specified elements', function () {
                var rateElement = new RateElement_1.default({
                    rateElementType: 'SurchargeAsPercent',
                    name: '10% surcharge',
                    rateComponents: [
                        {
                            name: '10% surcharge',
                            charge: SURCHARGE_AS_DECIMAL,
                            ids: ['fixed-charge'],
                        },
                    ]
                }, new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2019 }), [
                    FIXED_RATE_ELEMENT_DATA,
                    ENERGY_CHARGE_DATA,
                ]);
                expect(rateElement.annualCost()).toEqual(FIXED_CHARGE * MONTHS_PER_YEAR * SURCHARGE_AS_DECIMAL);
            });
        });
        describe('when no other rate elements are specified', function () {
            it('surcharges all other rate elements', function () {
                var rateElement = new RateElement_1.default({
                    rateElementType: 'SurchargeAsPercent',
                    name: '10% surcharge',
                    rateComponents: [
                        {
                            name: '10% surcharge',
                            charge: SURCHARGE_AS_DECIMAL,
                        }
                    ]
                }, new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2019 }), [
                    FIXED_RATE_ELEMENT_DATA,
                    ENERGY_CHARGE_DATA,
                ]);
                var ENERGY_CHARGE_FOR_YEAR = 8760;
                expect(rateElement.annualCost()).toEqual((ENERGY_CHARGE_FOR_YEAR + FIXED_CHARGE * MONTHS_PER_YEAR) * SURCHARGE_AS_DECIMAL);
            });
        });
    });
    describe('.matches()', function () {
        describe('with a blank object', function () {
            it('returns true', function () {
                var rateElement = new RateElement_1.default({
                    name: 'rate element',
                    rateElementType: 'FixedPerMonth',
                    rateComponents: [],
                }, new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2019 }));
                expect(rateElement.matches({})).toBe(true);
            });
        });
        describe('with an id', function () {
            it('returns true with a match', function () {
                var rateElement = new RateElement_1.default({
                    id: 'some-id',
                    name: 'rate element',
                    rateElementType: 'FixedPerMonth',
                    rateComponents: [],
                }, new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2019 }));
                expect(rateElement.matches({ ids: ['some-id'] })).toBe(true);
            });
            it('returns false when it does not match', function () {
                var rateElement = new RateElement_1.default({
                    id: 'some-id',
                    name: 'rate element',
                    rateElementType: 'FixedPerMonth',
                    rateComponents: [],
                }, new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2019 }));
                expect(rateElement.matches({ ids: ['non-matching'] })).toBe(false);
            });
        });
        describe('with a billingCategory', function () {
            it('returns true with a match', function () {
                var rateElement = new RateElement_1.default({
                    billingCategory: constants_1.BillingCategory.SUPPLY,
                    name: 'rate element',
                    rateElementType: 'FixedPerMonth',
                    rateComponents: [],
                }, new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2019 }));
                expect(rateElement.matches({ billingCategories: [constants_1.BillingCategory.SUPPLY] })).toBe(true);
            });
            it('returns false when it does not match', function () {
                var rateElement = new RateElement_1.default({
                    billingCategory: constants_1.BillingCategory.SUPPLY,
                    name: 'rate element',
                    rateElementType: 'FixedPerMonth',
                    rateComponents: [],
                }, new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2019 }));
                expect(rateElement.matches({ billingCategories: [constants_1.BillingCategory.DELIVERY] })).toBe(false);
            });
        });
        describe('with a classification', function () {
            it('returns true with a match', function () {
                var rateElement = new RateElement_1.default({
                    name: 'rate element',
                    rateElementType: 'FixedPerMonth',
                    rateComponents: [
                        {
                            charge: 1.5,
                            name: 'this has to exist to set the classification'
                        }
                    ],
                }, new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2019 }));
                expect(rateElement.matches({ classifications: [constants_1.RateElementClassification.FIXED] })).toBe(true);
            });
            it('returns false when it does not match', function () {
                var rateElement = new RateElement_1.default({
                    name: 'rate element',
                    rateElementType: 'FixedPerMonth',
                    rateComponents: [
                        {
                            charge: 1.5,
                            name: 'this has to exist to set the classification'
                        }
                    ],
                }, new LoadProfile_1.default(getLoadProfileOfOnes(), { year: 2019 }));
                expect(rateElement.matches({ classifications: [constants_1.RateElementClassification.DEMAND] })).toBe(false);
            });
        });
    });
});
