"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundToTwoDecimals = exports.divideDecimals = exports.multiplyDecimals = exports.subtractDecimals = exports.addDecimals = void 0;
var SCALER = 1e10;
var addDecimals = function (d1, d2) {
    return Math.round((d1 + d2) * SCALER) / SCALER;
};
exports.addDecimals = addDecimals;
var subtractDecimals = function (d1, d2) {
    return Math.round((d1 - d2) * SCALER) / SCALER;
};
exports.subtractDecimals = subtractDecimals;
var multiplyDecimals = function (d1, d2) {
    return Math.round(d1 * d2 * SCALER) / SCALER;
};
exports.multiplyDecimals = multiplyDecimals;
var divideDecimals = function (numerator, denominator) {
    return Math.round((numerator * SCALER) / denominator) / SCALER;
};
exports.divideDecimals = divideDecimals;
var roundToTwoDecimals = function (num) {
    return Math.round(num * 100) / 100;
};
exports.roundToTwoDecimals = roundToTwoDecimals;
