import LoadProfile from './LoadProfile';
import RateCalculator from './RateCalculator';
import goalSeek from 'goal-seek';
// TODO: use proper math for scaling
// TODO: fix the toAverageMonthlyBill argument... how to properly pass in a rate?
class LoadProfileScaler {
    constructor(loadProfile, { debug } = { debug: false }) {
        this.loadProfile = loadProfile;
        this.debug = debug;
    }
    to(scaler) {
        return new LoadProfile(this.loadProfile.expanded().map((loadHour) => loadHour.load * scaler), { year: this.loadProfile.year });
    }
    toTotalKwh(totalKwh) {
        const scaler = totalKwh / this.loadProfile.sum();
        return this.to(scaler);
    }
    toAverageMonthlyBill(amount, rate, goalSeekParams = {}) {
        const magnitude = Math.max(Math.floor(Math.log10(Math.abs(amount))), 0);
        const magnitudeScaler = Math.pow(10, magnitude);
        const initialScalerGuess = magnitudeScaler;
        const fnParams = [initialScalerGuess, rate, this, magnitude];
        const finalScaler = goalSeek(Object.assign({ fn: this.scaledMonthlyCost, fnParams, percentTolerance: 0.1, maxIterations: 1000, maxStep: magnitudeScaler * 10, goal: amount, independentVariableIdx: 0 }, goalSeekParams));
        const scalerAsDecimal = finalScaler / magnitudeScaler;
        return this.to(scalerAsDecimal);
    }
    toMonthlyKwh(monthlyKwh) {
        if (monthlyKwh.length !== 12) {
            throw new Error('monthlyKwh must be an array of 12 numbers');
        }
        const scalersByMonth = this.loadProfile.sumByMonth().map((kwh, idx) => {
            return monthlyKwh[idx] / kwh;
        });
        const scaledLoad = this.loadProfile.expanded().map((loadHour) => {
            return Object.assign(Object.assign({}, loadHour), { load: loadHour.load * scalersByMonth[loadHour.month] });
        });
        return new LoadProfile(scaledLoad, { year: this.loadProfile.year });
    }
    scaledMonthlyCost(scaler, rate, context, magnitude) {
        const scaledLoadProfile = context.to(scaler / Math.pow(10, magnitude));
        const rateCalculator = new RateCalculator(Object.assign(Object.assign({}, rate), { loadProfile: scaledLoadProfile }));
        const currentMonthlyCost = rateCalculator.annualCost() / 12;
        if (context.debug) {
            console.log('current scaler is:', scaler);
            console.log('current monthlyCost is:', currentMonthlyCost);
        }
        return currentMonthlyCost;
    }
}
export default LoadProfileScaler;
