"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var SUMMMER_MONTHS = [4, 5, 6, 7, 8, 9];
var cutoff_1 = (0, lodash_1.times)(12, function (i) { return (SUMMMER_MONTHS.includes(i) ? 13 : 12.5); });
var cutoff_2 = (0, lodash_1.times)(12, function (i) { return (SUMMMER_MONTHS.includes(i) ? 52 : 50); });
var e1 = {
    name: 'E-1',
    title: 'Residential Services',
    rateElements: [
        {
            name: 'Delivery Charge',
            rateElementType: 'FixedPerDay',
            rateComponents: [
                {
                    charge: 0.32854,
                    name: 'Delivery Charge',
                },
            ],
        },
        {
            name: 'California Clean Climate Credit',
            rateElementType: 'FixedPerMonth',
            rateComponents: [
                {
                    charge: [0, 0, 0, -35.73, 0, 0, 0, 0, 0, -35.73, 0, 0],
                    name: 'California Clean Climate Credit',
                },
            ],
        },
        {
            name: 'Total Energy Rates',
            rateElementType: 'BlockedTiersInDays',
            rateComponents: [
                {
                    charge: 0.24373,
                    min: (0, lodash_1.times)(12, function (_) { return 0; }),
                    max: cutoff_1,
                    name: 'Tier 1',
                },
                {
                    charge: 0.30672,
                    min: cutoff_1,
                    max: cutoff_2,
                    name: 'Tier 2',
                },
                {
                    charge: 0.53738,
                    min: cutoff_2,
                    max: (0, lodash_1.times)(12, function (_) { return Infinity; }),
                    name: 'Tier 3',
                },
            ],
        },
    ],
};
exports.default = e1;
