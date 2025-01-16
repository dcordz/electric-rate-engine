/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

class Validator {
    constructor() {
        this._errors = [];
    }
    reportErrors() {
        this._errors.forEach(({ label, errors }) => {
            console.groupCollapsed(label);
            errors.forEach(({ english }) => console.error(english));
            console.groupEnd();
        });
    }
    allErrors() {
        return this._errors.map(({ errors }) => errors).flat();
    }
    hasErrors() {
        return this._errors.length > 0;
    }
    addError(label, errors) {
        this._errors.push({
            label,
            errors,
        });
    }
}

// From ChatGPT
// A year is a leap year if:
// - it is divisible by 4, and
// - if divisible by 100, it must also be divisible by 400.
function isLeapYear(_year) {
    const year = typeof _year === 'number' ? _year : _year.getFullYear();
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function setYearOnDate(date, year) {
    date.setFullYear(year);
    return date;
}

const dates = {};
function format(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
const generateDates = (year) => {
    const profileTime = new Date();
    profileTime.setFullYear(year);
    return new Array(isLeapYear(profileTime) ? 8784 : 8760).fill(0).map((_, hourOfYear) => {
        const startOfYear = new Date(year, 0, 1, 0, 0, 0);
        const date = new Date(startOfYear.getTime() + hourOfYear * 60 * 60 * 1000);
        return {
            month: date.getMonth(), // 0-based, January is 0
            dayOfWeek: date.getDay(), // 0-based, Sunday is 0
            hourStart: date.getHours(),
            date: format(date),
            hourOfYear,
        };
    });
};
var expandedDates = (year) => {
    if (!dates[year]) {
        dates[year] = generateDates(year);
    }
    return dates[year];
};

class LoadProfileFilter {
    constructor(filters) {
        this.months = this.sanitize(filters.months);
        this.daysOfWeek = this.sanitize(filters.daysOfWeek);
        this.hourStarts = this.sanitize(filters.hourStarts);
        this.onlyOnDays = this.sanitize(filters.onlyOnDays);
        this.exceptForDays = this.sanitize(filters.exceptForDays);
        this.hoursOfYear = this.sanitize(filters.hoursOfYear);
    }
    matches({ month, date, dayOfWeek, hourStart, hourOfYear }) {
        return ((this.exceptForDays ? !this.exceptForDays.includes(date) : true) &&
            (this.onlyOnDays ? this.onlyOnDays.includes(date) : true) &&
            (this.months ? this.months.includes(month) : true) &&
            (this.daysOfWeek ? this.daysOfWeek.includes(dayOfWeek) : true) &&
            (this.hourStarts ? this.hourStarts.includes(hourStart) : true) &&
            (this.hoursOfYear ? this.hoursOfYear.includes(hourOfYear) : true));
    }
    sanitize(arg) {
        if (arg && arg.length === 0) {
            return undefined;
        }
        return arg;
    }
}

class EnergyTimeOfUseValidator extends Validator {
    constructor(args, loadProfile) {
        super();
        this._args = args;
        this._year = loadProfile.year;
    }
    validate() {
        const dates = expandedDates(this._year);
        const filters = this.filters();
        const errors = [];
        dates.forEach((date) => {
            const matches = filters.filter(({ filter }) => filter.matches(date));
            if (matches.length === 0) {
                errors.push({
                    english: `No filter set found that matches ${JSON.stringify(date)}`,
                    data: date,
                    type: 'none',
                });
            }
            else if (matches.length > 1) {
                errors.push({
                    english: `${matches.length} filter sets found that match ${JSON.stringify(date)}`,
                    data: Object.assign(Object.assign({}, date), { rateComponents: matches.map(({ name }) => name) }),
                    type: 'duplicate',
                });
            }
        });
        if (errors.length > 0) {
            this.addError('Energy Time Of Use Error', errors);
        }
        return this;
    }
    filters() {
        return this._args.map((_a) => {
            var { name } = _a, filters = __rest(_a, ["name"]);
            return ({ name, filter: new LoadProfileFilter(filters) });
        });
    }
}

class GenericValidator extends Validator {
    validate() {
        return this;
    }
}

const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function convertInfinities(arr) {
    return arr.map((n) => n === 'Infinity' ? Infinity : n);
}

class BlockedTiersValidator extends Validator {
    constructor(args, loadProfile) {
        super();
        this._localErrors = [];
        this._args = args;
        this._year = loadProfile.year;
    }
    validate() {
        this.validateBasics();
        this.validateExpandedDates();
        if (this._localErrors.length > 0) {
            this.addError('Blocked Tiers Error', this._localErrors);
        }
        return this;
    }
    filters() {
        return this._args.map((_a) => {
            var { min, max } = _a, filters = __rest(_a, ["min", "max"]);
            return ({
                min: convertInfinities(min),
                max: convertInfinities(max),
                filter: new LoadProfileFilter(filters),
            });
        });
    }
    validateExpandedDates() {
        const dates = expandedDates(this._year);
        const filters = this.filters();
        dates.forEach(expandedDate => {
            const matches = filters.filter(({ filter }) => filter.matches(expandedDate));
            if (matches.length === 0) {
                this._localErrors.push({
                    english: `No tiers are defined for ${JSON.stringify(expandedDate)}`,
                    type: 'missing-tier',
                    data: { expandedDate },
                });
                return;
            }
            this.validateOverlap(matches);
            this.validateRange(matches);
        });
    }
    validateBasics() {
        this._args.forEach(({ min, max }) => {
            if (min.length !== 12 || max.length !== 12) {
                this._localErrors.push({
                    english: `Incorrect amound of arguments found in blocked tier: found ${min.length} min and ${max.length} max`,
                    data: {},
                    type: 'argument-length',
                });
            }
        });
    }
    getSortedPairs(minsAndMaxes) {
        return MONTHS.map(i => {
            return minsAndMaxes.map(({ min, max }) => ({ min: min[i], max: max[i] })).sort((a, b) => a.min - b.min);
        });
    }
    validateOverlap(minsAndMaxes) {
        if (this._args.length < 2)
            return;
        const monthPairs = this.getSortedPairs(minsAndMaxes);
        monthPairs.forEach((pairs, month) => {
            for (let i = 1; i < pairs.length; i++) {
                if (pairs[i - 1].max > pairs[i].min) {
                    this._localErrors.push({
                        english: `Overlap in blocked tier min/maxes found in month ${month} between max: ${pairs[i - 1].max} and min: ${pairs[i].min}`,
                        data: { month, max: pairs[i - 1].max, min: pairs[i].min },
                        type: 'overlap',
                    });
                }
            }
        });
    }
    validateRange(minsAndMaxes) {
        const monthPairs = this.getSortedPairs(minsAndMaxes);
        monthPairs.forEach((pairs, month) => {
            if (pairs[0].min > 0) {
                this._localErrors.push({
                    english: `Lowest blocked tier min for month ${month} is ${pairs[0].min}, expected 0.`,
                    data: { month, min: pairs[0].min },
                    type: 'min',
                });
            }
            if (pairs.map(({ max }) => max).sort()[pairs.length - 1] < Infinity) {
                this._localErrors.push({
                    english: `Highest blocked tier for month ${month} is less than Infinity.`,
                    data: { month },
                    type: 'max',
                });
            }
            if (pairs.length > 1) {
                for (let i = 1; i < pairs.length; i++) {
                    if (pairs[i - 1].max !== pairs[i].min) {
                        this._localErrors.push({
                            english: `Gap in blocked tier min/maxes found in month ${month} between max: ${pairs[i - 1].max} and min: ${pairs[i].min}`,
                            data: { month, max: pairs[i - 1].max, min: pairs[i].min },
                            type: 'gap',
                        });
                    }
                }
            }
        });
    }
}

class ValidatorFactory {
    static make(type, args, loadProfile) {
        switch (type) {
            case 'EnergyTimeOfUse':
                return new EnergyTimeOfUseValidator(args, loadProfile);
            case 'BlockedTiersInDays':
            case 'BlockedTiersInMonths':
                return new BlockedTiersValidator(args, loadProfile);
            default:
                return new GenericValidator();
        }
    }
}

var RateElementClassification;
(function (RateElementClassification) {
    RateElementClassification["ENERGY"] = "energy";
    RateElementClassification["DEMAND"] = "demand";
    RateElementClassification["FIXED"] = "fixed";
    RateElementClassification["SURCHARGE"] = "surcharge";
})(RateElementClassification || (RateElementClassification = {}));
var BillingCategory;
(function (BillingCategory) {
    BillingCategory["TAX"] = "tax";
    BillingCategory["SUPPLY"] = "supply";
    BillingCategory["DELIVERY"] = "delivery";
})(BillingCategory || (BillingCategory = {}));
var BillingDeterminantsUnits;
(function (BillingDeterminantsUnits) {
    BillingDeterminantsUnits["KWH"] = "kWh";
    BillingDeterminantsUnits["KW"] = "kW";
    BillingDeterminantsUnits["DAYS"] = "days";
    BillingDeterminantsUnits["MONTHS"] = "months";
    BillingDeterminantsUnits["DOLLARS"] = "dollars";
})(BillingDeterminantsUnits || (BillingDeterminantsUnits = {}));
var ERateElementType;
(function (ERateElementType) {
    ERateElementType["EnergyTimeOfUse"] = "EnergyTimeOfUse";
    ERateElementType["BlockedTiersInDays"] = "BlockedTiersInDays";
    ERateElementType["BlockedTiersInMonths"] = "BlockedTiersInMonths";
    ERateElementType["FixedPerDay"] = "FixedPerDay";
    ERateElementType["FixedPerMonth"] = "FixedPerMonth";
    ERateElementType["MonthlyDemand"] = "MonthlyDemand";
    ERateElementType["AnnualDemand"] = "AnnualDemand";
    ERateElementType["MonthlyEnergy"] = "MonthlyEnergy";
    ERateElementType["SurchargeAsPercent"] = "SurchargeAsPercent";
    ERateElementType["HourlyEnergy"] = "HourlyEnergy";
    ERateElementType["DemandTiersInMonths"] = "DemandTiersInMonths";
    ERateElementType["DemandTimeOfUse"] = "DemandTimeOfUse";
    ERateElementType["DemandPerDay"] = "DemandPerDay";
})(ERateElementType || (ERateElementType = {}));
const RATE_ELEMENT_SORT_ORDER = {
    [ERateElementType.FixedPerMonth]: 1,
    [ERateElementType.FixedPerDay]: 2,
    [ERateElementType.AnnualDemand]: 3,
    [ERateElementType.MonthlyDemand]: 4,
    [ERateElementType.DemandTiersInMonths]: 5,
    [ERateElementType.DemandTimeOfUse]: 6,
    [ERateElementType.DemandPerDay]: 7,
    [ERateElementType.MonthlyEnergy]: 8,
    [ERateElementType.HourlyEnergy]: 9,
    [ERateElementType.EnergyTimeOfUse]: 10,
    [ERateElementType.BlockedTiersInDays]: 100,
    [ERateElementType.BlockedTiersInMonths]: 100,
    [ERateElementType.SurchargeAsPercent]: 100,
};
const RATE_ELEMENT_CLASSIFICATION_BY_RATE_ELEMENT_TYPE = {
    [ERateElementType.FixedPerMonth]: RateElementClassification.FIXED,
    [ERateElementType.FixedPerDay]: RateElementClassification.FIXED,
    [ERateElementType.AnnualDemand]: RateElementClassification.DEMAND,
    [ERateElementType.MonthlyDemand]: RateElementClassification.DEMAND,
    [ERateElementType.DemandTiersInMonths]: RateElementClassification.DEMAND,
    [ERateElementType.DemandTimeOfUse]: RateElementClassification.DEMAND,
    [ERateElementType.DemandPerDay]: RateElementClassification.DEMAND,
    [ERateElementType.MonthlyEnergy]: RateElementClassification.ENERGY,
    [ERateElementType.HourlyEnergy]: RateElementClassification.ENERGY,
    [ERateElementType.EnergyTimeOfUse]: RateElementClassification.ENERGY,
    [ERateElementType.BlockedTiersInDays]: RateElementClassification.SURCHARGE,
    [ERateElementType.BlockedTiersInMonths]: RateElementClassification.SURCHARGE,
    [ERateElementType.SurchargeAsPercent]: RateElementClassification.SURCHARGE,
};

const sum = (array) => array.reduce((s, i) => s + i, 0);
const sumBy = (array, key) => array.reduce((s, i) => s + i[key], 0);
const maxBy = (array, key) => Math.max(...array.map((item) => item[key]));
const groupBy = (array, property) => {
    const getter = (item) => {
        if (typeof property === 'function') {
            return property(item);
        }
        else {
            return (typeof item[property] === 'function' ? item[property]() : item[property]);
        }
    };
    return array.reduce((s, item) => {
        const value = getter(item);
        if (typeof value === 'undefined') {
            return s;
        }
        return Object.assign(Object.assign({}, s), { [value]: Array.isArray(s[value]) ? [...s[value], item] : [item] });
    }, {});
};
const mean = (array) => sum(array) / array.length;

class BillingDeterminants {
    mean() {
        return mean(this.calculate());
    }
    all() {
        return this.calculate();
    }
    map(callback) {
        return this.calculate().map(callback);
    }
    format() {
        const determinant = Math.round(this.mean());
        const units = determinant === 1 && this.units.endsWith('s') ? this.units.slice(0, this.units.length - 1) : this.units;
        return `${determinant} ${units}`;
    }
}

class AnnualDemand extends BillingDeterminants {
    constructor(loadProfile) {
        super();
        this.rateElementType = ERateElementType.AnnualDemand;
        this.rateElementClassification = RateElementClassification.DEMAND;
        this.units = BillingDeterminantsUnits.KW;
        this._loadProfile = loadProfile;
    }
    calculate() {
        const annualMax = this._loadProfile.max();
        return MONTHS.map((_) => annualMax);
    }
}

const daysPerMonth = (year) => {
    const _isLeapYear = year === undefined ? false : isLeapYear(setYearOnDate(new Date(), year));
    return [31, _isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};

class BlockedTiersInDays extends BillingDeterminants {
    constructor(_a, loadProfile) {
        var { min, max } = _a, filters = __rest(_a, ["min", "max"]);
        super();
        this.rateElementType = ERateElementType.BlockedTiersInDays;
        this.rateElementClassification = RateElementClassification.ENERGY;
        this.units = BillingDeterminantsUnits.KWH;
        this._loadProfile = loadProfile;
        this._min = convertInfinities(min);
        this._max = convertInfinities(max);
        this._filters = filters;
    }
    filteredLoadProfile() {
        return this._loadProfile.filterBy(this._filters);
    }
    calculate() {
        const mins = daysPerMonth(this._loadProfile.year).map((days, i) => days * this._min[i]);
        const maxes = daysPerMonth(this._loadProfile.year).map((days, i) => days * this._max[i]);
        const expandedLoadProfile = this.filteredLoadProfile().expanded();
        const monthlyExpandedLoadProfile = Object.values(groupBy(expandedLoadProfile, 'month'));
        const kwhByMonth = monthlyExpandedLoadProfile.map((loadProfiles) => sumBy(loadProfiles, 'load'));
        return MONTHS.map((i) => {
            const kwh = kwhByMonth[i] || 0;
            if (kwh < mins[i]) {
                return 0;
            }
            if (kwh > maxes[i]) {
                return maxes[i] - mins[i];
            }
            return kwh - mins[i];
        });
    }
}

class BlockedTiersInMonths extends BillingDeterminants {
    constructor(_a, loadProfile) {
        var { min, max } = _a, filters = __rest(_a, ["min", "max"]);
        super();
        this.rateElementType = ERateElementType.BlockedTiersInMonths;
        this.rateElementClassification = RateElementClassification.ENERGY;
        this.units = BillingDeterminantsUnits.KWH;
        this._loadProfile = loadProfile;
        this._min = convertInfinities(min);
        this._max = convertInfinities(max);
        this._filters = filters;
    }
    filteredLoadProfile() {
        return this._loadProfile.filterBy(this._filters);
    }
    calculate() {
        const mins = this._min;
        const maxes = this._max;
        const expandedLoadProfile = this.filteredLoadProfile().expanded();
        const monthlyExpandedLoadProfile = Object.values(groupBy(expandedLoadProfile, 'month'));
        const kwhByMonth = monthlyExpandedLoadProfile.map((loadProfiles) => sumBy(loadProfiles, 'load'));
        return MONTHS.map(i => {
            const kwh = kwhByMonth[i] || 0;
            if (kwh < mins[i]) {
                return 0;
            }
            if (kwh > maxes[i]) {
                return maxes[i] - mins[i];
            }
            return kwh - mins[i];
        });
    }
}

class DemandPerDay extends BillingDeterminants {
    constructor(filters, loadProfile) {
        super();
        this.rateElementType = ERateElementType.DemandPerDay;
        this.rateElementClassification = RateElementClassification.DEMAND;
        this.units = BillingDeterminantsUnits.KW;
        this._filters = filters;
        this._loadProfile = loadProfile;
    }
    filteredLoadProfile() {
        return this._loadProfile.filterBy(this._filters);
    }
    calculate() {
        const expanded = this.filteredLoadProfile().expanded();
        return MONTHS.map((m) => {
            const monthLoads = expanded.filter(({ month }) => m === month);
            // chunk monthly loads by day (31-element array for January, etc.)
            const dayLoads = Object.values(groupBy(monthLoads, (val) => val.date));
            // sum the max demand for each day in the month
            return sum(dayLoads.map((day) => Math.max(...day.map(({ load }) => load))));
        });
    }
}

class DemandTiersInMonths extends BillingDeterminants {
    constructor(_a, loadProfile) {
        var { min, max } = _a, filters = __rest(_a, ["min", "max"]);
        super();
        this.rateElementType = ERateElementType.DemandTiersInMonths;
        this.rateElementClassification = RateElementClassification.DEMAND;
        this.units = BillingDeterminantsUnits.KW;
        this._loadProfile = loadProfile;
        this._min = convertInfinities(min);
        this._max = convertInfinities(max);
        this._filters = filters;
    }
    filteredLoadProfile() {
        return this._loadProfile.filterBy(this._filters);
    }
    calculate() {
        const mins = this._min;
        const maxes = this._max;
        const kwByMonth = this.filteredLoadProfile().maxByMonth();
        return MONTHS.map(i => {
            const kw = kwByMonth[i] || 0;
            if (kw < mins[i]) {
                return 0;
            }
            if (kw > maxes[i]) {
                return maxes[i] - mins[i];
            }
            return kw - mins[i];
        });
    }
}

class DemandTimeOfUse extends BillingDeterminants {
    constructor(filters, loadProfile) {
        super();
        this.rateElementType = ERateElementType.DemandTimeOfUse;
        this.rateElementClassification = RateElementClassification.DEMAND;
        this.units = BillingDeterminantsUnits.KW;
        this._filters = filters;
        this._loadProfile = loadProfile;
    }
    filteredLoadProfile() {
        return this._loadProfile.filterBy(this._filters);
    }
    calculate() {
        return this.filteredLoadProfile().maxByMonth();
    }
}

class EnergyTimeOfUse extends BillingDeterminants {
    constructor(filters, loadProfile) {
        super();
        this.rateElementType = ERateElementType.EnergyTimeOfUse;
        this.rateElementClassification = RateElementClassification.ENERGY;
        this.units = BillingDeterminantsUnits.KWH;
        this._filters = filters;
        this._loadProfile = loadProfile;
    }
    filteredLoadProfile() {
        return this._loadProfile.filterBy(this._filters);
    }
    calculate() {
        return this.filteredLoadProfile().sumByMonth();
    }
}

class FixedPerDay extends BillingDeterminants {
    constructor() {
        super(...arguments);
        this.rateElementType = ERateElementType.FixedPerDay;
        this.rateElementClassification = RateElementClassification.FIXED;
        this.units = BillingDeterminantsUnits.DAYS;
    }
    calculate() {
        return daysPerMonth();
    }
}

class FixedPerMonth extends BillingDeterminants {
    constructor() {
        super(...arguments);
        this.rateElementType = ERateElementType.FixedPerMonth;
        this.rateElementClassification = RateElementClassification.FIXED;
        this.units = BillingDeterminantsUnits.MONTHS;
    }
    calculate() {
        return MONTHS.map(() => 1);
    }
}

class HourlyEnergy extends BillingDeterminants {
    constructor({ hourOfYear }, loadProfile) {
        super();
        this.rateElementType = ERateElementType.HourlyEnergy;
        this.rateElementClassification = RateElementClassification.ENERGY;
        this.units = BillingDeterminantsUnits.KWH;
        this._hourOfYear = hourOfYear;
        this._load = loadProfile.expanded()[hourOfYear].load;
        this._year = loadProfile.year;
    }
    calculate() {
        const { month } = expandedDates(this._year)[this._hourOfYear];
        const months = Array(12).fill(0);
        months[month] = this._load;
        return months;
    }
}

class MonthlyDemand extends BillingDeterminants {
    constructor(loadProfile) {
        super();
        this.rateElementType = ERateElementType.MonthlyDemand;
        this.rateElementClassification = RateElementClassification.DEMAND;
        this.units = BillingDeterminantsUnits.KW;
        this._loadProfile = loadProfile;
    }
    calculate() {
        return this._loadProfile.byMonth().map(monthOfLoads => Math.max(...monthOfLoads));
    }
}

class MonthlyEnergy extends BillingDeterminants {
    constructor(loadProfile) {
        super();
        this.rateElementType = ERateElementType.MonthlyEnergy;
        this.rateElementClassification = RateElementClassification.ENERGY;
        this.units = BillingDeterminantsUnits.KWH;
        this._loadProfile = loadProfile;
    }
    calculate() {
        return this._loadProfile.sumByMonth();
    }
}

class SurchargeAsPercent extends BillingDeterminants {
    constructor({ rateElement }) {
        super();
        this.rateElementType = ERateElementType.SurchargeAsPercent;
        this.rateElementClassification = RateElementClassification.SURCHARGE;
        this.units = BillingDeterminantsUnits.DOLLARS;
        this._rateElement = rateElement;
    }
    calculate() {
        return this._rateElement.costs();
    }
}

class BillingDeterminantsFactory {
    static make(rateElement, loadProfile) {
        const { rateElementType, rateComponents } = rateElement;
        switch (rateElementType) {
            case ERateElementType.EnergyTimeOfUse:
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new EnergyTimeOfUse(args, loadProfile) });
                });
            case ERateElementType.BlockedTiersInDays:
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new BlockedTiersInDays(args, loadProfile) });
                });
            case ERateElementType.BlockedTiersInMonths:
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new BlockedTiersInMonths(args, loadProfile) });
                });
            case ERateElementType.FixedPerDay:
                return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new FixedPerDay() }));
            case ERateElementType.FixedPerMonth:
                return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new FixedPerMonth() }));
            case ERateElementType.MonthlyDemand:
                return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new MonthlyDemand(loadProfile) }));
            case ERateElementType.AnnualDemand:
                return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new AnnualDemand(loadProfile) }));
            case ERateElementType.MonthlyEnergy:
                return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new MonthlyEnergy(loadProfile) }));
            case ERateElementType.SurchargeAsPercent:
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new SurchargeAsPercent(args) });
                });
            case ERateElementType.HourlyEnergy:
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new HourlyEnergy(args, loadProfile) });
                });
            case ERateElementType.DemandTiersInMonths:
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new DemandTiersInMonths(args, loadProfile) });
                });
            case ERateElementType.DemandTimeOfUse:
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new DemandTimeOfUse(args, loadProfile) });
                });
            case ERateElementType.DemandPerDay:
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new DemandPerDay(args, loadProfile) });
                });
            default:
                throw new Error(`Unknown rateElementType: ${rateElementType}`);
        }
    }
}

