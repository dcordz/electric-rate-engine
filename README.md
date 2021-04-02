# Electric Rate Engine

Electric rate calculations shouldn't be so complicated. There may be a lot of line items and rules, but the calculations are arithmetical. This repo does the math for you, is quick and fully tested, and written for the front-end so that it can be layered on top of any web application.

Support for both Rates and Load Profiles are included.

## Installation
```
npm install @bellawatt/electric-rate-engine --save
```

## Usage

### RateCalculator

The Rate Calculator is composed of three levels of abstraction:
- a `rate`: the encompassing file that defines the rate including the name, written in JSON.
- a `rate element`: an individual line item on a `rate` , such as the "Fixed Monthly Charge".
- a `rate component`: the charges and names of each `rate element`, such as $10/month. The distinction between `rate elements` and `rate components` is created in order to support rate elements that have multiple components, such as a time-of-use energy rate element that has multiple time period components.

In addition to the rate, a load profile must be provided in order to calculate the rate.

```js
import { RateCalculator } from '@bellawatt/electric-rate-engine';

const loadProfile = // array of 8760 load profile hours

const rate = {
  name: 'E-TOU-A',
  title: 'Residential Time-Of-Use Service (Tiered)',
  rateElements: [
    {
      rateElementType: 'FixedPerDay',
      name: 'Delivery Charge',
      rateComponents: [
        {
          charge: 0.32854,
          name: "Delivery Charge',
        }
      ]
    },
    {
      rateElementType: 'BlockedTiersInDays',
      name: 'First Block Discount',
      rateComponents: [
        {
          charge: -0.08633,
          min: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          max: [12, 12, 12, 12, 14.2, 14.2, 14.2, 14.2, 14.2, 14.2, 12, 12],
          name: 'Discount',
        },
      ],
    },
  ]
};

const rateCalculator = new RateCalculator({...rate, loadProfile});
```

#### Supported Rate Element Types

**FixedPerDay**: A fixed cost per day.
```js
const exampleFixedPerDayData = {
  rateElementType: 'FixedPerDay',
  name: 'Delivery Charge',
  rateComponents: [
    {
      charge: 0.32854,
      name: "Delivery Charge',
    }
  ]
}

```

**FixedPerMonth**: A fixed cost per month.
```js
const exampleFixedPerMonthData = {
  name: 'California Clean Climate Credit',
  rateElementType: 'FixedPerMonth',
  rateComponents: [
    {
      charge: [0, 0, 0, -35.73, 0, 0, 0, 0, 0, -35.73, 0, 0],
      name: 'California Clean Climate Credit',
    },
  ],
}
```
**EnergyTimeOfUse**: A time-of-use energy charge. See the **Load Profile Filters** section below for available parameters for each `rate component`.
```js
const HOLIDAYS = ['2018-01-01','2018-02-19','2018-05-28','2018-07-04','2018-09-03','2018-11-12','2018-11-22','2018-12-25'];

const exampleEnergyTimeOfUseData = {
  name: 'Energy Charges',
  rateElementType: 'EnergyTimeOfUse',
  rateComponents: [
    {
      charge: 0.43293,
      months: [5, 6, 7, 8],
      daysOfWeek: [1, 2, 3, 4, 5], // M-F
      hourStarts: [15, 16, 17, 18, 19],
      exceptForDays: HOLIDAYS,
      name: 'summer peak',
    },
    {
      charge: 0.35736,
      months: [5, 6, 7, 8],
      daysOfWeek: [1, 2, 3, 4, 5], // M-F
      hourStarts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 20, 21, 22, 23],
      exceptForDays: HOLIDAYS,
      name: 'summer offpeak weekdays',
    },
    //...
  ]
}
```

**BlockedTiersInDays**: An inclining or declining block rate structure, where blocks are measured on a per-day basis.
```js
const exampleBlockedTiersInDaysData = {
  rateElementType: 'BlockedTiersInDays',
  name: 'First Block Discount',
  rateComponents: [
    {
      charge: -0.08633,
      min: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 12 months,
      max: [12, 12, 12, 12, 14.2, 14.2, 14.2, 14.2, 14.2, 14.2, 12, 12] // 12 months,
      name: 'Discount',
    },
  ],
}
```

#### Methods

**Setup**
```js
import { RateCalculator } from '@bellawatt/electric-rate-engine;
import data from './data';

const rateCalculator = new RateCalculator(data);
```

**Rate Calculator**

```js
rateCalculator.annualCost(); // sum of all RateElement annual costs (number)
const rateElements = rateCalculator.rateElements() // array of RateElement objects
```

**Rate Element**
```js
const firstRateElement = rateElements[0];
firstRateElement.annualCost(); // sum of all RateComponent annual costs (number)
const rateComponents = firstRateElement.rateComponents() // array of RateComponent objects
```

**Rate Component**

