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

export enum ERateElementType {
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

export const RATE_ELEMENT_CLASSIFICATION_BY_RATE_ELEMENT_TYPE = {
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
}