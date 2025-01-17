"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadProfile_1 = __importDefault(require("../LoadProfile"));
var BlockedTiersValidator_1 = __importDefault(require("./BlockedTiersValidator"));
describe('BlockedTiersValidator', function () {
    var loadProfile;
    beforeEach(function () {
        loadProfile = new LoadProfile_1.default(new Array(8760).fill(1), { year: 2018 });
    });
    describe('a non filtered blocked tier definition', function () {
        it('passes validation', function () {
            var blockedTiers = [
                {
                    min: new Array(12).fill(0),
                    max: new Array(12).fill(Infinity)
                },
            ];
            var validator = new BlockedTiersValidator_1.default(blockedTiers, loadProfile);
            validator.validate();
            expect(validator.hasErrors()).toBe(false);
        });
    });
    describe('a filtered blocked tier definition', function () {
        it('passes validation', function () {
            var blockedTiers = [
                {
                    min: new Array(12).fill(0),
                    max: new Array(12).fill(Infinity),
                    daysOfWeek: [1, 2, 3, 4, 5],
                },
                {
                    min: new Array(12).fill(0),
                    max: new Array(12).fill(Infinity),
                    daysOfWeek: [6, 0],
                },
            ];
            var validator = new BlockedTiersValidator_1.default(blockedTiers, loadProfile);
            validator.validate();
            expect(validator.hasErrors()).toBe(false);
        });
        describe('with a missing weekday', function () {
            it('fails validation', function () {
                var blockedTiers = [
                    {
                        min: new Array(12).fill(0),
                        max: new Array(12).fill(Infinity),
                        daysOfWeek: [1, 2, 3, 4, 5],
                    },
                    {
                        min: new Array(12).fill(0),
                        max: new Array(12).fill(Infinity),
                        daysOfWeek: [6],
                    },
                ];
                var validator = new BlockedTiersValidator_1.default(blockedTiers, loadProfile);
                validator.validate();
                expect(validator.hasErrors()).toBe(true);
                var SUNDAYS_IN_2018 = 52;
                var HOURS_IN_DAY = 24;
                expect(validator.allErrors().length).toBe(SUNDAYS_IN_2018 * HOURS_IN_DAY);
            });
        });
        describe('with a weekday defined more than once', function () {
            it('fails validation', function () {
                var blockedTiers = [
                    {
                        min: new Array(12).fill(0),
                        max: new Array(12).fill(Infinity),
                        daysOfWeek: [1, 2, 3, 4, 5, 0],
                    },
                    {
                        min: new Array(12).fill(0),
                        max: new Array(12).fill(Infinity),
                        daysOfWeek: [6, 0],
                    },
                ];
                var validator = new BlockedTiersValidator_1.default(blockedTiers, loadProfile);
                validator.validate();
                expect(validator.hasErrors()).toBe(true);
                var SUNDAYS_IN_2018 = 52;
                var HOURS_IN_DAY = 24;
                var MONTHS_IN_YEAR = 12;
                expect(validator.allErrors().length).toBe(SUNDAYS_IN_2018 * HOURS_IN_DAY * (MONTHS_IN_YEAR * 2));
            });
        });
    });
});
