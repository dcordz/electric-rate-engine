import Validator from './_Validator';
import LoadProfileFilter from '../LoadProfileFilter';
import LoadProfile from '../LoadProfile';
import type { MinMaxPair, BlockedTiersArgs } from '../types';
declare class BlockedTiersValidator extends Validator {
    private _args;
    private _localErrors;
    private _year;
    constructor(args: Array<BlockedTiersArgs>, loadProfile: LoadProfile);
    validate(): this;
    filters(): {
        min: number[];
        max: number[];
        filter: LoadProfileFilter;
    }[];
    validateExpandedDates(): void;
    protected validateBasics(): void;
    protected getSortedPairs(minsAndMaxes: Array<{
        min: Array<number>;
        max: Array<number>;
    }>): Array<Array<MinMaxPair>>;
    protected validateOverlap(minsAndMaxes: Array<{
        min: Array<number>;
        max: Array<number>;
    }>): void;
    protected validateRange(minsAndMaxes: Array<{
        min: Array<number>;
        max: Array<number>;
    }>): void;
}
export default BlockedTiersValidator;
