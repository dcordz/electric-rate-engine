import Validator from './validators/_Validator';
import LoadProfile from './LoadProfile';
import { RateComponentInterface, RateElementType } from './types';
declare class ValidatorFactory {
    static make(type: RateElementType, args: Array<RateComponentInterface>, loadProfile: LoadProfile): Validator;
}
export default ValidatorFactory;
