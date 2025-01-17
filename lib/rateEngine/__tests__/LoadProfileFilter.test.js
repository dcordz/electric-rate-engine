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
var LoadProfileFilter_1 = __importDefault(require("../LoadProfileFilter"));
var baseFilter = {
    months: [],
    daysOfWeek: [],
    hourStarts: [],
    onlyOnDays: [],
    exceptForDays: [],
};
var expandedDate = {
    month: 3,
    date: '2019-03-15',
    hourStart: 3,
    dayOfWeek: 5,
    hourOfYear: 0,
};
describe('LoadProfileFilter', function () {
    describe('matches', function () {
        describe('months', function () {
            var filter = new LoadProfileFilter_1.default(__assign(__assign({}, baseFilter), { months: [0] }));
            it('matches a matching date', function () {
                expect(filter.matches(__assign(__assign({}, expandedDate), { month: 0 }))).toBe(true);
            });
            it('does not match a non-matching date', function () {
                expect(filter.matches(expandedDate)).toBe(false);
            });
        });
        describe('daysOfWeek', function () { });
        describe('compound matches', function () { });
    });
});
