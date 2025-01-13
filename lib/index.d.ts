import { Params } from 'goal-seek';

declare enum RateElementClassification {
    ENERGY = "energy",
    DEMAND = "demand",
    FIXED = "fixed",
    SURCHARGE = "surcharge"
}
declare enum BillingCategory {
    TAX = "tax",
    SUPPLY = "supply",
    DELIVERY = "delivery"
}
declare enum BillingDeterminantsUnits {
    KWH = "kWh",
    KW = "kW",
    DAYS = "days",
    MONTHS = "months",
    DOLLARS = "dollars"
}
declare enum ERateElementType {
    EnergyTimeOfUse = "EnergyTimeOfUse",
    BlockedTiersInDays = "BlockedTiersInDays",
    BlockedTiersInMonths = "BlockedTiersInMonths",
    FixedPerDay = "FixedPerDay",
    FixedPerMonth = "FixedPerMonth",
    MonthlyDemand = "MonthlyDemand",
    AnnualDemand = "AnnualDemand",
    MonthlyEnergy = "MonthlyEnergy",
    SurchargeAsPercent = "SurchargeAsPercent",
    HourlyEnergy = "HourlyEnergy",
    DemandTiersInMonths = "DemandTiersInMonths",
    DemandTimeOfUse = "DemandTimeOfUse",
    DemandPerDay = "DemandPerDay"
}
declare const RATE_ELEMENT_SORT_ORDER: {
    FixedPerMonth: number;
    FixedPerDay: number;
    AnnualDemand: number;
    MonthlyDemand: number;
    DemandTiersInMonths: number;
    DemandTimeOfUse: number;
    DemandPerDay: number;
    MonthlyEnergy: number;
    HourlyEnergy: number;
    EnergyTimeOfUse: number;
    BlockedTiersInDays: number;
    BlockedTiersInMonths: number;
    SurchargeAsPercent: number;
};
declare const RATE_ELEMENT_CLASSIFICATION_BY_RATE_ELEMENT_TYPE: {
    FixedPerMonth: RateElementClassification;
    FixedPerDay: RateElementClassification;
    AnnualDemand: RateElementClassification;
    MonthlyDemand: RateElementClassification;
    DemandTiersInMonths: RateElementClassification;
    DemandTimeOfUse: RateElementClassification;
    DemandPerDay: RateElementClassification;
    MonthlyEnergy: RateElementClassification;
    HourlyEnergy: RateElementClassification;
    EnergyTimeOfUse: RateElementClassification;
    BlockedTiersInDays: RateElementClassification;
    BlockedTiersInMonths: RateElementClassification;
    SurchargeAsPercent: RateElementClassification;
};

declare abstract class BillingDeterminants {
    abstract rateElementType: ERateElementType;
    abstract rateElementClassification: RateElementClassification;
    abstract units: BillingDeterminantsUnits;
    abstract calculate(): Array<number>;
    mean(): number;
    all(): Array<number>;
    map(callback: (arg: number, idx: number) => number): number[];
    format(): string;
}

declare class LoadProfileScaler {
    loadProfile: LoadProfile;
    debug: boolean;
    constructor(loadProfile: LoadProfile, { debug }?: LoadProfileScalerOptions);
    to(scaler: number): LoadProfile;
    toTotalKwh(totalKwh: number): LoadProfile;
    toAverageMonthlyBill(amount: number, rate: RateInterface, goalSeekParams?: GoalSeekArgs): LoadProfile;
    toMonthlyKwh(monthlyKwh: Array<number>): LoadProfile;
    private scaledMonthlyCost;
}