const SCALER = 1e10;
const addDecimals = (d1, d2) => {
    return Math.round((d1 + d2) * SCALER) / SCALER;
};
const multiplyDecimals = (d1, d2) => {
    return Math.round(d1 * d2 * SCALER) / SCALER;
};

const isPriceProfileObject = (p) => {
    return 'expanded' in p && typeof p['expanded'] === 'function';
};
const isNumberArray$1 = (p) => {
    return typeof p[0] === 'number';
};
class PriceProfile {
    constructor(priceProfileOrExpandedOrExisting, options) {
        this._year = options.year;
        if (isPriceProfileObject(priceProfileOrExpandedOrExisting)) {
            this._expanded = priceProfileOrExpandedOrExisting.expanded();
        }
        else if (isNumberArray$1(priceProfileOrExpandedOrExisting)) {
            this._expanded = this._buildFromNumberArray(priceProfileOrExpandedOrExisting);
        }
        else {
            this._expanded = priceProfileOrExpandedOrExisting;
        }
    }
    expanded() {
        return this._expanded;
    }
    priceValues() {
        return this.expanded().map(({ price }) => price);
    }
    filterBy(filters) {
        const filter = new LoadProfileFilter(filters);
        const filteredLoadProfile = this.expanded().map((_a) => {
            var { price } = _a, detailedPriceProfileHour = __rest(_a, ["price"]);
            return filter.matches(detailedPriceProfileHour) ? price : 0;
        });
        return new PriceProfile(filteredLoadProfile, { year: this._year });
    }
    maxByMonth() {
        const expanded = this.expanded();
        return MONTHS.map((m) => {
            const monthPrices = expanded.filter(({ month }) => m === month).map(({ price }) => price);
            return Math.max(...monthPrices);
        });
    }
    sum() {
        return this.expanded().reduce((sum, { price }) => addDecimals(sum, price), 0);
    }
    count() {
        return this.expanded().length;
    }
    get length() {
        return this.count();
    }
    get year() {
        return this._year;
    }
    average() {
        return this.sum() / this.count();
    }
    max() {
        var _a;
        if (this.count() === 0) {
            return 0;
        }
        return (_a = maxBy(this.expanded(), 'price')) !== null && _a !== undefined ? _a : 0;
    }
    _buildFromNumberArray(priceProfile) {
        const dates = expandedDates(this._year);
        if (dates.length !== priceProfile.length) {
            throw new Error("Price profile length didn't match annual hours length. Maybe a leap year is involved?");
        }
        return (this._expanded = priceProfile.map((price, i) => (Object.assign({ price }, dates[i]))));
    }
}

