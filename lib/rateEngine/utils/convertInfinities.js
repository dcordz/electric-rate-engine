"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = convertInfinities;
function convertInfinities(arr) {
    return arr.map(function (n) { return n === 'Infinity' ? Infinity : n; });
}
;
