import lodashMean from 'lodash/mean';
class BillingDeterminants {
    mean() {
        return lodashMean(this.calculate());
    }
    all() {
        return this.calculate();
    }
    map(callback) {
        return this.calculate().map(callback);
    }
}
export default BillingDeterminants;
