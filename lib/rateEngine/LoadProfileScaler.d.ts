import LoadProfile from './LoadProfile';
import type { GoalSeekArgs, LoadProfileScalerOptions, RateInterface } from './types';
declare class LoadProfileScaler {
    loadProfile: LoadProfile;
    debug: boolean;
    constructor(loadProfile: LoadProfile, { debug }?: LoadProfileScalerOptions);
    to(scaler: number): LoadProfile;
    toTotalKwh(totalKwh: number): LoadProfile;
    toAverageMonthlyBill(amount: number, rate: RateInterface, goalSeekParams?: GoalSeekArgs): LoadProfile;
    toMonthlyKwh(monthlyKwh: Array<number>): LoadProfile;
    private scaledMonthlyCost;
}
export default LoadProfileScaler;
