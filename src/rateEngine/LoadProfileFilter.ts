import { ExpandedDate } from './utils/expandedDates';

export interface LoadProfileFilterArgs {
  months?: Array<number>;
  daysOfWeek?: Array<number>;
  hourStarts?: Array<number>;
  onlyOnDays?: Array<string>;
  exceptForDays?: Array<string>;
}

class LoadProfileFilter {
  months?: Array<number>;
  daysOfWeek?: Array<number>;
  hourStarts?: Array<number>;
  onlyOnDays?: Array<string>;
  exceptForDays?: Array<string>;

  constructor(filters: LoadProfileFilterArgs) {
    this.months = this.sanitize(filters.months);
    this.daysOfWeek = this.sanitize(filters.daysOfWeek);
    this.hourStarts = this.sanitize(filters.hourStarts);
    this.onlyOnDays = this.sanitize(filters.onlyOnDays);
    this.exceptForDays = this.sanitize(filters.exceptForDays);
  }

  matches({ month, date, dayOfWeek, hourStart }: ExpandedDate): boolean {
    return (
      (this.exceptForDays ? !this.exceptForDays.includes(date) : true) &&
      (this.onlyOnDays ? this.onlyOnDays.includes(date) : true) &&
      (this.months ? this.months.includes(month) : true) &&
      (this.daysOfWeek ? this.daysOfWeek.includes(dayOfWeek) : true) &&
      (this.hourStarts ? this.hourStarts.includes(hourStart) : true)
    );
  }

  private sanitize(arg) {
    if (arg && arg.length === 0) {
      return undefined;
    }

    return arg;
  }
}

export default LoadProfileFilter;
