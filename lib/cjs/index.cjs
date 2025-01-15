'use strict';

var lodashEs = require('lodash-es');

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

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var dayjs_min$1 = {exports: {}};

var dayjs_min = dayjs_min$1.exports;

var hasRequiredDayjs_min;

function requireDayjs_min () {
	if (hasRequiredDayjs_min) return dayjs_min$1.exports;
	hasRequiredDayjs_min = 1;
	(function (module, exports) {
		!function(t,e){module.exports=e();}(dayjs_min,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return "["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return undefined===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,true),this.parse(t),this.$x=this.$x||t.x||{},this[p]=true;}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return b},m.isValid=function(){return !(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,false)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case "YY":return String(e.$y).slice(-2);case "YYYY":return b.s(e.$y,4,"0");case "M":return a+1;case "MM":return b.s(a+1,2,"0");case "MMM":return h(n.monthsShort,a,c,3);case "MMMM":return h(c,a);case "D":return e.$D;case "DD":return b.s(e.$D,2,"0");case "d":return String(e.$W);case "dd":return h(n.weekdaysMin,e.$W,o,2);case "ddd":return h(n.weekdaysShort,e.$W,o,3);case "dddd":return o[e.$W];case "H":return String(s);case "HH":return b.s(s,2,"0");case "h":return d(1);case "hh":return d(2);case "a":return $(s,u,true);case "A":return $(s,u,false);case "m":return String(u);case "mm":return b.s(u,2,"0");case "s":return String(e.$s);case "ss":return b.s(e.$s,2,"0");case "SSS":return b.s(e.$ms,3,"0");case "Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g;}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,true);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=true),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O})); 
	} (dayjs_min$1));
	return dayjs_min$1.exports;
}

var dayjs_minExports = requireDayjs_min();
var dayjs = /*@__PURE__*/getDefaultExportFromCjs(dayjs_minExports);

var timezone$2 = {exports: {}};

var timezone$1 = timezone$2.exports;

var hasRequiredTimezone;

function requireTimezone () {
	if (hasRequiredTimezone) return timezone$2.exports;
	hasRequiredTimezone = 1;
	(function (module, exports) {
		!function(t,e){module.exports=e();}(timezone$1,(function(){var t={year:0,month:1,day:2,hour:3,minute:4,second:5},e={};return function(n,i,o){var r,a=function(t,n,i){ undefined===i&&(i={});var o=new Date(t),r=function(t,n){ undefined===n&&(n={});var i=n.timeZoneName||"short",o=t+"|"+i,r=e[o];return r||(r=new Intl.DateTimeFormat("en-US",{hour12:false,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:i}),e[o]=r),r}(n,i);return r.formatToParts(o)},u=function(e,n){for(var i=a(e,n),r=[],u=0;u<i.length;u+=1){var f=i[u],s=f.type,m=f.value,c=t[s];c>=0&&(r[c]=parseInt(m,10));}var d=r[3],l=24===d?0:d,h=r[0]+"-"+r[1]+"-"+r[2]+" "+l+":"+r[4]+":"+r[5]+":000",v=+e;return (o.utc(h).valueOf()-(v-=v%1e3))/6e4},f=i.prototype;f.tz=function(t,e){ undefined===t&&(t=r);var n,i=this.utcOffset(),a=this.toDate(),u=a.toLocaleString("en-US",{timeZone:t}),f=Math.round((a-new Date(u))/1e3/60),s=15*-Math.round(a.getTimezoneOffset()/15)-f;if(!Number(s))n=this.utcOffset(0,e);else if(n=o(u,{locale:this.$L}).$set("millisecond",this.$ms).utcOffset(s,true),e){var m=n.utcOffset();n=n.add(i-m,"minute");}return n.$x.$timezone=t,n},f.offsetName=function(t){var e=this.$x.$timezone||o.tz.guess(),n=a(this.valueOf(),e,{timeZoneName:t}).find((function(t){return "timezonename"===t.type.toLowerCase()}));return n&&n.value};var s=f.startOf;f.startOf=function(t,e){if(!this.$x||!this.$x.$timezone)return s.call(this,t,e);var n=o(this.format("YYYY-MM-DD HH:mm:ss:SSS"),{locale:this.$L});return s.call(n,t,e).tz(this.$x.$timezone,true)},o.tz=function(t,e,n){var i=n&&e,a=n||e||r,f=u(+o(),a);if("string"!=typeof t)return o(t).tz(a);var s=function(t,e,n){var i=t-60*e*1e3,o=u(i,n);if(e===o)return [i,e];var r=u(i-=60*(o-e)*1e3,n);return o===r?[i,o]:[t-60*Math.min(o,r)*1e3,Math.max(o,r)]}(o.utc(t,i).valueOf(),f,a),m=s[0],c=s[1],d=o(m).utcOffset(c);return d.$x.$timezone=a,d},o.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},o.tz.setDefault=function(t){r=t;};}})); 
	} (timezone$2));
	return timezone$2.exports;
}

