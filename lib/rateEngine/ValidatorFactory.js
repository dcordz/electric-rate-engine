import EnergyTimeOfUseValidator from './validators/EnergyTimeOfUseValidator';
import GenericValidator from './validators/GenericValidator';
import BlockedTiersValidator from './validators/BlockedTiersValidator';
class ValidatorFactory {
    static make(type, args, loadProfile) {
        switch (type) {
            case 'EnergyTimeOfUse':
                return new EnergyTimeOfUseValidator(args, loadProfile);
            case 'BlockedTiersInDays':
            case 'BlockedTiersInMonths':
                return new BlockedTiersValidator(args, loadProfile);
            default:
                return new GenericValidator();
        }
    }
}
export default ValidatorFactory;
