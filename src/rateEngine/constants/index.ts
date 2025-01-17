export const RateElementClassification = {
  ENERGY: 'energy',
  DEMAND: 'demand',
  FIXED: 'fixed',
  SURCHARGE: 'surcharge',
} as const;

export const BillingCategory = {
  TAX: 'tax',
  SUPPLY: 'supply',
  DELIVERY: 'delivery',
} as const;

export const BillingDeterminantsUnits = {
  KWH: 'kWh',
  KW: 'kW',
  DAYS: 'days',
  MONTHS: 'months',
  DOLLARS: 'dollars',
} as const;
