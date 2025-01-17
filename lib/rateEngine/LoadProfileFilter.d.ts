import type { LoadProfileFilterArgs, ExpandedDate } from './types';
declare class LoadProfileFilter {
    months?: Array<number>;
    daysOfWeek?: Array<number>;
    hourStarts?: Array<number>;
    onlyOnDays?: Array<string>;
    exceptForDays?: Array<string>;
    hoursOfYear?: Array<number>;
    constructor(filters: LoadProfileFilterArgs);
    matches({ month, date, dayOfWeek, hourStart, hourOfYear }: ExpandedDate): boolean;
    private sanitize;
}
export default LoadProfileFilter;
