# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.1] - 2024-01-21

* Build for CommonJS so that package works correctly in Node.js environments (like vitest)

## [2.0.0] - 2024-01-10

* Clean up typing (@dankuck)
* Reduce bundle size, add strict type checking (@dcordz)
* Swap out moment.js for dayjs (@dcordz)

## [1.11.1] - 2021-12-22

* Ran `npm publish` without `npm build` first

## [1.11.0] - 2021-12-22

* Add 'MonthlyDemand' billing determinant

## [1.10.0] - 2021-11-18

* Added `DemandPerDay` rate elements for rates which specify a monthly price for the sum of daily demand
* Fixed an issue for leap years with rate elements relying on the number of days per month

## [1.9.0] - 2021-11-05

* Add `DemandTiersInMonths` and `DemandTimeOfUse` rate elements to the billing determinants factory.

## [1.8.0] - 2021-11-02

* Allow users to define hourly price data as a plain data array in a rate data structure 

## [1.7.1] - 2021-11-01

* Increase the magnitude of the max step used by goal-seek when scaling a load profile to a monthly bill. When the `maxStep` has a lower order of magnitude that the goal, the algorithm can struggle to converge.

## [1.7.0] - 2021-10-29

* Improves the scale-to-a-monthly-bill functionality for load profiles. Before only values in the 100s of dollars would reliably converge. With these changes, arbitrarily large bill amounts should scale as well.
* Adds a debugging option for the load profile scaler.
* Allows passing goal seek parameters to the `toAverageMonthlyBill` method

## [1.6.0] - 2021-10-29

* Add `billingCategory` metadata field for rate elements
* Add a `SurchargeAsPercent` billing determinant type
* Add optional rate element filter arguments for the `RateCalculator` `annualCost` and `rateElements` methods
* Add an `HourlyEnergy` billing determinant type
* Add a tiered demand charge billing deteminant as `DemandTiersInMonths`

## [1.5.0] - 2021-10-13

The changelog is missing a few versions, but since 1.4.2, 1.5.0 adds

* Adds a `toMonthlyKwh` method for the `LoadProfileScaler` that scales to a load on a month by month basis.
* Updates the validation for Blocked Tiers to accommodate time of use tiers that filter by time periods.
* Adds a `DemandTimeOfUse` rate component which calculates the max demand (kW) per month for a given set of time period filters. For example, a rate might have a demand charge (what is the largest capacity you as a customer require?) that is different in the summer or the winter.
* Adds tests for the `EnergyTimeOfUse` rate component

## [1.1.0] - 2021-01-04

* Adds some additional validation options and data to better show what parts of a rate failed validation
* Internal changes how we handle empty array filters to better match user's intent
* A few small refactors to better enable third party packages to hook into rate engine internals

## [1.0.0] - 2020-12-31

Initial release!