var timezoneExports = requireTimezone();
var timezone = /*@__PURE__*/getDefaultExportFromCjs(timezoneExports);

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

dayjs.extend(timezone);
// @ts-ignore - no import from dayjs
dayjs.tz.setDefault("America/New_York");
const dates = {};
const generateDates = (year) => {
    let profileTime = dayjs().year(year).month(0).date(1).hour(0).minute(0).second(0);
    return new Array(isLeapYear(profileTime.toDate()) ? 8784 : 8760).fill(0).map((_, hourOfYear) => {
        const val = {
            month: profileTime.month(), // 0-based, January is 0
            dayOfWeek: profileTime.day(), // 0-based, Sunday is 0
            hourStart: profileTime.hour(),
            date: profileTime.format('YYYY-MM-DD'),
            hourOfYear,
        };
        profileTime = profileTime.add(1, "hour");
        return val;
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

exports.RateElementClassification = void 0;
(function (RateElementClassification) {
    RateElementClassification["ENERGY"] = "energy";
    RateElementClassification["DEMAND"] = "demand";
    RateElementClassification["FIXED"] = "fixed";
    RateElementClassification["SURCHARGE"] = "surcharge";
})(exports.RateElementClassification || (exports.RateElementClassification = {}));
exports.BillingCategory = void 0;
(function (BillingCategory) {
    BillingCategory["TAX"] = "tax";
    BillingCategory["SUPPLY"] = "supply";
    BillingCategory["DELIVERY"] = "delivery";
})(exports.BillingCategory || (exports.BillingCategory = {}));
exports.BillingDeterminantsUnits = void 0;
(function (BillingDeterminantsUnits) {
    BillingDeterminantsUnits["KWH"] = "kWh";
    BillingDeterminantsUnits["KW"] = "kW";
    BillingDeterminantsUnits["DAYS"] = "days";
    BillingDeterminantsUnits["MONTHS"] = "months";
    BillingDeterminantsUnits["DOLLARS"] = "dollars";
})(exports.BillingDeterminantsUnits || (exports.BillingDeterminantsUnits = {}));
exports.ERateElementType = void 0;
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
})(exports.ERateElementType || (exports.ERateElementType = {}));
const RATE_ELEMENT_SORT_ORDER = {
    [exports.ERateElementType.FixedPerMonth]: 1,
    [exports.ERateElementType.FixedPerDay]: 2,
    [exports.ERateElementType.AnnualDemand]: 3,
    [exports.ERateElementType.MonthlyDemand]: 4,
    [exports.ERateElementType.DemandTiersInMonths]: 5,
    [exports.ERateElementType.DemandTimeOfUse]: 6,
    [exports.ERateElementType.DemandPerDay]: 7,
    [exports.ERateElementType.MonthlyEnergy]: 8,
    [exports.ERateElementType.HourlyEnergy]: 9,
    [exports.ERateElementType.EnergyTimeOfUse]: 10,
    [exports.ERateElementType.BlockedTiersInDays]: 100,
    [exports.ERateElementType.BlockedTiersInMonths]: 100,
    [exports.ERateElementType.SurchargeAsPercent]: 100,
};
const RATE_ELEMENT_CLASSIFICATION_BY_RATE_ELEMENT_TYPE = {
    [exports.ERateElementType.FixedPerMonth]: exports.RateElementClassification.FIXED,
    [exports.ERateElementType.FixedPerDay]: exports.RateElementClassification.FIXED,
    [exports.ERateElementType.AnnualDemand]: exports.RateElementClassification.DEMAND,
    [exports.ERateElementType.MonthlyDemand]: exports.RateElementClassification.DEMAND,
    [exports.ERateElementType.DemandTiersInMonths]: exports.RateElementClassification.DEMAND,
    [exports.ERateElementType.DemandTimeOfUse]: exports.RateElementClassification.DEMAND,
    [exports.ERateElementType.DemandPerDay]: exports.RateElementClassification.DEMAND,
    [exports.ERateElementType.MonthlyEnergy]: exports.RateElementClassification.ENERGY,
    [exports.ERateElementType.HourlyEnergy]: exports.RateElementClassification.ENERGY,
    [exports.ERateElementType.EnergyTimeOfUse]: exports.RateElementClassification.ENERGY,
    [exports.ERateElementType.BlockedTiersInDays]: exports.RateElementClassification.SURCHARGE,
    [exports.ERateElementType.BlockedTiersInMonths]: exports.RateElementClassification.SURCHARGE,
    [exports.ERateElementType.SurchargeAsPercent]: exports.RateElementClassification.SURCHARGE,
};

class BillingDeterminants {
    mean() {
        return lodashEs.mean(this.calculate());
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
        this.rateElementType = exports.ERateElementType.AnnualDemand;
        this.rateElementClassification = exports.RateElementClassification.DEMAND;
        this.units = exports.BillingDeterminantsUnits.KW;
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
        this.rateElementType = exports.ERateElementType.BlockedTiersInDays;
        this.rateElementClassification = exports.RateElementClassification.ENERGY;
        this.units = exports.BillingDeterminantsUnits.KWH;
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
        const monthlyExpandedLoadProfile = Object.values(lodashEs.groupBy(expandedLoadProfile, 'month'));
        const kwhByMonth = monthlyExpandedLoadProfile.map((loadProfiles) => lodashEs.sumBy(loadProfiles, 'load'));
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
        this.rateElementType = exports.ERateElementType.BlockedTiersInMonths;
        this.rateElementClassification = exports.RateElementClassification.ENERGY;
        this.units = exports.BillingDeterminantsUnits.KWH;
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
        const monthlyExpandedLoadProfile = Object.values(lodashEs.groupBy(expandedLoadProfile, 'month'));
        const kwhByMonth = monthlyExpandedLoadProfile.map((loadProfiles) => lodashEs.sumBy(loadProfiles, 'load'));
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
        this.rateElementType = exports.ERateElementType.DemandPerDay;
        this.rateElementClassification = exports.RateElementClassification.DEMAND;
        this.units = exports.BillingDeterminantsUnits.KW;
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
            const dayLoads = Object.values(lodashEs.groupBy(monthLoads, (val) => val.date));
            // sum the max demand for each day in the month
            return lodashEs.sum(dayLoads.map((day) => Math.max(...day.map(({ load }) => load))));
        });
    }
}

