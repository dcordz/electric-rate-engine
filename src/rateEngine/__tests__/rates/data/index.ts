import LoadProfile from "../../../LoadProfile";
import { RATES } from "./RATES";

const getRates = ({ year }: { year: number }) => [RATES.TOU_EV_7(year), RATES.TOU_EV_8(year), RATES.TOU_EV_9(year)];

// Returns false if a rate's max kW is met for 3 consecutive months
// according to https://docs.google.com/spreadsheets/d/194i_6H7-ckuB6uCUK5QGjWmVSG0ebVz-QK9RyI8J-sQ/edit#gid=309346728
const isRateApplicable = (
  rate: Record<string, any>, // TODO: Replace with rate type
  loadProfile: LoadProfile,
  { ignoreMaxKw }: { ignoreMaxKw: boolean },
) => {
  const { maxKw } = rate;
  if (ignoreMaxKw || maxKw === undefined) return true;

  const maxByMonth = loadProfile.maxByMonth();
  const exceedsMaxForThreeMonths = maxByMonth.some((month, idx, arr) => {
    // wrap around to beginning of the year for November/December
    const nextMonth = idx + 1 < arr.length ? arr[idx + 1] : arr[0];
    const monthAfterNext = idx + 2 < arr.length ? arr[idx + 2] : idx + 2 === arr.length ? arr[0] : arr[1];
    return month > maxKw && nextMonth > maxKw && monthAfterNext > maxKw;
  });

  return !exceedsMaxForThreeMonths;
};

export const getApplicableRates = (
  loadProfile: LoadProfile,
  { year, ignoreMaxKw }: { year: number; ignoreMaxKw: boolean },
) => getRates({ year }).filter((rate) => isRateApplicable(rate, loadProfile, { ignoreMaxKw }));