class RateComponent {
    constructor({ charge, name, billingDeterminants }) {
        this.charge = typeof charge === 'number' ? MONTHS.map(() => charge) : charge;
        this.name = name;
        this._billingDeterminants = billingDeterminants;
        this._classification = billingDeterminants.rateElementClassification;
    }
    costs() {
        return this._billingDeterminants.map((determinant, idx) => multiplyDecimals(determinant, this.charge[idx]));
    }
    getDeterminants() {
        return this._billingDeterminants;
    }
    billingDeterminants() {
        return this._billingDeterminants.all();
    }
    typicalMonthlyCost() {
        return mean(this.costs());
    }
    costForMonth(month) {
        return this.costs()[month];
    }
    typicalBillingDeterminant() {
        return this._billingDeterminants.mean();
    }
    billingDeterminantsForMonth(month) {
        return this.billingDeterminants()[month];
    }
    annualCost() {
        return sum(this.costs());
    }
    rateElementClassification() {
        return this._billingDeterminants.rateElementClassification;
    }
    formatCharge() {
        switch (this._classification) {
            case RateElementClassification.ENERGY: {
                return mean(this.charge).toFixed(5);
            }
            default: {
                return mean(this.charge).toFixed(2);
            }
        }
    }
}

class RateComponentsFactory {
    static make(rateElement, loadProfile, otherRateElements) {
        const convertedRateElement = RateComponentsFactory.preprocess(rateElement, loadProfile, otherRateElements);
        const billingDeterminantsSet = BillingDeterminantsFactory.make(convertedRateElement, loadProfile);
        return billingDeterminantsSet.map(({ charge, name, billingDeterminants }) => {
            return new RateComponent({ charge, name, billingDeterminants });
        });
    }
    static preprocess(rateElement, loadProfile, otherRateElements) {
        switch (rateElement.rateElementType) {
            case ERateElementType.SurchargeAsPercent: {
                const rateComponents = rateElement.rateComponents.flatMap((_a) => {
                    var { name: rateComponentName, charge } = _a, filterArgs = __rest(_a, ["name", "charge"]);
                    return otherRateElements
                        .map((element) => new RateElement(element, loadProfile, []))
                        .filter((element) => element.matches(filterArgs))
                        .map((element) => {
                        return {
                            charge,
                            name: `${rateComponentName} surcharge - ${element.name}`,
                            rateElement: element,
                        };
                    });
                });
                return Object.assign(Object.assign({}, rateElement), { rateComponents });
            }
            case ERateElementType.HourlyEnergy: {
                const priceProfile = new PriceProfile(rateElement.priceProfile, { year: loadProfile.year });
                return Object.assign(Object.assign({}, rateElement), { rateComponents: priceProfile.expanded().map(({ price: charge, hourOfYear }) => ({
                        charge,
                        name: `${rateElement.name} - Hour ${hourOfYear}`,
                        hourOfYear,
                    })) });
            }
            default: {
                return rateElement;
            }
        }
    }
}

