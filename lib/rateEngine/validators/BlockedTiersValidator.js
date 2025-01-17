"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _Validator_1 = __importDefault(require("./_Validator"));
var times_1 = __importDefault(require("lodash/times"));
var expandedDates_1 = __importDefault(require("../utils/expandedDates"));
var LoadProfileFilter_1 = __importDefault(require("../LoadProfileFilter"));
var convertInfinities_1 = __importDefault(require("../utils/convertInfinities"));
var BlockedTiersValidator = /** @class */ (function (_super) {
    __extends(BlockedTiersValidator, _super);
    function BlockedTiersValidator(args, loadProfile) {
        var _this = _super.call(this) || this;
        _this._localErrors = [];
        _this._args = args;
        _this._year = loadProfile.year;
        return _this;
    }
    BlockedTiersValidator.prototype.validate = function () {
        this.validateBasics();
        this.validateExpandedDates();
        if (this._localErrors.length > 0) {
            this.addError('Blocked Tiers Error', this._localErrors);
        }
        return this;
    };
    BlockedTiersValidator.prototype.filters = function () {
        return this._args.map(function (_a) {
            var min = _a.min, max = _a.max, filters = __rest(_a, ["min", "max"]);
            return ({
                min: (0, convertInfinities_1.default)(min),
                max: (0, convertInfinities_1.default)(max),
                filter: new LoadProfileFilter_1.default(filters),
            });
        });
    };
    BlockedTiersValidator.prototype.validateExpandedDates = function () {
        var _this = this;
        var dates = (0, expandedDates_1.default)(this._year);
        var filters = this.filters();
        dates.forEach(function (expandedDate) {
            var matches = filters.filter(function (_a) {
                var filter = _a.filter;
                return filter.matches(expandedDate);
            });
            if (matches.length === 0) {
                _this._localErrors.push({
                    english: "No tiers are defined for ".concat(JSON.stringify(expandedDate)),
                    type: 'missing-tier',
                    data: { expandedDate: expandedDate },
                });
                return;
            }
            _this.validateOverlap(matches);
            _this.validateRange(matches);
        });
    };
    BlockedTiersValidator.prototype.validateBasics = function () {
        var _this = this;
        this._args.forEach(function (_a) {
            var min = _a.min, max = _a.max;
            if (min.length !== 12 || max.length !== 12) {
                _this._localErrors.push({
                    english: "Incorrect amound of arguments found in blocked tier: found ".concat(min.length, " min and ").concat(max.length, " max"),
                    data: {},
                    type: 'argument-length',
                });
            }
        });
    };
    BlockedTiersValidator.prototype.getSortedPairs = function (minsAndMaxes) {
        return (0, times_1.default)(12, function (i) {
            return minsAndMaxes.map(function (_a) {
                var min = _a.min, max = _a.max;
                return ({ min: min[i], max: max[i] });
            }).sort(function (a, b) { return a.min - b.min; });
        });
    };
    BlockedTiersValidator.prototype.validateOverlap = function (minsAndMaxes) {
        var _this = this;
        if (this._args.length < 2)
            return;
        var monthPairs = this.getSortedPairs(minsAndMaxes);
        monthPairs.forEach(function (pairs, month) {
            for (var i = 1; i < pairs.length; i++) {
                if (pairs[i - 1].max > pairs[i].min) {
                    _this._localErrors.push({
                        english: "Overlap in blocked tier min/maxes found in month ".concat(month, " between max: ").concat(pairs[i - 1].max, " and min: ").concat(pairs[i].min),
                        data: { month: month, max: pairs[i - 1].max, min: pairs[i].min },
                        type: 'overlap',
                    });
                }
            }
        });
    };
    BlockedTiersValidator.prototype.validateRange = function (minsAndMaxes) {
        var _this = this;
        var monthPairs = this.getSortedPairs(minsAndMaxes);
        monthPairs.forEach(function (pairs, month) {
            if (pairs[0].min > 0) {
                _this._localErrors.push({
                    english: "Lowest blocked tier min for month ".concat(month, " is ").concat(pairs[0].min, ", expected 0."),
                    data: { month: month, min: pairs[0].min },
                    type: 'min',
                });
            }
            if (pairs.map(function (_a) {
                var max = _a.max;
                return max;
            }).sort()[pairs.length - 1] < Infinity) {
                _this._localErrors.push({
                    english: "Highest blocked tier for month ".concat(month, " is less than Infinity."),
                    data: { month: month },
                    type: 'max',
                });
            }
            if (pairs.length > 1) {
                for (var i = 1; i < pairs.length; i++) {
                    if (pairs[i - 1].max !== pairs[i].min) {
                        _this._localErrors.push({
                            english: "Gap in blocked tier min/maxes found in month ".concat(month, " between max: ").concat(pairs[i - 1].max, " and min: ").concat(pairs[i].min),
                            data: { month: month, max: pairs[i - 1].max, min: pairs[i].min },
                            type: 'gap',
                        });
                    }
                }
            }
        });
    };
    return BlockedTiersValidator;
}(_Validator_1.default));
exports.default = BlockedTiersValidator;
