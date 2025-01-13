var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import AnnualDemand from './billingDeterminants/AnnualDemand';
import BlockedTiersInDays from './billingDeterminants/BlockedTiersInDays';
import BlockedTiersInMonths from './billingDeterminants/BlockedTiersInMonths';
import DemandPerDay from './billingDeterminants/DemandPerDay';
import DemandTiersInMonths from './billingDeterminants/DemandTiersInMonths';
import DemandTimeOfUse from './billingDeterminants/DemandTimeOfUse';
import EnergyTimeOfUse from './billingDeterminants/EnergyTimeOfUse';
import FixedPerDay from './billingDeterminants/FixedPerDay';
import FixedPerMonth from './billingDeterminants/FixedPerMonth';
import HourlyEnergy from './billingDeterminants/HourlyEnergy';
import MonthlyDemand from './billingDeterminants/MonthlyDemand';
import MonthlyEnergy from './billingDeterminants/MonthlyEnergy';
import SurchargeAsPercent from './billingDeterminants/SurchargeAsPercent';
class BillingDeterminantsFactory {
    static make(rateElement, loadProfile) {
        const { rateElementType, rateComponents } = rateElement;
        switch (rateElementType) {
            case 'EnergyTimeOfUse':
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new EnergyTimeOfUse(args, loadProfile) });
                });
            case 'BlockedTiersInDays':
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new BlockedTiersInDays(args, loadProfile) });
                });
            case 'BlockedTiersInMonths':
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new BlockedTiersInMonths(args, loadProfile) });
                });
            case 'FixedPerDay':
                return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new FixedPerDay() }));
            case 'FixedPerMonth':
                return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new FixedPerMonth() }));
            case 'MonthlyDemand':
                return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new MonthlyDemand(loadProfile) }));
            case 'AnnualDemand':
                return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new AnnualDemand(loadProfile) }));
            case 'MonthlyEnergy':
                return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new MonthlyEnergy(loadProfile) }));
            case 'SurchargeAsPercent':
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new SurchargeAsPercent(args) });
                });
            case 'HourlyEnergy':
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new HourlyEnergy(args, loadProfile) });
                });
            case 'DemandTiersInMonths':
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new DemandTiersInMonths(args, loadProfile) });
                });
            case 'DemandTimeOfUse':
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new DemandTimeOfUse(args, loadProfile) });
                });
            case 'DemandPerDay':
                return rateComponents.map((_a) => {
                    var { charge, name } = _a, args = __rest(_a, ["charge", "name"]);
                    return ({ charge, name, billingDeterminants: new DemandPerDay(args, loadProfile) });
                });
            default:
                throw new Error(`Unknown rateElementType: ${rateElementType}`);
        }
    }
}
export default BillingDeterminantsFactory;
