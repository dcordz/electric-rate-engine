"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var HOLIDAYS = [
    '2018-01-01',
    '2018-02-19',
    '2018-05-28',
    '2018-07-04',
    '2018-09-03',
    '2018-11-12',
    '2018-11-22',
    '2018-12-25',
];
var summerPeakCharge = 0.43293;
var summmerOffpeakCharge = 0.35736;
var winterPeakCharge = 0.31496;
var winterOffPeakCharge = 0.30066;
var etoua = {
    name: 'E-TOU-A',
    title: 'Residential Time-Of-Use Service (Tiered)',
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
                    daysOfWeek: [1, 2, 3, 4, 5], // M-F
                    hourStarts: [15, 16, 17, 18, 19],
                    exceptForDays: HOLIDAYS,
                    name: 'summer peak',
                },
                {
                    charge: summmerOffpeakCharge,
                    months: [5, 6, 7, 8],
                    daysOfWeek: [1, 2, 3, 4, 5], // M-F
                    hourStarts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 20, 21, 22, 23],
                    exceptForDays: HOLIDAYS,
                    name: 'summer offpeak weekdays',
                },
                {
                    charge: summmerOffpeakCharge,
                    months: [5, 6, 7, 8],
                    daysOfWeek: [0, 6],
                    hourStarts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                    exceptForDays: HOLIDAYS,
                    name: 'summer offpeak weekends',
                },
                {
                    charge: summmerOffpeakCharge,
                    onlyOnDays: HOLIDAYS,
                    months: [5, 6, 7, 8],
                    name: 'summer offpeak holidays',
                },
                {
                    charge: winterPeakCharge,
                    months: [0, 1, 2, 3, 4, 9, 10, 11],
                    daysOfWeek: [1, 2, 3, 4, 5], // M-F
                    hourStarts: [15, 16, 17, 18, 19],
                    exceptForDays: HOLIDAYS,
                    name: 'winter peak',
                },
                {
                    charge: winterOffPeakCharge,
                    months: [0, 1, 2, 3, 4, 9, 10, 11],
                    daysOfWeek: [1, 2, 3, 4, 5], // M-F
                    hourStarts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 20, 21, 22, 23],
                    exceptForDays: HOLIDAYS,
                    name: 'winter offpeak weekdays',
                },
                {
                    charge: winterOffPeakCharge,
                    months: [0, 1, 2, 3, 4, 9, 10, 11],
                    daysOfWeek: [0, 6],
                    hourStarts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                    exceptForDays: HOLIDAYS,
                    name: 'winter offpeak weekends',
                },
                {
                    charge: winterOffPeakCharge,
                    onlyOnDays: HOLIDAYS,
                    months: [0, 1, 2, 3, 4, 9, 10, 11],
                    name: 'winter offpeak holidays',
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
exports.default = etoua;
