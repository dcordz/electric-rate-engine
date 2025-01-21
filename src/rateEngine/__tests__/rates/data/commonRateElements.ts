import { RateElementClassification } from "../../../constants/index.ts";
import { RateElementInterface } from "../../../types/index.ts";
import { WEEKDAYS, WEEKEND, ALL_DAYS_OF_WEEK, SUMMER, WINTER } from "../times/index.ts";


const cachedRateElements = {} as Record<string, Record<number, any[]>>;

export const getCommonRateElements = (
  rateName: string,
  years: Record<number, Record<string, number>>,
  year: number,
): any[] => {
  if (year > 2031) {
    return [];
  }

  if (cachedRateElements?.[rateName]?.[year]) {
    return cachedRateElements[rateName][year];
  }

  const rate = {
    [year]: [
      {
        name: "Demand Charge ($/kW)",
        rateElementType: "MonthlyDemand" as RateElementInterface["rateElementType"],
        classification: RateElementClassification.DEMAND,
        rateComponents: [
          {
            name: "Monthly Demand Charge",
            charge: years[year].demand_charge,
          },
        ],
      },
      {
        name: "Customer Charge ($/Month)",
        rateElementType: "FixedPerMonth",
        classification: RateElementClassification.FIXED,
        rateComponents: [
          {
            name: "Monthly Customer Charge",
            charge: years[year].fixed_permonth,
          },
        ],
      },
      {
        name: "Energy Charge ($/kWh)",
        rateElementType: "EnergyTimeOfUse" as RateElementInterface["rateElementType"],
        classification: RateElementClassification.ENERGY,
        rateComponents: [
          {
            charge: years[year].energy_summer_on,
            months: SUMMER,
            daysOfWeek: WEEKDAYS,
            exceptForDays: [],
            hourStarts: [16, 17, 18, 19, 20], // 4-9 PM
            name: "Summer Peak",
          },
          {
            charge: years[year].energy_summer_mid,
            months: SUMMER,
            daysOfWeek: WEEKEND,
            exceptForDays: [],
            hourStarts: [16, 17, 18, 19, 20], // 4-9 PM
            name: "Summer Mid-Peak",
          },
          {
            charge: years[year].energy_summer_off,
            months: SUMMER,
            daysOfWeek: ALL_DAYS_OF_WEEK,
            exceptForDays: [],
            hourStarts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 21, 22, 23],
            name: "Summer Off-Peak",
          },
          {
            charge: years[year].energy_winter_mid,
            months: WINTER,
            daysOfWeek: ALL_DAYS_OF_WEEK,
            exceptForDays: [],
            hourStarts: [16, 17, 18, 19, 20], // 4-9 PM
            name: "Winter Mid-Peak",
          },
          {
            charge: years[year].energy_winter_off,
            months: WINTER,
            daysOfWeek: ALL_DAYS_OF_WEEK,
            exceptForDays: [],
            hourStarts: [0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23],
            name: "Winter Off-Peak",
          },
          {
            charge: years[year].energy_winter_superoff,
            months: WINTER,
            daysOfWeek: ALL_DAYS_OF_WEEK,
            exceptForDays: [],
            hourStarts: [8, 9, 10, 11, 12, 13, 14, 15], // 8AM - 4PM
            name: "Winter Super Off-Peak",
          },
        ],
      },
    ],
  } as Record<string, Record<number, any>>;

  cachedRateElements[rateName] = {
    ...cachedRateElements[rateName],
    ...rate,
  };

  return rate[year as number] as any[];
};
