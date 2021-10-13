# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
