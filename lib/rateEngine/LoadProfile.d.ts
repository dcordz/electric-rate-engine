import LoadProfileScaler from './LoadProfileScaler';
import type { DetailedLoadProfileHour, LoadProfileFilterArgs, LoadProfileOptions, LoadProfileScalerOptions } from './types';
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
export default LoadProfile;
