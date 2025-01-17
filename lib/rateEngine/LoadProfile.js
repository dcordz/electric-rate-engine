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
var maxBy_1 = __importDefault(require("lodash/maxBy"));
var times_1 = __importDefault(require("lodash/times"));
var LoadProfileFilter_1 = __importDefault(require("./LoadProfileFilter"));
var LoadProfileScaler_1 = __importDefault(require("./LoadProfileScaler"));
var decimals_1 = require("./utils/decimals");
var expandedDates_1 = __importDefault(require("./utils/expandedDates"));
var isLoadProfileObject = function (p) {
    return 'expanded' in p && typeof p['expanded'] === 'function';
};
var isNumberArray = function (p) {
    return typeof p[0] === 'number';
};
var LoadProfile = /** @class */ (function () {
    function LoadProfile(loadProfileOrExpandedOrExisting, options) {
        this._year = options.year;
        if (isLoadProfileObject(loadProfileOrExpandedOrExisting)) {
            this._expanded = loadProfileOrExpandedOrExisting.expanded();
        }
        else if (isNumberArray(loadProfileOrExpandedOrExisting)) {
            this._expanded = this._buildFromNumberArray(loadProfileOrExpandedOrExisting);
        }
        else {
            this._expanded = loadProfileOrExpandedOrExisting;
        }
    }
    LoadProfile.prototype.expanded = function () {
        return this._expanded;
    };
    LoadProfile.prototype.loadValues = function () {
        return this.expanded().map(function (_a) {
            var load = _a.load;
            return load;
        });
    };
    LoadProfile.prototype.filterBy = function (filters) {
        var filter = new LoadProfileFilter_1.default(filters);
        var filteredLoadProfile = this.expanded().map(function (_a) {
            var load = _a.load, detailedLoadProfileHour = __rest(_a, ["load"]);
            return filter.matches(detailedLoadProfileHour) ? load : 0;
        });
        return new LoadProfile(filteredLoadProfile, { year: this._year });
    };
    LoadProfile.prototype.loadShift = function (amount, filters) {
        var filter = new LoadProfileFilter_1.default(filters);
        var shiftedLoadProfile = this.expanded().map(function (detailedLoadProfileHour) {
            return filter.matches(detailedLoadProfileHour) ? detailedLoadProfileHour.load + amount : detailedLoadProfileHour.load;
        });
        return new LoadProfile(shiftedLoadProfile, { year: this._year });
    };
    LoadProfile.prototype.sumByMonth = function () {
        var sums = (0, times_1.default)(12, function () { return 0; });
        this.expanded().forEach(function (_a) {
            var load = _a.load, month = _a.month;
            sums[month] = (0, decimals_1.addDecimals)(sums[month], load);
        });
        return sums;
    };
    LoadProfile.prototype.maxByMonth = function () {
        var months = (0, times_1.default)(12, function (i) { return i; });
        var expanded = this.expanded();
        return months.map(function (m) {
            var monthLoads = expanded.filter(function (_a) {
                var month = _a.month;
                return m === month;
            }).map(function (_a) {
                var load = _a.load;
                return load;
            });
            return Math.max.apply(Math, monthLoads);
        });
    };
    LoadProfile.prototype.byMonth = function () {
        var months = (0, times_1.default)(12, function () { return []; });
        this.expanded().forEach(function (_a) {
            var load = _a.load, month = _a.month;
            months[month].push(load);
        });
        return months;
    };
    LoadProfile.prototype.sum = function () {
        return this.expanded().reduce(function (sum, _a) {
            var load = _a.load;
            return (0, decimals_1.addDecimals)(sum, load);
        }, 0);
    };
    LoadProfile.prototype.count = function () {
        return this.expanded().length;
    };
    Object.defineProperty(LoadProfile.prototype, "length", {
        get: function () {
            return this.count();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoadProfile.prototype, "year", {
        get: function () {
            return this._year;
        },
        enumerable: false,
        configurable: true
    });
    LoadProfile.prototype.average = function () {
        return this.sum() / this.count();
    };
    LoadProfile.prototype.max = function () {
        var _a, _b;
        if (this.count() === 0) {
            return 0;
        }
        // lodash's maxBy interface returns T | undefined so we need the ?? 0 here although it should never be 0
        return (_b = (_a = (0, maxBy_1.default)(this.expanded(), 'load')) === null || _a === void 0 ? void 0 : _a.load) !== null && _b !== void 0 ? _b : 0;
    };
    LoadProfile.prototype.loadFactor = function () {
        if (this.count() === 0) {
            return 0;
        }
        return this.sum() / (this.count() * this.max());
    };
    LoadProfile.prototype.scale = function (options) {
        return new LoadProfileScaler_1.default(this, options);
    };
    LoadProfile.prototype.aggregate = function (otherLoadProfile) {
        return new LoadProfile(this.expanded().map(function (_a, idx) {
            var load = _a.load;
            return (0, decimals_1.addDecimals)(load, otherLoadProfile.expanded()[idx].load);
        }), { year: this._year });
    };
    LoadProfile.prototype._buildFromNumberArray = function (loadProfileNumberArray) {
        var dates = (0, expandedDates_1.default)(this._year);
        if (!loadProfileNumberArray.length) {
            throw new Error('Cannot build LoadProfile instance. Instantiated with an empty loadProfile array.');
        }
        if (dates.length !== loadProfileNumberArray.length) {
            var isLeapYearInvolved = Math.abs(dates.length - loadProfileNumberArray.length) === 24;
            throw new Error("Load profile length didn't match annual hours length.".concat(isLeapYearInvolved ? " It's likely a leap year is involved." : ' Maybe a leap year is involved.'));
        }
        return loadProfileNumberArray.map(function (load, i) { return (__assign({ load: load }, dates[i])); });
    };
    return LoadProfile;
}());
exports.default = LoadProfile;
