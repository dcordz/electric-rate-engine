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
var LoadProfile_1 = __importDefault(require("./LoadProfile"));
var RateCalculator_1 = __importDefault(require("./RateCalculator"));
var goal_seek_1 = __importDefault(require("goal-seek"));
// TODO: use proper math for scaling
// TODO: fix the toAverageMonthlyBill argument... how to properly pass in a rate?
var LoadProfileScaler = /** @class */ (function () {
    function LoadProfileScaler(loadProfile, _a) {
        var _b = _a === void 0 ? { debug: false } : _a, debug = _b.debug;
        this.loadProfile = loadProfile;
        this.debug = debug;
    }
    LoadProfileScaler.prototype.to = function (scaler) {
        return new LoadProfile_1.default(this.loadProfile.expanded().map(function (loadHour) { return loadHour.load * scaler; }), { year: this.loadProfile.year });
    };
    LoadProfileScaler.prototype.toTotalKwh = function (totalKwh) {
        var scaler = totalKwh / this.loadProfile.sum();
        return this.to(scaler);
    };
    LoadProfileScaler.prototype.toAverageMonthlyBill = function (amount, rate, goalSeekParams) {
        if (goalSeekParams === void 0) { goalSeekParams = {}; }
        var magnitude = Math.max(Math.floor(Math.log10(Math.abs(amount))), 0);
        var magnitudeScaler = Math.pow(10, magnitude);
        var initialScalerGuess = magnitudeScaler;
        var fnParams = [initialScalerGuess, rate, this, magnitude];
        var finalScaler = (0, goal_seek_1.default)(__assign({ fn: this.scaledMonthlyCost, fnParams: fnParams, percentTolerance: 0.1, maxIterations: 1000, maxStep: magnitudeScaler * 10, goal: amount, independentVariableIdx: 0 }, goalSeekParams));
        var scalerAsDecimal = finalScaler / magnitudeScaler;
        return this.to(scalerAsDecimal);
    };
    LoadProfileScaler.prototype.toMonthlyKwh = function (monthlyKwh) {
        if (monthlyKwh.length !== 12) {
            throw new Error('monthlyKwh must be an array of 12 numbers');
        }
        var scalersByMonth = this.loadProfile.sumByMonth().map(function (kwh, idx) {
            return monthlyKwh[idx] / kwh;
        });
        var scaledLoad = this.loadProfile.expanded().map(function (loadHour) {
            return __assign(__assign({}, loadHour), { load: loadHour.load * scalersByMonth[loadHour.month] });
        });
        return new LoadProfile_1.default(scaledLoad, { year: this.loadProfile.year });
    };
    LoadProfileScaler.prototype.scaledMonthlyCost = function (scaler, rate, context, magnitude) {
        var scaledLoadProfile = context.to(scaler / Math.pow(10, magnitude));
        var rateCalculator = new RateCalculator_1.default(__assign(__assign({}, rate), { loadProfile: scaledLoadProfile }));
        var currentMonthlyCost = rateCalculator.annualCost() / 12;
        if (context.debug) {
            console.log('current scaler is:', scaler);
            console.log('current monthlyCost is:', currentMonthlyCost);
        }
        return currentMonthlyCost;
    };
    return LoadProfileScaler;
}());
exports.default = LoadProfileScaler;
