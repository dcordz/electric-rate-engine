import BillingDeterminants from './_BillingDeterminants';
import LoadProfile from '../LoadProfile';
import { BillingDeterminantsUnits, RateElementClassification } from '../constants';
declare class MonthlyEnergy extends BillingDeterminants {
    private _loadProfile;
    rateElementType: string;
    rateElementClassification: RateElementClassification;
    units: BillingDeterminantsUnits;
    constructor(loadProfile: LoadProfile);
    calculate(): Array<number>;
}
export default MonthlyEnergy;
