import AnnualDemand from './billingDeterminants/AnnualDemand.ts';
import BlockedTiersInDays from './billingDeterminants/BlockedTiersInDays.ts';
import BlockedTiersInMonths from './billingDeterminants/BlockedTiersInMonths.ts';
import DemandPerDay from './billingDeterminants/DemandPerDay.ts';
import DemandTiersInMonths from './billingDeterminants/DemandTiersInMonths.ts';
import DemandTimeOfUse from './billingDeterminants/DemandTimeOfUse.ts';
import EnergyTimeOfUse from './billingDeterminants/EnergyTimeOfUse.ts';
import FixedPerDay from './billingDeterminants/FixedPerDay.ts';
import FixedPerMonth from './billingDeterminants/FixedPerMonth.ts';
import HourlyEnergy from './billingDeterminants/HourlyEnergy.ts';
import MonthlyDemand from './billingDeterminants/MonthlyDemand.ts';
import MonthlyEnergy from './billingDeterminants/MonthlyEnergy.ts';
import SurchargeAsPercent from './billingDeterminants/SurchargeAsPercent.ts';
import LoadProfile from './LoadProfile.ts';
import type {
  ProcessedRateElementInterface,
} from './types/index.ts';

class BillingDeterminantsFactory {
  static make(
    rateElement: ProcessedRateElementInterface,
    loadProfile: LoadProfile,
  ) {
    const { rateElementType, rateComponents } = rateElement;
    switch (rateElementType) {
      case 'EnergyTimeOfUse':
        return rateComponents.map(({ charge, name, ...args }) => ({ charge, name, billingDeterminants: new EnergyTimeOfUse(args, loadProfile) }));
      case 'BlockedTiersInDays':
        return rateComponents.map(({ charge, name, ...args }) => ({ charge, name, billingDeterminants: new BlockedTiersInDays(args, loadProfile) }));
      case 'BlockedTiersInMonths':
        return rateComponents.map(({ charge, name, ...args }) => ({ charge, name, billingDeterminants: new BlockedTiersInMonths(args, loadProfile) }));
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
        return rateComponents.map(({ charge, name, ...args }) => ({ charge, name, billingDeterminants: new SurchargeAsPercent(args) }));
      case 'HourlyEnergy':
        return rateComponents.map(({ charge, name, ...args }) => ({ charge, name, billingDeterminants: new HourlyEnergy(args, loadProfile) }));
      case 'DemandTiersInMonths':
        return rateComponents.map(({ charge, name, ...args }) => ({ charge, name, billingDeterminants: new DemandTiersInMonths(args, loadProfile) }));
      case 'DemandTimeOfUse':
        return rateComponents.map(({ charge, name, ...args }) => ({ charge, name, billingDeterminants: new DemandTimeOfUse(args, loadProfile) }));
      case 'DemandPerDay':
        return rateComponents.map(({ charge, name, ...args }) => ({ charge, name, billingDeterminants: new DemandPerDay(args, loadProfile) }));
      default:
        throw new Error(`Unknown rateElementType: ${rateElementType}`);
    }
  }
}

export default BillingDeterminantsFactory;
