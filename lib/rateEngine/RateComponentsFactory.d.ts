import LoadProfile from './LoadProfile';
import RateComponent from './RateComponent';
import type { RateElementInterface, ProcessedRateElementInterface } from './types';
export default class RateComponentsFactory {
    static make(rateElement: RateElementInterface, loadProfile: LoadProfile, otherRateElements: Array<RateElementInterface>): Array<RateComponent>;
    static preprocess(rateElement: RateElementInterface, loadProfile: LoadProfile, otherRateElements: Array<RateElementInterface>): ProcessedRateElementInterface;
}
