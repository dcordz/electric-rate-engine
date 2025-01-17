import { TBillingDeterminantsUnits, TRateElementClassification } from '../types';
declare abstract class BillingDeterminants {
    abstract rateElementType: string;
    abstract rateElementClassification: TRateElementClassification;
    abstract units: TBillingDeterminantsUnits;
    abstract calculate(): Array<number>;
    mean(): number;
    all(): Array<number>;
    map(callback: (arg: number, idx: number) => number): number[];
}
export default BillingDeterminants;