class RateElement {
    constructor(rateElementArgs, loadProfile, otherRateElements = []) {
        var _a, _b, _c;
        this.errors = [];
        const { id, rateElementType, name, billingCategory } = rateElementArgs;
        this.id = id;
        this.name = name;
        this.type = rateElementType;
        this.billingCategory = billingCategory;
        if (RateCalculator.shouldValidate) {
            const validator = ValidatorFactory.make(rateElementType, (_a = rateElementArgs['rateComponents']) !== null && _a !== undefined ? _a : [], loadProfile).validate();
            if (RateCalculator.shouldLogValidationErrors) {
                validator.reportErrors();
            }
            this.errors = validator.allErrors();
        }
        this._rateComponents = RateComponentsFactory.make(rateElementArgs, loadProfile, otherRateElements);
        // Should we be assuming that all components
        // have the same classification?
        this.classification =
            (_c = (_b = this._rateComponents[0]) === null || _b === undefined ? undefined : _b.rateElementClassification()) !== null && _c !== undefined ? _c : RATE_ELEMENT_CLASSIFICATION_BY_RATE_ELEMENT_TYPE[rateElementType];
    }
    rateComponents() {
        return this._rateComponents;
    }
    annualCost() {
        return sum(this.rateComponents().map((component) => component.annualCost()));
    }
    costs() {
        const costs = Array(12).fill(0);
        this.rateComponents().forEach((component) => {
            component.costs().forEach((cost, monthIdx) => {
                costs[monthIdx] += cost;
            });
        });
        return costs;
    }
    matches({ billingCategories, classifications, ids }) {
        return ((this.billingCategory && billingCategories ? billingCategories.includes(this.billingCategory) : true) &&
            (this.classification && classifications ? classifications.includes(this.classification) : true) &&
            (this.id && ids ? ids.includes(this.id) : true));
    }
}

