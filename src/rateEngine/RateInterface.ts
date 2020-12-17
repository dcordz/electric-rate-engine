import { RateElementInterface } from './RateElement';

export default interface RateInterface {
  name: string;
  title: string;
  rateElements: Array<RateElementInterface>;
}