class DemandTiersInMonths extends BillingDeterminants {
    constructor(_a, loadProfile) {
        var { min, max } = _a, filters = __rest(_a, ["min", "max"]);
        super();
        this.rateElementType = exports.ERateElementType.DemandTiersInMonths;
        this.rateElementClassification = exports.RateElementClassification.DEMAND;
        this.units = exports.BillingDeterminantsUnits.KW;
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
        this.rateElementType = exports.ERateElementType.DemandTimeOfUse;
        this.rateElementClassification = exports.RateElementClassification.DEMAND;
        this.units = exports.BillingDeterminantsUnits.KW;
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
        this.rateElementType = exports.ERateElementType.EnergyTimeOfUse;
        this.rateElementClassification = exports.RateElementClassification.ENERGY;
        this.units = exports.BillingDeterminantsUnits.KWH;
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
        this.rateElementType = exports.ERateElementType.FixedPerDay;
        this.rateElementClassification = exports.RateElementClassification.FIXED;
        this.units = exports.BillingDeterminantsUnits.DAYS;
    }
    calculate() {
        return daysPerMonth();
    }
}

class FixedPerMonth extends BillingDeterminants {
    constructor() {
        super(...arguments);
        this.rateElementType = exports.ERateElementType.FixedPerMonth;
        this.rateElementClassification = exports.RateElementClassification.FIXED;
        this.units = exports.BillingDeterminantsUnits.MONTHS;
    }
    calculate() {
        return MONTHS.map(() => 1);
    }
}

class HourlyEnergy extends BillingDeterminants {
    constructor({ hourOfYear }, loadProfile) {
        super();
        this.rateElementType = exports.ERateElementType.HourlyEnergy;
        this.rateElementClassification = exports.RateElementClassification.ENERGY;
        this.units = exports.BillingDeterminantsUnits.KWH;
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
        this.rateElementType = exports.ERateElementType.MonthlyDemand;
        this.rateElementClassification = exports.RateElementClassification.DEMAND;
        this.units = exports.BillingDeterminantsUnits.KW;
        this._loadProfile = loadProfile;
    }
    calculate() {
        return this._loadProfile.byMonth().map(monthOfLoads => Math.max(...monthOfLoads));
    }
}