class RateCalculator {
    constructor({ name, utilityName, applicability, minimumBillAmount, rateElements, loadProfile, }) {
        this.name = name;
        this.utilityName = utilityName;
        this.applicability = applicability;
        this.minimumBillAmount = minimumBillAmount;
        this._rateElements = rateElements.map((element, idx) => {
            return new RateElement(element, loadProfile, rateElements.filter((_, i) => i !== idx));
        });
    }
    rateElements(_a = {}) {
        var filters = __rest(_a, []);
        return this._rateElements
            .filter((element) => element.matches(filters))
            .sort((a, b) => { var _a, _b; return ((_a = RATE_ELEMENT_SORT_ORDER[a.type]) !== null && _a !== undefined ? _a : 0) - ((_b = RATE_ELEMENT_SORT_ORDER[b.type]) !== null && _b !== undefined ? _b : 0); });
    }
    annualCost(_a = {}) {
        var filters = __rest(_a, []);
        return sum(this.rateElements(filters).map((element) => element.annualCost()));
    }
}
RateCalculator.shouldValidate = true;
RateCalculator.shouldLogValidationErrors = true;

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var lib = {};

var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.IsNanError = TypeError('resulted in NaN');
		exports.FailedToConvergeError = Error('failed to converge');
		exports.InvalidInputsError = Error('invalid inputs');
		const goalSeek = ({ fn, fnParams, percentTolerance, customToleranceFn, maxIterations, maxStep, goal, independentVariableIdx, }) => {
		    if (typeof customToleranceFn !== 'function') {
		        if (!percentTolerance) {
		            throw exports.InvalidInputsError;
		        }
		    }
		    let g;
		    let y;
		    let y1;
		    let oldGuess;
		    let newGuess;
		    let res;
		    const absoluteTolerance = ((percentTolerance || 0) / 100) * goal;
		    // iterate through the guesses
		    for (let i = 0; i < maxIterations; i++) {
		        // define the root of the function as the error
		        res = fn.apply(null, fnParams);
		        y = res - goal;
		        if (isNaN(y))
		            throw exports.IsNanError;
		        // was our initial guess a good one?
		        if (typeof customToleranceFn !== 'function') {
		            if (Math.abs(y) <= Math.abs(absoluteTolerance))
		                return fnParams[independentVariableIdx];
		        }
		        else {
		            if (customToleranceFn(res))
		                return fnParams[independentVariableIdx];
		        }
		        // set the new guess, correcting for maxStep
		        oldGuess = fnParams[independentVariableIdx];
		        newGuess = oldGuess + y;
		        if (Math.abs(newGuess - oldGuess) > maxStep) {
		            if (newGuess > oldGuess) {
		                newGuess = oldGuess + maxStep;
		            }
		            else {
		                newGuess = oldGuess - maxStep;
		            }
		        }
		        fnParams[independentVariableIdx] = newGuess;
		        // re-run the fn with the new guess
		        y1 = fn.apply(null, fnParams) - goal;
		        if (isNaN(y1))
		            throw exports.IsNanError;
		        // calculate the error
		        g = (y1 - y) / y;
		        if (g === 0)
		            g = 0.0001;
		        // set the new guess based on the error, correcting for maxStep
		        newGuess = oldGuess - y / g;
		        if (maxStep && Math.abs(newGuess - oldGuess) > maxStep) {
		            if (newGuess > oldGuess) {
		                newGuess = oldGuess + maxStep;
		            }
		            else {
		                newGuess = oldGuess - maxStep;
		            }
		        }
		        fnParams[independentVariableIdx] = newGuess;
		    }
		    // done with iterations, and we failed to converge
		    throw exports.FailedToConvergeError;
		};
		exports.default = goalSeek; 
	} (lib));
	return lib;
}

