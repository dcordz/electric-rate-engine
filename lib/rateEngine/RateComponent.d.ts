import type { RateComponentArgs } from './types';
declare class RateComponent {
    charge: Array<number>;
    name: string;
    private _billingDeterminants;
    constructor({ charge, name, billingDeterminants }: RateComponentArgs);
    costs(): Array<number>;
    billingDeterminants(): Array<number>;
    typicalMonthlyCost(): number;
    costForMonth(month: number): number;
    typicalBillingDeterminant(): number;
    billingDeterminantsForMonth(month: number): number;
    annualCost(): number;
    rateElementClassification(): import("./types").TRateElementClassification;
}
export default RateComponent;
