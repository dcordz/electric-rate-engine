# Bellawatt Electric Rate Engine

## Installation
```
npm install @bellawatt/electric-rate-engine --save
```

## Usage

### RateCalculator

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

**FixedPerDay**
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

**FixedPerMonth**
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
**EnergyTimeOfUse**
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

**BlockedTiersInDays**
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

### LoadProfile

```js
import { LoadProfile } from '@bellawatt/electric-rate-engine';

const loadProfileData = // array of load profile hours

const loadProfile = new LoadProfile(loadProfileData);
```
#### Methods
**Load Profile**
```jsx
loadProfile.filterBy(loadProfileFilter) // new filtered LoadProfile object
loadProfile.sumByMonth() // 12 length array of load sums by month
loadProfile.sum() // load sum (number)
loadProfile.count() // hours in the load profile (will be less than 8760 if filtered) (number)
loadProfile.lengh // alias to count()
loadProfile.average() // average load based on filtered set (if filtered) (number)
loadProfile.expanded() // array of DetailedLoadProfileHour objects
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


&copy; Bellawatt 2020


