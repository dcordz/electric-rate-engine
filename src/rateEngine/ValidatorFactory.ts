import Validator from './validators/_Validator.ts';
import EnergyTimeOfUseValidator from './validators/EnergyTimeOfUseValidator.ts';
import GenericValidator from './validators/GenericValidator.ts';
import BlockedTiersValidator from './validators/BlockedTiersValidator.ts';
import LoadProfile from './LoadProfile.ts';
import { RateComponentInterface, EnergyTimeOfUseArgs, BlockedTiersArgs, RateElementType } from './types/index.ts';

class ValidatorFactory {
  static make(
    type: RateElementType,
    args: Array<RateComponentInterface>,
    loadProfile: LoadProfile
  ): Validator {
    switch(type) {
      case 'EnergyTimeOfUse':
        return new EnergyTimeOfUseValidator(args as Array<RateComponentInterface & EnergyTimeOfUseArgs>, loadProfile);
      case 'BlockedTiersInDays':
      case 'BlockedTiersInMonths':
        return new BlockedTiersValidator(args as Array<BlockedTiersArgs>, loadProfile);
      default:
        return new GenericValidator();
    }
  }
}

export default ValidatorFactory;
