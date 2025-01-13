import { BillingDeterminantsUnits, RateElementClassification } from '../constants';
declare abstract class BillingDeterminants {
    abstract rateElementType: string;
    abstract rateElementClassification: RateElementClassification;
    abstract units: BillingDeterminantsUnits;
    abstract calculate(): Array<number>;
    mean(): number;
    all(): Array<number>;
    map(callback: (arg: number, idx: number) => number): number[];
}
export default BillingDeterminants;