var libExports = requireLib();
var goalSeek = /*@__PURE__*/getDefaultExportFromCjs(libExports);

const gs = ('default' in goalSeek ? goalSeek.default : goalSeek);
// TODO: use proper math for scaling
// TODO: fix the toAverageMonthlyBill argument... how to properly pass in a rate?
class LoadProfileScaler {
    constructor(loadProfile, { debug } = { debug: false }) {
        this.loadProfile = loadProfile;
        this.debug = debug;
    }
    to(scaler) {
        return new LoadProfile(this.loadProfile.expanded().map((loadHour) => loadHour.load * scaler), { year: this.loadProfile.year });
    }
    toTotalKwh(totalKwh) {
        const scaler = totalKwh / this.loadProfile.sum();
        return this.to(scaler);
    }
    toAverageMonthlyBill(amount, rate, goalSeekParams = {}) {
        // Ex. pass in 10_000 as amount
        // Ex. magnitude === 4
        const magnitude = Math.max(Math.floor(Math.log10(Math.abs(amount))), 0);
        // Ex. magnitudeScalar === 10_000
        const magnitudeScaler = Math.pow(10, magnitude);
        const initialScalerGuess = magnitudeScaler;
        const fnParams = [initialScalerGuess, rate, this, magnitude];
        // goal-seek -> you know the desired output of a function but not the input to yield such an output
        const finalScaler = gs(Object.assign({ fn: this.scaledMonthlyCost, fnParams, percentTolerance: 0.1, maxIterations: 1000, maxStep: magnitudeScaler * 10, goal: amount, independentVariableIdx: 0 }, goalSeekParams));
        const scalerAsDecimal = finalScaler / magnitudeScaler;
        return this.to(scalerAsDecimal);
    }
    toMonthlyKwh(monthlyKwh) {
        if (monthlyKwh.length !== 12) {
            throw new Error('monthlyKwh must be an array of 12 numbers');
        }
        const scalersByMonth = this.loadProfile.sumByMonth().map((kwh, idx) => {
            return monthlyKwh[idx] / kwh;
        });
        const scaledLoad = this.loadProfile.expanded().map((loadHour) => {
            return Object.assign(Object.assign({}, loadHour), { load: loadHour.load * scalersByMonth[loadHour.month] });
        });
        return new LoadProfile(scaledLoad, { year: this.loadProfile.year });
    }
    scaledMonthlyCost(scaler, rate, context, magnitude) {
        const scaledLoadProfile = context.to(scaler / Math.pow(10, magnitude));
        const rateCalculator = new RateCalculator(Object.assign(Object.assign({}, rate), { loadProfile: scaledLoadProfile }));
        const currentMonthlyCost = rateCalculator.annualCost() / 12;
        if (context.debug) {
            console.log('current scaler is:', scaler);
            console.log('current monthlyCost is:', currentMonthlyCost);
        }
        return currentMonthlyCost;
    }
}

