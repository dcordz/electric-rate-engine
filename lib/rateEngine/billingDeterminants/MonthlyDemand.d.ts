import BillingDeterminants from './_BillingDeterminants';
import LoadProfile from '../LoadProfile';
import { RateElementClassification, BillingDeterminantsUnits } from '../constants';
declare class MonthlyDemand extends BillingDeterminants {
    private _loadProfile;
    rateElementType: string;
    rateElementClassification: RateElementClassification;
    units: BillingDeterminantsUnits;
    constructor(loadProfile: LoadProfile);
    calculate(): Array<number>;
}
export default MonthlyDemand;
