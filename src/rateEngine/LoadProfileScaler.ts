import LoadProfile from './LoadProfile.ts';
import RateCalculator from './RateCalculator.ts';
import goalSeek from 'goal-seek';
import type { GoalSeekArgs, LoadProfileScalerOptions, RateInterface } from './types/index.ts';

// TODO: use proper math for scaling
// TODO: fix the toAverageMonthlyBill argument... how to properly pass in a rate?

class LoadProfileScaler {
  loadProfile: LoadProfile;
  debug: boolean;

  constructor(loadProfile: LoadProfile, { debug }: LoadProfileScalerOptions = { debug: false }) {
    this.loadProfile = loadProfile;
    this.debug = debug;
  }

  to(scaler: number): LoadProfile {
    return new LoadProfile(
      this.loadProfile.expanded().map((loadHour) => loadHour.load * scaler),
      { year: this.loadProfile.year },
    );
  }

  toTotalKwh(totalKwh: number): LoadProfile {
    const scaler = totalKwh / this.loadProfile.sum();
    return this.to(scaler);
  }

  toAverageMonthlyBill(amount: number, rate: RateInterface, goalSeekParams: GoalSeekArgs = {}): LoadProfile {
    const magnitude = Math.max(Math.floor(Math.log10(Math.abs(amount))), 0);

    const magnitudeScaler = 10 ** magnitude;
    const initialScalerGuess = magnitudeScaler;
    const fnParams = [initialScalerGuess, rate, this, magnitude];

    // @ts-ignore
    const finalScaler = goalSeek({
      fn: this.scaledMonthlyCost,
      fnParams,
      percentTolerance: 0.1,
      maxIterations: 1000,
      maxStep: magnitudeScaler * 10, // a goal of 999 needs a max step of 1000
      goal: amount,
      independentVariableIdx: 0,
      ...goalSeekParams,
    });

    const scalerAsDecimal = finalScaler / magnitudeScaler;
    return this.to(scalerAsDecimal);
  }

  toMonthlyKwh(monthlyKwh: Array<number>): LoadProfile {
    if (monthlyKwh.length !== 12) {
      throw new Error('monthlyKwh must be an array of 12 numbers');
    }
    const scalersByMonth = this.loadProfile.sumByMonth().map((kwh, idx) => {
      return monthlyKwh[idx] / kwh;
    });
    const scaledLoad = this.loadProfile.expanded().map((loadHour) => {
      return {
        ...loadHour,
        load: loadHour.load * scalersByMonth[loadHour.month],
      };
    });
    return new LoadProfile(scaledLoad, { year: this.loadProfile.year });
  }

  private scaledMonthlyCost(
    scaler: number,
    rate: RateInterface,
    context: LoadProfileScaler,
    magnitude: number,
  ): number {
    const scaledLoadProfile = context.to(scaler / 10 ** magnitude);
    const rateCalculator = new RateCalculator({
      ...rate,
      loadProfile: scaledLoadProfile,
    });

    const currentMonthlyCost = rateCalculator.annualCost() / 12;

    if (context.debug) {
      console.log('current scaler is:', scaler);
      console.log('current monthlyCost is:', currentMonthlyCost);
    }

    return currentMonthlyCost;
  }
}

export default LoadProfileScaler;