```js
const firstRateComponent = rateComponents[0]; 
firstRateComponent.costs() // array of costs per billing determinant (number)
firstRateComponent.typicalMonthlyCost() // mean of costs (number)
firstRateComponent.costForMonth(0) // cost for the 0th [january] month (number)
firstRateComponent.billingDeterminants() // array of billing determinant (number)
firstRateComponent.typicalBillingDeterminant() // mean of billing deteriminants (number)
firstRateComponent.billingDeterminantsForMonth(11) // billing determinant for the 11th [december] month (number)
firstRateComponent.annualCosts() // sum of costs (number)
```

#### RateCalculator Errors
The RateCalculator will also automatically check your rates for duplicate or missing charges. By default, this feature is enabled and sends errors to the console. 

To disable any part of validation, use the following syntax somewhere early in your application.

```js
RateCalculator.shouldValidate = false // turn off all validation
RateCalculator.shouldLogValidationErrors = false // leave validation on, but don't send the errors to the console
```

With errors enabled, each `RateElement` object will contain a `.errors` property which is an array of errors.

```js
firstRateElement.errors // array of any errors found (an empty array if no errors are found)

const error = firstRateElement.errors[0]

// Base Error Interface
{
  english: 'The logged, plain english message of what caused the error',
  type: 'The type of error found, based on the type of rate',
  data: {}, // based on the type of rate
}
```
**Blocked Tiers Examples**
```js
{
  english: 'Lowest block tier min for month 3 is 10, expected 0.',
  data: {month: 3, min: 10},
  type: 'min',
}
{
  english: 'Gap in blocked tier min/maxes found in month 3 between max: 100 and min: 90',
  data: {month: 3, max: 100, min: 90},
  type: 'gap',
}
{
  english: `Highest blocked tier for month 3 is less than Infinity.`,
  data: {month: 3},
  type: 'max',
}
{
  english: `Overlap in blocked tier min/maxes found in month 3 between max: 100 and min: 110`,
  data: {month: 3, max: 100, min: 110},
  type: 'overlap',
}
{
  english: `Incorrect amound of arguments found in blocked tier: found 12 min and 11 max`,
  data: {},
  type: 'argument-length',
}
```
**EnergyTimeOfUse Examples**
```js
{
  english: `No filter set found that matches ${JSON.stringify(expandedDate)}`,
  data: date, // expandedDate
  type: 'none',
}
{
  english: `2 filter sets found that match ${JSON.stringify(date)}`,
  data: {
    date: date, //expandedDate
    rateComponents: [], // array of rateComponents found to be duplicated
  },
  type: 'duplicate',
}

```



### LoadProfile

```js
import { LoadProfile } from '@bellawatt/electric-rate-engine';

const loadProfileData = // array of load profile hours

const loadProfile = new LoadProfile(loadProfileData);
```
#### Methods
**Load Profile**
```js
loadProfile.filterBy(loadProfileFilter) // new filtered LoadProfile object
loadProfile.sumByMonth() // 12 length array of load sums by month
loadProfile.sum() // load sum (number)
loadProfile.count() // hours in the load profile (will be less than 8760 if filtered) (number)
loadProfile.length // property alias to count()
loadProfile.average() // average load based on filtered set (if filtered) (number)
loadProfile.expanded() // array of DetailedLoadProfileHour objects
loadProfile.max() // maximum load
loadProfile.loadFactor() // how much capacity you're using on a regular basis (sum / (length * max))
loadProfile.scale() // returns a LoadProfileScaler instance (documented below)
loadProfile.loadShift(amount, loadProfileFilter) // new loadprofile shifted by amount on hours that match the provided filter
```

**LoadProfileScaler**
```js
loadProfileScaler.to(scale) // returns a scaled load profile scaled to the provided number
loadProfileScaler.toTotalKwh(totalKwh) // returns a scaled load profile scaled based on load to the provided kwh
loadProfileScaler.toAverageMonthlyBill(amount, rate) // returns a scaled load profile scaled to the amount based on the provided RateInterface, rate
```

### Type Definitions
**Load Profile Filter**
```js
// all fields are optional
{
  months: [0, 1], // array of 0 indexed months to only include (given example data: january, february)
  daysOfWeek: [1, 3], // array of 0 indexed days of the week to only include sun-sat (given example data: monday, wednesday)
  hourStarts: [11, 12, 13, 14], // array of 0 indexed 24 hour time hours to only include (given example data: 11am, 12pm, 1pm, 2pm)
  onlyOnDays: ['2018-12-25'], // array of YYYY-MM-DD date strings of the only days that should be included (given example data: December, 25th 2018)
  exceptForDays: ['2018-03-29'], // array of YYYY-MM-DD date strings of days to exclude from the filtered set regardless of other filters (given example data: March 29th, 2018)
}
```
**Detailed Load Profile Hour**
```js
{
  load: number; // 1
  month: number; // 2
  hourStart: number; // 11
  dayOfWeek: number; // 4
  date: string;  // 2018-03-29
}
```
**Month**
0 indexed starting with January

**Day of Week**
0 indexed starting with Sunday ending with Saturday

**Hour Start**
24 time

**Date**
YYYY-MM-DD string


&copy; [Bellawatt](https://www.bellawatt.com/) 2021


