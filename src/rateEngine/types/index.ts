import RateElement from '../RateElement';
import LoadProfile from '../LoadProfile';
import BillingDeterminants from '../billingDeterminants/_BillingDeterminants';
import PriceProfile from '../PriceProfile';
import { RateElementClassification, BillingCategory, BillingDeterminantsUnits } from '../constants';

export interface RateInterface {
  name: string;
  title: string;
  rateElements: Array<RateElementInterface>;
}

export interface RateElementInterface {
  id?: string;
  rateElementType: RateElementType;
  rateComponents?: Array<RateComponentInterface>;
  name: string;
  billingCategory?: BillingCategory;
  priceProfile?: Array<number> | PriceProfile;
}

export interface RateElementFilterArgs {
  ids?: Array<string>;
  classifications?: Array<RateElementClassification>;
  billingCategories?: Array<BillingCategory>;
}

export interface RateComponentArgs {
  charge: number | Array<number>;
  name: string;
  billingDeterminants: BillingDeterminants;
}

export type RateComponentInterface = BillingDeterminantFactoryInterface &
  RateElementFilterArgs & {
  charge: number | Array<number>;
  name: string;
};

export interface RateCalculatorInterface {
  name: string;
  utilityName?: string;
  applicability?: string;
  minimumBillAmount?: number;
  rateElements: Array<RateElementInterface>;
  loadProfile: LoadProfile;
}

export interface DetailedPriceProfileHour extends ExpandedDate {
  price: number;
}

export interface PriceProfileOptions {
  year: number;
}

// TODO, change use of `any`
export interface GoalSeekArgs {
  [key: string]: any
};

export interface LoadProfileScalerOptions {
  debug: boolean;
}

export interface LoadProfileFilterArgs {
  months?: Array<number>;
  daysOfWeek?: Array<number>;
  hourStarts?: Array<number>;
  onlyOnDays?: Array<string>;
  exceptForDays?: Array<string>;
  hoursOfYear?: Array<number>;
}

export interface DetailedLoadProfileHour extends ExpandedDate {
  load: number;
}

export interface LoadProfileOptions {
  year: number;
}

export type RateElementType =
  | 'EnergyTimeOfUse'
  | 'BlockedTiersInDays'
  | 'BlockedTiersInMonths'
  | 'FixedPerDay'
  | 'FixedPerMonth'
  | 'MonthlyEnergy'
  | 'MonthlyDemand'
  | 'AnnualDemand'
  | 'SurchargeAsPercent'
  | 'HourlyEnergy'
  | 'DemandTimeOfUse'
  | 'DemandPerDay'
  | 'DemandTiersInMonths';

// TODO: Some things are missing here!
export type BillingDeterminantFactoryInterface =
  | EnergyTimeOfUseArgs
  | BlockedTiersArgs
  | SurchargeAsPercentArgs
  | HourlyEnergyArgs
  | {};

export interface BlockedTiersArgs extends LoadProfileFilterArgs {
  min: Array<number>;
  max: Array<number>;
}

export interface DemandPerDayArgs {
  months: Array<number>;
  daysOfWeek?: Array<number>;
  hourStarts: Array<number>;
  onlyOnDays: Array<string>;
  exceptForDays: Array<string>;
}

export interface DemandTimeOfUseArgs {
  months: Array<number>;
  daysOfWeek?: Array<number>;
  hourStarts: Array<number>;
  onlyOnDays: Array<string>;
  exceptForDays: Array<string>;
}

export interface EnergyTimeOfUseArgs {
  months: Array<number>;
  daysOfWeek?: Array<number>;
  hourStarts: Array<number>;
  onlyOnDays: Array<string>;
  exceptForDays: Array<string>;
}

export interface HourlyEnergyArgs {
  hourOfYear: number;
}

export interface SurchargeAsPercentArgs {
  rateElement: RateElement;
  percent: number;
}

export interface ExpandedDate {
  month: number;
  hourStart: number;
  dayOfWeek: number;
  date: string;
  hourOfYear: number;
};

export interface ValidatorError {
  english: string,
  type: string,
  data: {}, // any non-null value
}

export interface LabeledError {
  label: string
  errors: Array<ValidatorError>
}

export interface MinMaxPair {
  min: number;
  max: number;
}
