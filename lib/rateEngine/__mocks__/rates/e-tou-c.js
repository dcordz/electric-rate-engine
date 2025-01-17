"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var summerPeakCharge = 0.41333;
var summmerOffpeakCharge = 0.34989;
var winterPeakCharge = 0.31624;
var winterOffPeakCharge = 0.29891;
var etouc = {
    name: 'E-TOU-C',
    title: 'Residential Time-Of-Use Service (Peak Pricing 4-9pm Every Day)',
    rateElements: [
        {
            rateElementType: 'FixedPerDay',
            name: 'Delivery Charge',
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
            name: 'Energy Charges',
            rateElementType: 'EnergyTimeOfUse',
            rateComponents: [
                {
                    charge: summerPeakCharge,
                    months: [5, 6, 7, 8],
                    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                    hourStarts: [16, 17, 18, 19, 20],
                    name: 'summer peak',
                },
                {
                    charge: summmerOffpeakCharge,
                    months: [5, 6, 7, 8],
                    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                    hourStarts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 21, 22, 23],
                    name: 'summer offpeak',
                },
                {
                    charge: winterPeakCharge,
                    months: [0, 1, 2, 3, 4, 9, 10, 11],
                    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                    hourStarts: [16, 17, 18, 19, 20],
                    name: 'winter peak',
                },
                {
                    charge: winterOffPeakCharge,
                    months: [0, 1, 2, 3, 4, 9, 10, 11],
                    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                    hourStarts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 21, 22, 23],
                    name: 'winter offpeak',
                },
            ],
        },
        {
            rateElementType: 'BlockedTiersInDays',
            name: 'First Block Discount',
            rateComponents: [
                {
                    charge: -0.08633,
                    min: (0, lodash_1.times)(12, function (_) { return 0; }),
                    max: (0, lodash_1.times)(12, function (i) { return ([4, 5, 6, 7, 8, 9].includes(i) ? 14.2 : 12); }),
                    name: 'Discount',
                },
                {
                    charge: 0,
                    min: (0, lodash_1.times)(12, function (i) { return ([4, 5, 6, 7, 8, 9].includes(i) ? 14.2 : 12); }),
                    max: (0, lodash_1.times)(12, function () { return Infinity; }),
                    name: 'Free Energy!',
                }
            ],
        },
    ],
};
exports.default = etouc;
