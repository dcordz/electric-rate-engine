export enum RateElementClassification {
  ENERGY = 'energy',
  DEMAND = 'demand',
  FIXED = 'fixed',
  SURCHARGE = 'surcharge',
};

export enum BillingCategory {
  TAX = 'tax',
  SUPPLY = 'supply',
  DELIVERY = 'delivery',
}

export enum BillingDeterminantsUnits {
  KWH = 'kWh',
  KW = 'kW',
  DAYS = 'days',
  MONTHS = 'months',
  DOLLARS = 'dollars',
}

export enum RateElementTypeEnum {
  EnergyTimeOfUse = 'EnergyTimeOfUse',
  BlockedTiersInDays = 'BlockedTiersInDays',
  BlockedTiersInMonths = 'BlockedTiersInMonths',
  FixedPerDay = 'FixedPerDay',
  FixedPerMonth = 'FixedPerMonth',
  MonthlyDemand = 'MonthlyDemand',
  AnnualDemand = 'AnnualDemand',
  MonthlyEnergy = 'MonthlyEnergy',
  SurchargeAsPercent = 'SurchargeAsPercent',
  HourlyEnergy = 'HourlyEnergy',
  DemandTiersInMonths = 'DemandTiersInMonths',
  DemandTimeOfUse = 'DemandTimeOfUse',
  DemandPerDay = 'DemandPerDay',
}

export const RATE_ELEMENT_SORT_ORDER = {
  [RateElementTypeEnum.FixedPerMonth]: 1,
  [RateElementTypeEnum.FixedPerDay]: 2,
  [RateElementTypeEnum.AnnualDemand]: 3,
  [RateElementTypeEnum.MonthlyDemand]: 4,
  [RateElementTypeEnum.DemandTiersInMonths]: 5,
  [RateElementTypeEnum.DemandTimeOfUse]: 6,
  [RateElementTypeEnum.DemandPerDay]: 7,
  [RateElementTypeEnum.MonthlyEnergy]: 8,
  [RateElementTypeEnum.HourlyEnergy]: 9,
  [RateElementTypeEnum.EnergyTimeOfUse]: 10,
  [RateElementTypeEnum.BlockedTiersInDays]: 100,
  [RateElementTypeEnum.BlockedTiersInMonths]: 100,
  [RateElementTypeEnum.SurchargeAsPercent]: 100,
};

export const RATE_ELEMENT_CLASSIFICATION_BY_RATE_ELEMENT_TYPE = {
  [RateElementTypeEnum.FixedPerMonth]: RateElementClassification.FIXED,
  [RateElementTypeEnum.FixedPerDay]: RateElementClassification.FIXED,
  [RateElementTypeEnum.AnnualDemand]: RateElementClassification.DEMAND,
  [RateElementTypeEnum.MonthlyDemand]: RateElementClassification.DEMAND,
  [RateElementTypeEnum.DemandTiersInMonths]: RateElementClassification.DEMAND,
  [RateElementTypeEnum.DemandTimeOfUse]: RateElementClassification.DEMAND,
  [RateElementTypeEnum.DemandPerDay]: RateElementClassification.DEMAND,
  [RateElementTypeEnum.MonthlyEnergy]: RateElementClassification.ENERGY,
  [RateElementTypeEnum.HourlyEnergy]: RateElementClassification.ENERGY,
  [RateElementTypeEnum.EnergyTimeOfUse]: RateElementClassification.ENERGY,
  [RateElementTypeEnum.BlockedTiersInDays]: RateElementClassification.SURCHARGE,
  [RateElementTypeEnum.BlockedTiersInMonths]: RateElementClassification.SURCHARGE,
  [RateElementTypeEnum.SurchargeAsPercent]: RateElementClassification.SURCHARGE,
}