declare class LoadProfile {
    private _expanded;
    private _year;
    constructor(loadProfile: Array<number>, options: LoadProfileOptions);
    constructor(existingLoadProfile: LoadProfile | Array<number>, options: LoadProfileOptions);
    constructor(expandedLoadProfile: Array<DetailedLoadProfileHour>, options: LoadProfileOptions);
    expanded(): Array<DetailedLoadProfileHour>;
    loadValues(): Array<number>;
    filterBy(filters: LoadProfileFilterArgs): LoadProfile;
    loadShift(amount: number, filters: LoadProfileFilterArgs): LoadProfile;
    sumByMonth(): Array<number>;
    maxByMonth(): Array<number>;
    byMonth(): Array<Array<number>>;
    sum(): number;
    count(): number;
    get length(): number;
    get year(): number;
    average(): number;
    max(): number;
    loadFactor(): number;
    scale(options?: LoadProfileScalerOptions): LoadProfileScaler;
    aggregate(otherLoadProfile: LoadProfile): LoadProfile;
    private _buildFromNumberArray;
}

declare class PriceProfile {
    private _expanded;
    private _year;
    constructor(loadProfile: Array<number>, options: PriceProfileOptions);
    constructor(existingPriceProfile: PriceProfile | Array<number>, options: PriceProfileOptions);
    constructor(expandedPriceProfile: Array<DetailedPriceProfileHour>, options: PriceProfileOptions);
    expanded(): Array<DetailedPriceProfileHour>;
    priceValues(): Array<number>;
    filterBy(filters: LoadProfileFilterArgs): PriceProfile;
    maxByMonth(): Array<number>;
    sum(): number;
    count(): number;
    get length(): number;
    get year(): number;
    average(): number;
    max(): number;
    _buildFromNumberArray(priceProfile: Array<number>): {
        month: number;
        hourStart: number;
        dayOfWeek: number;
        date: string;
        hourOfYear: number;
        price: number;
    }[];
}

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
interface RateCalculatorInterface {
    name: string;
    utilityName?: string;
    applicability?: string;
    minimumBillAmount?: number;
    rateElements: Array<RateElementInterface>;
    loadProfile: LoadProfile;
}
interface RateInterface {
    name: string;
    title: string;
    rateElements: Array<RateElementInterface>;
}
interface BaseRateElementInterface {
    id?: string;
    name: string;
    billingCategory?: BillingCategory;
}
interface BaseRateComponentInterface {
    charge: number | Array<number>;
    name: string;
}
type BaseRateElementType = AnnualDemandRateElementInterface | BlockedTiersInDaysRateElementInterface | BlockedTiersInMonthsRateElementInterface | DemandPerDayRateElementInterface | DemandTiersInMonthsRateElementInterface | DemandTimeOfUseRateElementInterface | EnergyTimeOfUseRateElementInterface | FixedPerDayRateElementInterface | FixedPerMonthRateElementInterface | HourlyEnergyRateElementInterface | MonthlyDemandRateElementInterface | MonthlyEnergyRateElementInterface;
type RateElementInterface = BaseRateElementType | UnprocessedSurchargeAsPercentRateElementInterface;
type ProcessedRateElementInterface = BaseRateElementType | ProcessedSurchargeAsPercentRateElementInterface;
type RateComponentInterface = RateElementInterface['rateComponents'][number];
type RateElementType = RateElementInterface['rateElementType'];
interface EnergyTimeOfUseRateElementInterface extends BaseRateElementInterface {
    rateElementType: ERateElementType.EnergyTimeOfUse;
    rateComponents: Array<BaseRateComponentInterface & EnergyTimeOfUseArgs>;
}
interface BlockedTiersInDaysRateElementInterface extends BaseRateElementInterface {
    rateElementType: ERateElementType.BlockedTiersInDays;
    rateComponents: Array<BaseRateComponentInterface & BlockedTiersArgs>;
}
interface BlockedTiersInMonthsRateElementInterface extends BaseRateElementInterface {
    rateElementType: ERateElementType.BlockedTiersInMonths;
    rateComponents: Array<BaseRateComponentInterface & BlockedTiersArgs>;
}
interface FixedPerDayRateElementInterface extends BaseRateElementInterface {
    rateElementType: ERateElementType.FixedPerDay;
    rateComponents: Array<BaseRateComponentInterface>;
}
interface FixedPerMonthRateElementInterface extends BaseRateElementInterface {
    rateElementType: ERateElementType.FixedPerMonth;
    rateComponents: Array<BaseRateComponentInterface>;
}
interface MonthlyDemandRateElementInterface extends BaseRateElementInterface {
    rateElementType: ERateElementType.MonthlyDemand;
    rateComponents: Array<BaseRateComponentInterface>;
}
interface AnnualDemandRateElementInterface extends BaseRateElementInterface {
    rateElementType: ERateElementType.AnnualDemand;
    rateComponents: Array<BaseRateComponentInterface>;
}
interface MonthlyEnergyRateElementInterface extends BaseRateElementInterface {
    rateElementType: ERateElementType.MonthlyEnergy;
    rateComponents: Array<BaseRateComponentInterface>;
}
interface UnprocessedSurchargeAsPercentRateElementInterface extends BaseRateElementInterface {
    rateElementType: ERateElementType.SurchargeAsPercent;
    rateComponents: Array<BaseRateComponentInterface & RateElementFilterArgs>;
}
interface ProcessedSurchargeAsPercentRateElementInterface extends BaseRateElementInterface {
    rateElementType: ERateElementType.SurchargeAsPercent;
    rateComponents: Array<BaseRateComponentInterface & SurchargeAsPercentArgs>;
}
interface HourlyEnergyRateElementInterface extends BaseRateElementInterface {
    rateElementType: ERateElementType.HourlyEnergy;
    priceProfile: Array<number> | PriceProfile;
    rateComponents: Array<BaseRateComponentInterface & HourlyEnergyArgs>;
}
interface DemandTiersInMonthsRateElementInterface extends BaseRateElementInterface {
    rateElementType: ERateElementType.DemandTiersInMonths;
    rateComponents: Array<BaseRateComponentInterface & BlockedTiersArgs>;
}
interface DemandTimeOfUseRateElementInterface extends BaseRateElementInterface {
    rateElementType: ERateElementType.DemandTimeOfUse;
    rateComponents: Array<BaseRateComponentInterface & DemandTimeOfUseArgs>;
}
interface DemandPerDayRateElementInterface extends BaseRateElementInterface {
    rateElementType: ERateElementType.DemandPerDay;
    rateComponents: Array<BaseRateComponentInterface & DemandPerDayArgs>;
}
interface RateComponentArgs {
    charge: number | Array<number>;
    name: string;
    billingDeterminants: BillingDeterminants;
}
interface DetailedPriceProfileHour extends ExpandedDate {
    price: number;
}
interface PriceProfileOptions {
    year: number;
}
type GoalSeekArgs = Partial<Params>;
interface LoadProfileScalerOptions {
    debug: boolean;
}
interface LoadProfileFilterArgs {
    months?: Array<number>;
    daysOfWeek?: Array<number>;
    hourStarts?: Array<number>;
    onlyOnDays?: Array<string>;
    exceptForDays?: Array<string>;
    hoursOfYear?: Array<number>;
}
interface DetailedLoadProfileHour extends ExpandedDate {
    load: number;
}
interface LoadProfileOptions {
    year: number;
}
interface BlockedTiersArgs extends LoadProfileFilterArgs {
    min: Array<number | 'Infinity'>;
    max: Array<number | 'Infinity'>;
}
type DemandPerDayArgs = LoadProfileFilterArgs;
type DemandTimeOfUseArgs = LoadProfileFilterArgs;
type EnergyTimeOfUseArgs = LoadProfileFilterArgs;
interface HourlyEnergyArgs {
    hourOfYear: number;
}
interface SurchargeAsPercentArgs {
    rateElement: RateElement;
}
interface ExpandedDate {
    month: number;
    hourStart: number;
    dayOfWeek: number;
    date: string;
    hourOfYear: number;
}
interface ValidatorError {
    english: string;
    type: string;
    data: Record<string, unknown>;
}
interface LabeledError {
    label: string;
    errors: Array<ValidatorError>;
}
interface MinMaxPair {
    min: number;
    max: number;
}
interface RateElementFilterArgs {
    ids?: Array<string>;
    classifications?: Array<RateElementClassification>;
    billingCategories?: Array<BillingCategory>;
}

