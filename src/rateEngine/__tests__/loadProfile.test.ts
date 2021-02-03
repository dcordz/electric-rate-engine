import LoadProfile from '../LoadProfile';
import times from 'lodash/times';
import LoadProfileScaler from '../LoadProfileScaler';

const getLoadProfileOfOnes = () => times(8760, () => 1);
const options = {year: 2018};

describe('Load Profile', () => {
  let loadProfile;

  beforeEach(() => {
    loadProfile = new LoadProfile(getLoadProfileOfOnes(), options);
  });

  describe('instantiation', () => {
    it('can be instantiated with another load profile', () => {
      const newLoadProfile = new LoadProfile(loadProfile, options);
      const expanded = newLoadProfile.expanded();

      expect(expanded[0]).toEqual({
        load: 1,
        month: 0,
        dayOfWeek: 1,
        hourOfYear: 0,
        hourStart: 0,
        date: '2018-01-01',
      });
    });
  });

  describe('expanded', () => {
    it('creates an expanded load profile', () => {
      const expanded = loadProfile.expanded();

      expect(expanded[0]).toEqual({
        load: 1,
        month: 0,
        dayOfWeek: 1,
        hourOfYear: 0,
        hourStart: 0,
        date: '2018-01-01',
      });
    })
  });

  describe('filterBy', () => {
    it('filters by month', () => {
      const filteredByMonth = loadProfile.filterBy({months: [0]});

      expect(filteredByMonth.expanded()).toHaveLength(31 * 24);
      expect(filteredByMonth.expanded().every(({month}) => month === 0)).toBe(true);
    });
  });

  describe('sum', () => {
    it('sums the load profile values', () => {
      expect(loadProfile.sum()).toEqual(8760);
      expect(loadProfile.filterBy({months: [0]}).sum()).toEqual(31 * 24);
    });
  });

  describe('leap year', () => {
    it('handles leap year load profiles', () => {
      const leapYearLoadProfile = new LoadProfile(times(8784, () => 1), {year: 2020});

      expect(leapYearLoadProfile.sum()).toEqual(8784);
      expect(leapYearLoadProfile.filterBy({months: [1]}).sum()).toEqual(29 * 24);
    });

    it('raises an error when the data and the expected year hours dont match up', () => {
      const leapYearNotEnoughLoad = new LoadProfile(getLoadProfileOfOnes(), {year: 2020});
      const leapLoadNotYear = new LoadProfile(times(8784, () => 1), {year: 2019});

      expect(() => leapYearNotEnoughLoad.expanded()).toThrow('Load profile length didn\'t match annual hours length. Maybe a leap year is involved?');
      expect(() => leapLoadNotYear.expanded()).toThrow('Load profile length didn\'t match annual hours length. Maybe a leap year is involved?');
    });
  });

  describe('count', () => {
    it('returns the count', () => {
      expect(loadProfile.count()).toEqual(8760);
      expect(loadProfile.filterBy({months: [0]}).count()).toEqual(31 * 24);
    });

    it('allows a length property too', () => {
      expect(loadProfile.length).toEqual(8760);
    });
  });

  describe('average', () => {
    it('calculates the average load', () => {
      expect(loadProfile.average()).toEqual(1);
    });
  });

  describe('max', () => {
    it('returns the max load', () => {
      const maxLoadData = getLoadProfileOfOnes();
      maxLoadData[83] = 4; // set some arbitrary element to somethign bigger than a 1
      loadProfile = new LoadProfile(maxLoadData, options);

      expect(loadProfile.max()).toEqual(4);
    });

    it('works empty', () => {
      loadProfile = new LoadProfile([], {year: 2018});

      expect(loadProfile.max()).toEqual(0);
    });
  });

  describe('loadFactor', () => {
    it('returns one from our load profile of ones', () => {
      expect(loadProfile.loadFactor()).toEqual(1);
    });

    it('returns nearly 0 for a load profile with just one 1', () => {
      loadProfile = new LoadProfile([1, ...times(8759, () => 0)], options);
      expect(loadProfile.loadFactor()).toBeCloseTo(0);
    });

    it('returns .5 for a half and half load profile', () => {
      loadProfile = new LoadProfile([...times(4380, () => 10), ...times(4380, () => 0)], options);
      expect(loadProfile.loadFactor()).toEqual(.5);
    });

    it('works empty', () => {
      loadProfile = new LoadProfile([], {year: 2018});

      expect(loadProfile.loadFactor()).toEqual(0);
    });
  });

  describe('scale', () => {
    it('returns a LoadProfileScaler instance', () => {
      expect(loadProfile.scale()).toEqual(
        new LoadProfileScaler(loadProfile)
      );
    });
  });

  describe('aggregate', () => {
    it('sums the load profiles by indexes', () => {
      expect(loadProfile.aggregate(loadProfile)).toEqual(
        new LoadProfile(
          (new Array(8760).fill(2)),
          options
        )
      );
    });
  });
});
