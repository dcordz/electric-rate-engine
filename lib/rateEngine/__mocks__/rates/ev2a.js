"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var summerPeakCharge = 0.47861;
var summerPartpeakCharge = 0.36812;
var winterPeakCharge = 0.3515;
var winterPartpeakCharge = 0.3348;
var offpeakCharge = 0.16611;
var ev2a = {
    name: 'EV2-A',
    title: 'Residential Time-Of-Use Service for Plug-In Electric Vehicle Customers',
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
                    hourStarts: [16, 17, 18, 19, 20],
                    name: 'summer peak',
                },
                {
                    charge: winterPeakCharge,
                    months: [0, 1, 2, 3, 4, 9, 10, 11],
                    hourStarts: [16, 17, 18, 19, 20],
                    name: 'winter peak',
                },
                {
                    charge: summerPartpeakCharge,
                    months: [5, 6, 7, 8],
                    hourStarts: [15, 21, 22, 23],
                    name: 'summer part peak',
                },
                {
                    charge: winterPartpeakCharge,
                    months: [0, 1, 2, 3, 4, 9, 10, 11],
                    hourStarts: [15, 21, 22, 23],
                    name: 'winter part peak',
                },
                {
                    charge: offpeakCharge,
                    hourStarts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                    name: 'offpeak',
                },
            ],
        },
    ],
};
exports.default = ev2a;