declare class RateComponent {
    charge: Array<number>;
    name: string;
    private _billingDeterminants;
    private _classification;
    constructor({ charge, name, billingDeterminants }: RateComponentArgs);
    costs(): Array<number>;
    getDeterminants(): BillingDeterminants;
    billingDeterminants(): Array<number>;
    typicalMonthlyCost(): number;
    costForMonth(month: number): number;
    typicalBillingDeterminant(): number;
    billingDeterminantsForMonth(month: number): number;
    annualCost(): number;
    rateElementClassification(): RateElementClassification;
    formatCharge(): string;
}

declare class RateElement {
    private _rateComponents;
    id?: string;
    name: string;
    type: RateElementType;
    classification: RateElementClassification;
    billingCategory?: BillingCategory;
    errors: Array<ValidatorError>;
    constructor(rateElementArgs: RateElementInterface, loadProfile: LoadProfile, otherRateElements?: Array<RateElementInterface>);
    rateComponents(): Array<RateComponent>;
    annualCost(): number;
    costs(): Array<number>;
    matches({ billingCategories, classifications, ids }: RateElementFilterArgs): boolean;
}

declare class RateCalculator {
    private _rateElements;
    name: string | undefined;
    utilityName: string | undefined;
    applicability: string | undefined;
    minimumBillAmount: number | undefined;
    static shouldValidate: boolean;
    static shouldLogValidationErrors: boolean;
    constructor({ name, utilityName, applicability, minimumBillAmount, rateElements, loadProfile, }: RateCalculatorInterface);
    rateElements({ ...filters }?: RateElementFilterArgs): Array<RateElement>;
    annualCost({ ...filters }?: RateElementFilterArgs): number;
}

