import BillingDeterminants from './_BillingDeterminants';
import LoadProfile from '../LoadProfile';
import { BillingDeterminantsUnits, RateElementClassification } from '../constants';
import type { HourlyEnergyArgs } from '../types';
declare class HourlyEnergy extends BillingDeterminants {
    private _load;
    private _hourOfYear;
    private _year;
    rateElementType: string;
    rateElementClassification: RateElementClassification;
    units: BillingDeterminantsUnits;
    constructor({ hourOfYear }: HourlyEnergyArgs, loadProfile: LoadProfile);
    calculate(): Array<number>;
}
export default HourlyEnergy;
