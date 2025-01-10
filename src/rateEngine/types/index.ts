import { Params as GoalSeekParams } from 'goal-seek';
import LoadProfile from '../LoadProfile';
import PriceProfile from '../PriceProfile';
import RateElement from '../RateElement';
import BillingDeterminants from '../billingDeterminants/_BillingDeterminants';
import { BillingCategory, ERateElementType, RateElementClassification } from '../constants';

/**
 * Here's an example rate definition, with the types of the
 * elements shown on the right
 *
 * {                                                                     : RateInterface
 *   "name": "E-1",                                                      : string
 *   "title": "Residential Services",                                    : string
 *   "rateElements": [                                                   :
 *     {                                                                 : RateElementInterface
 *       "rateElementType": "FixedPerDay",                               : RateElementType
 *       "name": "Delivery Charge",                                      : string
 *       "rateComponents": [                                             :
 *         {                                                             : RateComponentInterface
 *           "name": "Delivery Charge",                                  : string
 *           "charge": 0.39167                                           : number | number[]
 *         }                                                             :
 *       ]                                                               :
 *     },                                                                :
 *     {                                                                 : RateElementInterface
 *       "rateElementType": "FixedPerMonth",                             : RateElementType
 *       "name": "California Clean Climate Credit",                      : string
 *       "rateComponents": [                                             :
 *         {                                                             :
 *           "name": "California Clean Climate Credit",                  : string
 *           "charge": [0, 0, 0, -38.39, 0, 0, 0, 0, 0, -38.39, 0, 0]    : number | number[]
 *         }                                                             :
 *       ]                                                               :
 *     }                                                                 :
 *   ]                                                                   :
 * }                                                                     :
 */

export interface RateCalculatorInterface {
  name: string;
  utilityName?: string;
  applicability?: string;
  minimumBillAmount?: number;
  rateElements: Array<RateElementInterface>;
  loadProfile: LoadProfile;
}

export interface RateInterface {
  name: string;
  title: string;
  rateElements: Array<RateElementInterface>;
}

interface BaseRateElementInterface {
  id?: string;
  name: string;
  billingCategory?: BillingCategory;
};

interface BaseRateComponentInterface {
  charge: number | Array<number>;
  name: string;
};

type BaseRateElementType =
    | AnnualDemandRateElementInterface
    | BlockedTiersInDaysRateElementInterface
    | BlockedTiersInMonthsRateElementInterface
    | DemandPerDayRateElementInterface
    | DemandTiersInMonthsRateElementInterface
    | DemandTimeOfUseRateElementInterface
    | EnergyTimeOfUseRateElementInterface
    | FixedPerDayRateElementInterface
    | FixedPerMonthRateElementInterface
    | HourlyEnergyRateElementInterface
    | MonthlyDemandRateElementInterface
    | MonthlyEnergyRateElementInterface;

export type RateElementInterface = 
    | BaseRateElementType
    | UnprocessedSurchargeAsPercentRateElementInterface;

export type ProcessedRateElementInterface = 
    | BaseRateElementType
    | ProcessedSurchargeAsPercentRateElementInterface;

export type RateComponentInterface = RateElementInterface['rateComponents'][number];

export type RateElementType = RateElementInterface['rateElementType'];

export interface EnergyTimeOfUseRateElementInterface extends BaseRateElementInterface {
  rateElementType: ERateElementType.EnergyTimeOfUse;
  rateComponents: Array<BaseRateComponentInterface & EnergyTimeOfUseArgs>;
};

export interface BlockedTiersInDaysRateElementInterface extends BaseRateElementInterface {
  rateElementType: ERateElementType.BlockedTiersInDays;
  rateComponents: Array<BaseRateComponentInterface & BlockedTiersArgs>;
};

export interface BlockedTiersInMonthsRateElementInterface extends BaseRateElementInterface {
  rateElementType: ERateElementType.BlockedTiersInMonths;
  rateComponents: Array<BaseRateComponentInterface & BlockedTiersArgs>;
};

