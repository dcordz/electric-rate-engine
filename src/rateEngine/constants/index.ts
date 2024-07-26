export enum RateElementClassification {
  ENERGY = 'energy',
  DEMAND = 'demand',
  FIXED = 'fixed',
  SURCHARGE = 'surcharge',
};

// Since the billing category is passed into a RateCalculator as part of the
// arguments, this enum exists for documentation rather than actual type safety.
// Once this compiles to JS, nothing will prevent an application from passing in
// an abitrary string for the billingCategory.
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