const isLoadProfileObject = (p) => {
    return 'expanded' in p && typeof p['expanded'] === 'function';
};
const isNumberArray = (p) => {
    return typeof p[0] === 'number';
};
class LoadProfile {
    constructor(loadProfileOrExpandedOrExisting, options) {
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
    expanded() {
        return this._expanded;
    }
    loadValues() {
        return this.expanded().map(({ load }) => load);
    }
    filterBy(filters) {
        const filter = new LoadProfileFilter(filters);
        const filteredLoadProfile = this.expanded().map((_a) => {
            var { load } = _a, detailedLoadProfileHour = __rest(_a, ["load"]);
            return filter.matches(detailedLoadProfileHour) ? load : 0;
        });
        return new LoadProfile(filteredLoadProfile, { year: this._year });
    }
    loadShift(amount, filters) {
        const filter = new LoadProfileFilter(filters);
        const shiftedLoadProfile = this.expanded().map((detailedLoadProfileHour) => filter.matches(detailedLoadProfileHour) ? detailedLoadProfileHour.load + amount : detailedLoadProfileHour.load);
        return new LoadProfile(shiftedLoadProfile, { year: this._year });
    }
    sumByMonth() {
        const sums = MONTHS.map((_) => 0);
        this.expanded().forEach(({ load, month }) => {
            sums[month] = addDecimals(sums[month], load);
        });
        return sums;
    }
    maxByMonth() {
        const expanded = this.expanded();
        return MONTHS.map((m) => {
            const monthLoads = expanded.filter(({ month }) => m === month).map(({ load }) => load);
            return Math.max(...monthLoads);
        });
    }
    byMonth() {
        const months = MONTHS.map((_) => []);
        this.expanded().forEach(({ load, month }) => {
            months[month].push(load);
        });
        return months;
    }
    sum() {
        return this.expanded().reduce((sum, { load }) => addDecimals(sum, load), 0);
    }
    count() {
        return this.expanded().length;
    }
    get length() {
        return this.count();
    }
    get year() {
        return this._year;
    }
    average() {
        return this.sum() / this.count();
    }
    max() {
        var _a;
        if (this.count() === 0) {
            return 0;
        }
        // lodash's maxBy interface returns T | undefined so we need the ?? 0 here although it should never be 0
        return (_a = maxBy(this.expanded(), 'load')) !== null && _a !== undefined ? _a : 0;
    }
    loadFactor() {
        if (this.count() === 0) {
            return 0;
        }
        return this.sum() / (this.count() * this.max());
    }
    scale(options) {
        return new LoadProfileScaler(this, options);
    }
    aggregate(otherLoadProfile) {
        return new LoadProfile(this.expanded().map(({ load }, idx) => {
            return addDecimals(load, otherLoadProfile.expanded()[idx].load);
        }), { year: this._year });
    }
    _buildFromNumberArray(loadProfileNumberArray) {
        const dates = expandedDates(this._year);
        if (!loadProfileNumberArray.length) {
            throw new Error('Cannot build LoadProfile instance. Instantiated with an empty loadProfile array.');
        }
        if (dates.length !== loadProfileNumberArray.length) {
            const isLeapYearInvolved = Math.abs(dates.length - loadProfileNumberArray.length) === 24;
            throw new Error(`Load profile length didn't match annual hours length.${isLeapYearInvolved ? " It's likely a leap year is involved." : ' Maybe a leap year is involved.'}`);
        }
        return loadProfileNumberArray.map((load, i) => (Object.assign({ load }, dates[i])));
    }
}

const RateEngineVersion = "2.0.2";

export { BillingCategory, BillingDeterminantsUnits, ERateElementType, LoadProfile, MONTHS, RATE_ELEMENT_CLASSIFICATION_BY_RATE_ELEMENT_TYPE, RATE_ELEMENT_SORT_ORDER, RateCalculator, RateComponent, RateElement, RateElementClassification, RateEngineVersion };
