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
import { ERateElementType } from './constants';
import LoadProfile from './LoadProfile';
import type {
  ProcessedRateElementInterface,
} from './types';

class BillingDeterminantsFactory {
  static make(
    rateElement: ProcessedRateElementInterface,
    loadProfile: LoadProfile,
  ) {
    const { rateElementType, rateComponents } = rateElement;
    switch (rateElementType) {
      case ERateElementType.EnergyTimeOfUse:
        return rateComponents.map(({ charge, name, ...args }) => ({ charge, name, billingDeterminants: new EnergyTimeOfUse(args, loadProfile) }));
      case ERateElementType.BlockedTiersInDays:
        return rateComponents.map(({ charge, name, ...args }) => ({ charge, name, billingDeterminants: new BlockedTiersInDays(args, loadProfile) }));
      case ERateElementType.BlockedTiersInMonths:
        return rateComponents.map(({ charge, name, ...args }) => ({ charge, name, billingDeterminants: new BlockedTiersInMonths(args, loadProfile) }));
      case ERateElementType.FixedPerDay:
        return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new FixedPerDay() }));
      case ERateElementType.FixedPerMonth:
        return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new FixedPerMonth() }));
      case ERateElementType.MonthlyDemand:
        return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new MonthlyDemand(loadProfile) }));
      case ERateElementType.AnnualDemand:
        return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new AnnualDemand(loadProfile) }));
      case ERateElementType.MonthlyEnergy:
        return rateComponents.map(({ charge, name, }) => ({ charge, name, billingDeterminants: new MonthlyEnergy(loadProfile) }));
      case ERateElementType.SurchargeAsPercent:
        return rateComponents.map(({ charge, name, ...args }) => ({ charge, name, billingDeterminants: new SurchargeAsPercent(args) }));
      case ERateElementType.HourlyEnergy:
        return rateComponents.map(({ charge, name, ...args }) => ({ charge, name, billingDeterminants: new HourlyEnergy(args, loadProfile) }));
      case ERateElementType.DemandTiersInMonths:
        return rateComponents.map(({ charge, name, ...args }) => ({ charge, name, billingDeterminants: new DemandTiersInMonths(args, loadProfile) }));
      case ERateElementType.DemandTimeOfUse:
        return rateComponents.map(({ charge, name, ...args }) => ({ charge, name, billingDeterminants: new DemandTimeOfUse(args, loadProfile) }));
      case ERateElementType.DemandPerDay:
        return rateComponents.map(({ charge, name, ...args }) => ({ charge, name, billingDeterminants: new DemandPerDay(args, loadProfile) }));
      default:
        throw new Error(`Unknown rateElementType: ${rateElementType}`);
    }
  }
}

export default BillingDeterminantsFactory;
