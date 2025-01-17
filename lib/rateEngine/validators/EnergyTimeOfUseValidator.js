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
var _Validator_1 = __importDefault(require("./_Validator"));
var expandedDates_1 = __importDefault(require("../utils/expandedDates"));
var LoadProfileFilter_1 = __importDefault(require("../LoadProfileFilter"));
var EnergyTimeOfUseValidator = /** @class */ (function (_super) {
    __extends(EnergyTimeOfUseValidator, _super);
    function EnergyTimeOfUseValidator(args, loadProfile) {
        var _this = _super.call(this) || this;
        _this._args = args;
        _this._year = loadProfile.year;
        return _this;
    }
    EnergyTimeOfUseValidator.prototype.validate = function () {
        var dates = (0, expandedDates_1.default)(this._year);
        var filters = this.filters();
        var errors = [];
        dates.forEach(function (date) {
            var matches = filters.filter(function (_a) {
                var filter = _a.filter;
                return filter.matches(date);
            });
            if (matches.length === 0) {
                errors.push({
                    english: "No filter set found that matches ".concat(JSON.stringify(date)),
                    data: date,
                    type: 'none',
                });
            }
            else if (matches.length > 1) {
                errors.push({
                    english: "".concat(matches.length, " filter sets found that match ").concat(JSON.stringify(date)),
                    data: __assign(__assign({}, date), { rateComponents: matches.map(function (_a) {
                            var name = _a.name;
                            return name;
                        }) }),
                    type: 'duplicate',
                });
            }
        });
        if (errors.length > 0) {
            this.addError('Energy Time Of Use Error', errors);
        }
        return this;
    };
    EnergyTimeOfUseValidator.prototype.filters = function () {
        return this._args.map(function (_a) {
            var name = _a.name, filters = __rest(_a, ["name"]);
            return ({ name: name, filter: new LoadProfileFilter_1.default(filters) });
        });
    };
    return EnergyTimeOfUseValidator;
}(_Validator_1.default));
exports.default = EnergyTimeOfUseValidator;