declare const RateEngineVersion = "2.0.1";

export { type AnnualDemandRateElementInterface, BillingCategory, BillingDeterminantsUnits, type BlockedTiersArgs, type BlockedTiersInDaysRateElementInterface, type BlockedTiersInMonthsRateElementInterface, type DemandPerDayArgs, type DemandPerDayRateElementInterface, type DemandTiersInMonthsRateElementInterface, type DemandTimeOfUseArgs, type DemandTimeOfUseRateElementInterface, type DetailedLoadProfileHour, type DetailedPriceProfileHour, ERateElementType, type EnergyTimeOfUseArgs, type EnergyTimeOfUseRateElementInterface, type ExpandedDate, type FixedPerDayRateElementInterface, type FixedPerMonthRateElementInterface, type GoalSeekArgs, type HourlyEnergyArgs, type HourlyEnergyRateElementInterface, type LabeledError, LoadProfile, type LoadProfileFilterArgs, type LoadProfileOptions, type LoadProfileScalerOptions, type MinMaxPair, type MonthlyDemandRateElementInterface, type MonthlyEnergyRateElementInterface, type PriceProfileOptions, type ProcessedRateElementInterface, type ProcessedSurchargeAsPercentRateElementInterface, RATE_ELEMENT_CLASSIFICATION_BY_RATE_ELEMENT_TYPE, RATE_ELEMENT_SORT_ORDER, RateCalculator, type RateCalculatorInterface, RateComponent, type RateComponentArgs, type RateComponentInterface, RateElement, RateElementClassification, type RateElementFilterArgs, type RateElementInterface, type RateElementType, RateEngineVersion, type RateInterface, type SurchargeAsPercentArgs, type UnprocessedSurchargeAsPercentRateElementInterface, type ValidatorError };
