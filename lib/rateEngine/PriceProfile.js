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
var decimals_1 = require("./utils/decimals");
var expandedDates_1 = __importDefault(require("./utils/expandedDates"));
var isPriceProfileObject = function (p) {
    return 'expanded' in p && typeof p['expanded'] === 'function';
};
var isNumberArray = function (p) {
    return typeof p[0] === 'number';
};
var PriceProfile = /** @class */ (function () {
    function PriceProfile(priceProfileOrExpandedOrExisting, options) {
        this._year = options.year;
        if (isPriceProfileObject(priceProfileOrExpandedOrExisting)) {
            this._expanded = priceProfileOrExpandedOrExisting.expanded();
        }
        else if (isNumberArray(priceProfileOrExpandedOrExisting)) {
            this._expanded = this._buildFromNumberArray(priceProfileOrExpandedOrExisting);
        }
        else {
            this._expanded = priceProfileOrExpandedOrExisting;
        }
    }
    PriceProfile.prototype.expanded = function () {
        return this._expanded;
    };
    PriceProfile.prototype.priceValues = function () {
        return this.expanded().map(function (_a) {
            var price = _a.price;
            return price;
        });
    };
    PriceProfile.prototype.filterBy = function (filters) {
        var filter = new LoadProfileFilter_1.default(filters);
        var filteredLoadProfile = this.expanded().map(function (_a) {
            var price = _a.price, detailedPriceProfileHour = __rest(_a, ["price"]);
            return filter.matches(detailedPriceProfileHour) ? price : 0;
        });
        return new PriceProfile(filteredLoadProfile, { year: this._year });
    };
    PriceProfile.prototype.maxByMonth = function () {
        var months = (0, times_1.default)(12, function (i) { return i; });
        var expanded = this.expanded();
        return months.map(function (m) {
            var monthPrices = expanded.filter(function (_a) {
                var month = _a.month;
                return m === month;
            }).map(function (_a) {
                var price = _a.price;
                return price;
            });
            return Math.max.apply(Math, monthPrices);
        });
    };
    PriceProfile.prototype.sum = function () {
        return this.expanded().reduce(function (sum, _a) {
            var price = _a.price;
            return (0, decimals_1.addDecimals)(sum, price);
        }, 0);
    };
    PriceProfile.prototype.count = function () {
        return this.expanded().length;
    };
    Object.defineProperty(PriceProfile.prototype, "length", {
        get: function () {
            return this.count();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PriceProfile.prototype, "year", {
        get: function () {
            return this._year;
        },
        enumerable: false,
        configurable: true
    });
    PriceProfile.prototype.average = function () {
        return this.sum() / this.count();
    };
    PriceProfile.prototype.max = function () {
        var _a, _b;
        if (this.count() === 0) {
            return 0;
        }
        // lodash's maxBy interface returns T | undefined so we need the ?? 0 here although it should never be 0
        return (_b = (_a = (0, maxBy_1.default)(this.expanded(), 'price')) === null || _a === void 0 ? void 0 : _a.price) !== null && _b !== void 0 ? _b : 0;
    };
    PriceProfile.prototype._buildFromNumberArray = function (priceProfile) {
        var dates = (0, expandedDates_1.default)(this._year);
        if (dates.length !== priceProfile.length) {
            throw new Error("Price profile length didn't match annual hours length. Maybe a leap year is involved?");
        }
        return (this._expanded = priceProfile.map(function (price, i) { return (__assign({ price: price }, dates[i])); }));
    };
    return PriceProfile;
}());
exports.default = PriceProfile;
