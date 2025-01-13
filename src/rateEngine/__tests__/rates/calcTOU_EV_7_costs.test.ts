import LoadProfile from "../../LoadProfile.ts";
import RateCalculator from "../../RateCalculator.ts";
import { RateCalculatorInterface } from "../../types/index.ts";
import { RATES } from "./data/RATES.ts";

const dailyLoadProfile = [
  42.0, 42.0, 42.0, 42.0, 42.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 18.0, 18.0, 18.0, 0.0, 0.0, 20.0, 0.0,
  0.0, 42.0, 42.0, 42.0,
];

const year = 2025;

describe('RateCalculator', () => {
  it('.annualCost', () => {
    expect(dailyLoadProfile.length).toEqual(24);

    const annualLoadProfile = new Array(365).fill(dailyLoadProfile).flat();
    expect(annualLoadProfile.length).toEqual(8760);

    const loadProfile = new LoadProfile(annualLoadProfile, { year });

    const rate = RATES.TOU_EV_7(year)
    const rateCalculator = new RateCalculator({ ...rate, loadProfile } as RateCalculatorInterface);

    const annualEnergyCost = rateCalculator.annualCost();

    expect(annualEnergyCost).toBeCloseTo(59783.8244);
  });
});
