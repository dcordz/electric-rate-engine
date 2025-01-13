import type { DetailedPriceProfileHour, LoadProfileFilterArgs, PriceProfileOptions } from './types';
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
export default PriceProfile;
