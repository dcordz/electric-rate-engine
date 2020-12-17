import LoadProfileScaler from '../LoadProfileScaler';
import times from 'lodash/times';
import sum from 'lodash/sum';
import LoadProfile from '../LoadProfile';
//import goalSeek from 'goal-seek';
import e1 from '../__mocks__/rates/e-1';

const getLoadProfileOfOnes = () => times(8760, () => 1);

describe('LoadProfileScaler', () => {
  const initialLoadProfile = new LoadProfile(getLoadProfileOfOnes(), {year: 2019});
  let loadProfileScaler;

  beforeEach(() => {
    loadProfileScaler = new LoadProfileScaler(initialLoadProfile);
  });

  describe('toAverageMonthlyBill', () => {
    afterEach(() => {
      jest.resetModules();
    });

    describe('without a mock', () => {
      beforeEach(() => {
        jest.dontMock('goal-seek');
      });

      it('returns a LoadProfile', () => {
        const scaledLoadProfile = loadProfileScaler.toAverageMonthlyBill(100, e1);
        expect(scaledLoadProfile).toBeInstanceOf(LoadProfile);
      });
    });
  });
});
