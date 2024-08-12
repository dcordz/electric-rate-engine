import RateComponent from './RateComponent';
import HourlyEnergy from './billingDeterminants/HourlyEnergy';
import SurchargeAsPercent from './billingDeterminants/SurchargeAsPercent';
import LoadProfile from './LoadProfile';
import PriceProfile from './PriceProfile';
import RateElement from './RateElement';
import type { RateElementInterface } from './types';
import BillingDeterminantsFactory from './BillingDeterminantsFactory';

export default class RateComponentsFactory {
  static make(
    rateElement: RateElementInterface,
    loadProfile: LoadProfile,
    otherRateElements: RateElementInterface[],
  ): RateComponent[] {
    const convertedRateElement = this.preprocess(rateElement, loadProfile, otherRateElements)
    const billingDeterminantsSet = BillingDeterminantsFactory.make(
      convertedRateElement,
      loadProfile
    );
    return billingDeterminantsSet
      .map(({ charge, name, billingDeterminants }) => {
        return new RateComponent({ charge, name, billingDeterminants });
      });
  }

  static preprocess(
    rateElement: RateElementInterface,
    loadProfile: LoadProfile,
    otherRateElements: RateElementInterface[],
  ): RateElementInterface {
    switch (rateElement.rateElementType) {
      case 'SurchargeAsPercent':
        const rateComponents = rateElement.rateComponents
          .flatMap(({ name: rateComponentName, charge, ...filterArgs }) => {
            return otherRateElements
              .map((element) => new RateElement(element, loadProfile, []))
              .filter((rateElement) => rateElement.matches(filterArgs))
              .map((rateElement) => {
                return {
                  charge,
                  name: `${rateComponentName} surcharge - ${rateElement.name}`,
                  rateElement,
                };
              });
          });
        return {
          ...rateElement,
          rateComponents,
        };
      case 'HourlyEnergy':
        const priceProfile = new PriceProfile(rateElement.priceProfile, {year: loadProfile.year})
        return {
          ...rateElement,
          rateComponents: priceProfile.expanded()
            .map(({ price: charge, hourOfYear }) => ({
              charge,
              name: `${rateElement.name} - Hour ${hourOfYear}`,
              hourOfYear,
            })),
        };
      default:
        return rateElement;
    }
  }
}