class MonthlyEnergy extends BillingDeterminants {
    constructor(loadProfile) {
        super();
        this.rateElementType = exports.ERateElementType.MonthlyEnergy;
        this.rateElementClassification = exports.RateElementClassification.ENERGY;
        this.units = exports.BillingDeterminantsUnits.KWH;
        this._loadProfile = loadProfile;
    }
    calculate() {
        return this._loadProfile.sumByMonth();
    }
}

class SurchargeAsPercent extends BillingDeterminants {
    constructor({ rateElement }) {
        super();
        this.rateElementType = exports.ERateElementType.SurchargeAsPercent;
        this.rateElementClassification = exports.RateElementClassification.SURCHARGE;
        this.units = exports.BillingDeterminantsUnits.DOLLARS;
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
            case exports.ERateElementType.EnergyTimeOfUse:
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new EnergyTimeOfUse(args, loadProfile) });
                });
            case exports.ERateElementType.BlockedTiersInDays:
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new BlockedTiersInDays(args, loadProfile) });
                });
            case exports.ERateElementType.BlockedTiersInMonths:
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new BlockedTiersInMonths(args, loadProfile) });
                });
            case exports.ERateElementType.FixedPerDay:
                return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new FixedPerDay() }));
            case exports.ERateElementType.FixedPerMonth:
                return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new FixedPerMonth() }));
            case exports.ERateElementType.MonthlyDemand:
                return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new MonthlyDemand(loadProfile) }));
            case exports.ERateElementType.AnnualDemand:
                return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new AnnualDemand(loadProfile) }));
            case exports.ERateElementType.MonthlyEnergy:
                return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new MonthlyEnergy(loadProfile) }));
            case exports.ERateElementType.SurchargeAsPercent:
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new SurchargeAsPercent(args) });
                });
            case exports.ERateElementType.HourlyEnergy:
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new HourlyEnergy(args, loadProfile) });
                });
            case exports.ERateElementType.DemandTiersInMonths:
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new DemandTiersInMonths(args, loadProfile) });
                });
            case exports.ERateElementType.DemandTimeOfUse:
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new DemandTimeOfUse(args, loadProfile) });
                });
            case exports.ERateElementType.DemandPerDay:
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
        var _a, _b;
        if (this.count() === 0) {
            return 0;
        }
        // lodash's maxBy interface returns T | undefined so we need the ?? 0 here although it should never be 0
        return (_b = (_a = lodashEs.maxBy(this.expanded(), 'price')) === null || _a === undefined ? undefined : _a.price) !== null && _b !== undefined ? _b : 0;
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
        return lodashEs.mean(this.costs());
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
        return lodashEs.sum(this.costs());
    }
    rateElementClassification() {
        return this._billingDeterminants.rateElementClassification;
    }
    formatCharge() {
        switch (this._classification) {
            case exports.RateElementClassification.ENERGY: {
                return lodashEs.mean(this.charge).toFixed(5);
            }
            default: {
                return lodashEs.mean(this.charge).toFixed(2);
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
            case exports.ERateElementType.SurchargeAsPercent: {
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
            case exports.ERateElementType.HourlyEnergy: {
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
        return lodashEs.sum(this.rateComponents().map((component) => component.annualCost()));
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

const sum = (array) => array.reduce((s, i) => s + i, 0);

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
        const magnitude = Math.max(Math.floor(Math.log10(Math.abs(amount))), 0);
        const magnitudeScaler = Math.pow(10, magnitude);
        const initialScalerGuess = magnitudeScaler;
        const fnParams = [initialScalerGuess, rate, this, magnitude];
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
        var _a, _b;
        if (this.count() === 0) {
            return 0;
        }
        // lodash's maxBy interface returns T | undefined so we need the ?? 0 here although it should never be 0
        return (_b = (_a = lodashEs.maxBy(this.expanded(), 'load')) === null || _a === undefined ? undefined : _a.load) !== null && _b !== undefined ? _b : 0;
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

exports.LoadProfile = LoadProfile;
exports.MONTHS = MONTHS;
exports.RATE_ELEMENT_CLASSIFICATION_BY_RATE_ELEMENT_TYPE = RATE_ELEMENT_CLASSIFICATION_BY_RATE_ELEMENT_TYPE;
exports.RATE_ELEMENT_SORT_ORDER = RATE_ELEMENT_SORT_ORDER;
exports.RateCalculator = RateCalculator;
exports.RateComponent = RateComponent;
exports.RateElement = RateElement;
exports.RateEngineVersion = RateEngineVersion;
