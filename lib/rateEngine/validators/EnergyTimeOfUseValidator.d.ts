import Validator from './_Validator';
import LoadProfileFilter from '../LoadProfileFilter';
import LoadProfile from '../LoadProfile';
import type { RateComponentInterface, EnergyTimeOfUseArgs } from '../types';
declare class EnergyTimeOfUseValidator extends Validator {
    private _args;
    private _year;
    constructor(args: Array<RateComponentInterface & EnergyTimeOfUseArgs>, loadProfile: LoadProfile);
    validate(): this;
    filters(): {
        name: string;
        filter: LoadProfileFilter;
    }[];
}
export default EnergyTimeOfUseValidator;