export interface FixedPerDayRateElementInterface extends BaseRateElementInterface {
  rateElementType: ERateElementType.FixedPerDay;
  rateComponents: Array<BaseRateComponentInterface>;
};

export interface FixedPerMonthRateElementInterface extends BaseRateElementInterface {
  rateElementType: ERateElementType.FixedPerMonth;
  rateComponents: Array<BaseRateComponentInterface>;
};

export interface MonthlyDemandRateElementInterface extends BaseRateElementInterface {
  rateElementType: ERateElementType.MonthlyDemand;
  rateComponents: Array<BaseRateComponentInterface>;
};

export interface AnnualDemandRateElementInterface extends BaseRateElementInterface {
  rateElementType: ERateElementType.AnnualDemand;
  rateComponents: Array<BaseRateComponentInterface>;
};

export interface MonthlyEnergyRateElementInterface extends BaseRateElementInterface {
  rateElementType: ERateElementType.MonthlyEnergy;
  rateComponents: Array<BaseRateComponentInterface>;
};

// The interface that the user uses to definte the rate
export interface UnprocessedSurchargeAsPercentRateElementInterface extends BaseRateElementInterface {
  rateElementType: ERateElementType.SurchargeAsPercent;
  rateComponents: Array<BaseRateComponentInterface & RateElementFilterArgs>;
}

// The rate element interface that's used after processing
export interface ProcessedSurchargeAsPercentRateElementInterface extends BaseRateElementInterface {
  rateElementType: ERateElementType.SurchargeAsPercent;
  rateComponents: Array<BaseRateComponentInterface & SurchargeAsPercentArgs>;
}

export interface HourlyEnergyRateElementInterface extends BaseRateElementInterface {
  rateElementType: ERateElementType.HourlyEnergy;
  priceProfile: Array<number> | PriceProfile;
  rateComponents: Array<BaseRateComponentInterface & HourlyEnergyArgs>,
};

export interface DemandTiersInMonthsRateElementInterface extends BaseRateElementInterface {
  rateElementType: ERateElementType.DemandTiersInMonths;
  rateComponents: Array<BaseRateComponentInterface & BlockedTiersArgs>;
};

export interface DemandTimeOfUseRateElementInterface extends BaseRateElementInterface {
  rateElementType: ERateElementType.DemandTimeOfUse;
  rateComponents: Array<BaseRateComponentInterface & DemandTimeOfUseArgs>;
};

export interface DemandPerDayRateElementInterface extends BaseRateElementInterface {
  rateElementType: ERateElementType.DemandPerDay;
  rateComponents: Array<BaseRateComponentInterface & DemandPerDayArgs>;
};


export interface RateComponentArgs {
  charge: number | Array<number>;
  name: string;
  billingDeterminants: BillingDeterminants;
}

export interface DetailedPriceProfileHour extends ExpandedDate {
  price: number;
}

export interface PriceProfileOptions {
  year: number;
}

export type GoalSeekArgs = Partial<GoalSeekParams>;

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

export interface BlockedTiersArgs extends LoadProfileFilterArgs {
  min: Array<number | 'Infinity'>;
  max: Array<number | 'Infinity'>;
}

export type DemandPerDayArgs = LoadProfileFilterArgs;
export type DemandTimeOfUseArgs = LoadProfileFilterArgs;
export type EnergyTimeOfUseArgs = LoadProfileFilterArgs;

export interface HourlyEnergyArgs {
  hourOfYear: number;
}

export interface SurchargeAsPercentArgs {
  rateElement: RateElement;
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
  data: Record<string, unknown>,
}

export interface LabeledError {
  label: string
  errors: Array<ValidatorError>
}

export interface MinMaxPair {
  min: number;
  max: number;
}

export interface RateElementFilterArgs {
  ids?: Array<string>;
  classifications?: Array<RateElementClassification>;
  billingCategories?: Array<BillingCategory>;
}
