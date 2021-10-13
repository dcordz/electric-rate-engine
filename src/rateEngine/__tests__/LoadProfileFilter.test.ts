import LoadProfileFilter, { LoadProfileFilterArgs } from '../LoadProfileFilter';
import { ExpandedDate } from '../utils/expandedDates';
// this.months
// this.daysOfWeek
// this.hourStarts
// this.onlyOnDays
// this.exceptForDays

// empty values too!

const baseFilter: LoadProfileFilterArgs = {
  months: [],
  daysOfWeek: [],
  hourStarts: [],
  onlyOnDays: [],
  exceptForDays: [],
};

const expandedDate = {
  month: 3,
  date: '2019-03-15',
  hourStart: 3,
  dayOfWeek: 5,
  hourOfYear: 0,
} as ExpandedDate;

describe('LoadProfileFilter', () => {
  describe('matches', () => {
    describe('months', () => {
      const filter = new LoadProfileFilter({ ...baseFilter, months: [0] });
      it('matches a matching date', () => {
        expect(filter.matches({ ...expandedDate, month: 0 })).toBe(true);
      });
      it('does not match a non-matching date', () => {
        expect(filter.matches(expandedDate)).toBe(false);
      });
    });

    describe('daysOfWeek', () => {});
    describe('compound matches', () => {});
  });
});
