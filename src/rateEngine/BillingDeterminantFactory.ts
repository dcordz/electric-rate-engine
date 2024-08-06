import BillingDeterminant from './billingDeterminants/_BillingDeterminants';
import FixedPerDay from './billingDeterminants/FixedPerDay';
import FixedPerMonth from './billingDeterminants/FixedPerMonth';
import BlockedTiersInDays from './billingDeterminants/BlockedTiersInDays';
import BlockedTiersInMonths from './billingDeterminants/BlockedTiersInMonths';
import EnergyTimeOfUse from './billingDeterminants/EnergyTimeOfUse';
import LoadProfile from './LoadProfile';
import MonthlyDemand from './billingDeterminants/MonthlyDemand';
import AnnualDemand from './billingDeterminants/AnnualDemand';
import MonthlyEnergy from './billingDeterminants/MonthlyEnergy';
import SurchargeAsPercent from './billingDeterminants/SurchargeAsPercent';
import HourlyEnergy from './billingDeterminants/HourlyEnergy';
import DemandTiersInMonths from './billingDeterminants/DemandTiersInMonths';
import DemandTimeOfUse from './billingDeterminants/DemandTimeOfUse';
import DemandPerDay from './billingDeterminants/DemandPerDay';
import type {
  RateElementType,
  BillingDeterminantFactoryInterface,
  BlockedTiersArgs,
  EnergyTimeOfUseArgs,
  SurchargeAsPercentArgs,
  HourlyEnergyArgs,
  DemandTimeOfUseArgs,
  DemandPerDayArgs,
} from './types';

class BillingDeterminantFactory {
  static make(
    type: RateElementType,
    { ...args }: BillingDeterminantFactoryInterface,
    loadProfile: LoadProfile,
  ): BillingDeterminant {
    switch (type) {
      case 'EnergyTimeOfUse':
        return new EnergyTimeOfUse(args as EnergyTimeOfUseArgs, loadProfile);
      case 'BlockedTiersInDays':
        return new BlockedTiersInDays(args as BlockedTiersArgs, loadProfile);
      case 'BlockedTiersInMonths':
        return new BlockedTiersInMonths(args as BlockedTiersArgs, loadProfile);
      case 'FixedPerDay':
        return new FixedPerDay();
      case 'FixedPerMonth':
        return new FixedPerMonth();
      case 'MonthlyDemand':
        return new MonthlyDemand(loadProfile);
      case 'AnnualDemand':
        return new AnnualDemand(loadProfile);
      case 'MonthlyEnergy':
        return new MonthlyEnergy(loadProfile);
      case 'SurchargeAsPercent':
        return new SurchargeAsPercent(args as SurchargeAsPercentArgs);
      case 'HourlyEnergy':
        return new HourlyEnergy(args as HourlyEnergyArgs, loadProfile);
      case 'DemandTiersInMonths':
        return new DemandTiersInMonths(args as BlockedTiersArgs, loadProfile);
      case 'DemandTimeOfUse':
        return new DemandTimeOfUse(args as DemandTimeOfUseArgs, loadProfile);
      case 'DemandPerDay':
        return new DemandPerDay(args as DemandPerDayArgs, loadProfile);
    }
  }
}

export default BillingDeterminantFactory;
