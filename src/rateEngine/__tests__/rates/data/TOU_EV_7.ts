import { getCommonRateElements } from "./commonRateElements.ts";

// https://www.sce.com/business/rates/electric-car-business-rates/business/rates/electric-car-business-rates
// https://www.sce.com/sites/default/files/inline-files/TOU-EV-7_8_9%20Rate%20Fact%20Sheet_WCAG%20(2).pdf
// https://edisonintl.sharepoint.com/teams/Public/TM2/Shared%20Documents/Forms/AllItems.aspx?id=%2Fteams%2FPublic%2FTM2%2FShared%20Documents%2FPublic%2FRegulatory%2FTariff%2DSCE%20Tariff%20Books%2FElectric%2FSchedules%2FGeneral%20Service%20%26%20Industrial%20Rates&p=true&ga=1
//
// Service under this Schedule will be supplied at one standard voltage.
const touEV7 = (year: number) => {
  return {
    name: "TOU-EV-7",
    title: "20kW or Less.",
    code: "TOU_EV_7",
    helpText:
      "Applicable to businesses that separately meter the charging of their electric vehicles with charging demands of 20 kilowatts (kW) or less.",

    minKw: 0,
    maxKw: 20,

    rateElements: getCommonRateElements("TOU_EV_7", years, year),
  };
};

// * NOTE: EV-7 rates are the same for each year and have 0 demand charges
const years = {
  2024: {
    fixed_perday: 0,
    fixed_permonth: 8.76,
    demand_charge: 0,
    energy_summer_on: 0.6609,
    energy_summer_mid: 0.40084,
    energy_summer_off: 0.25369,
    energy_winter_mid: 0.47493,
    energy_winter_off: 0.27445,
    energy_winter_superoff: 0.14253,
    energy_threephaseserivce: 0,
  },
  2025: {
    fixed_perday: 0,
    fixed_permonth: 8.76,
    demand_charge: 0,
    energy_summer_on: 0.6609,
    energy_summer_mid: 0.40084,
    energy_summer_off: 0.25369,
    energy_winter_mid: 0.47493,
    energy_winter_off: 0.27445,
    energy_winter_superoff: 0.14253,
    energy_threephaseserivce: 0,
  },
  2026: {
    fixed_perday: 0,
    fixed_permonth: 8.76,
    demand_charge: 3.25832,
    energy_summer_on: 0.6609,
    energy_summer_mid: 0.40084,
    energy_summer_off: 0.25369,
    energy_winter_mid: 0.47493,
    energy_winter_off: 0.27445,
    energy_winter_superoff: 0.14253,
    energy_threephaseserivce: 0,
  },
  2027: {
    fixed_perday: 0,
    fixed_permonth: 8.76,
    demand_charge: 6.51663,
    energy_summer_on: 0.6609,
    energy_summer_mid: 0.40084,
    energy_summer_off: 0.25369,
    energy_winter_mid: 0.47493,
    energy_winter_off: 0.27445,
    energy_winter_superoff: 0.14253,
    energy_threephaseserivce: 0,
  },
  2028: {
    fixed_perday: 0,
    fixed_permonth: 8.76,
    demand_charge: 9.77495,
    energy_summer_on: 0.6609,
    energy_summer_mid: 0.40084,
    energy_summer_off: 0.25369,
    energy_winter_mid: 0.47493,
    energy_winter_off: 0.27445,
    energy_winter_superoff: 0.14253,
    energy_threephaseserivce: 0,
  },
  2029: {
    fixed_perday: 0,
    fixed_permonth: 8.76,
    demand_charge: 13.03326,
    energy_summer_on: 0.6609,
    energy_summer_mid: 0.40084,
    energy_summer_off: 0.25369,
    energy_winter_mid: 0.47493,
    energy_winter_off: 0.27445,
    energy_winter_superoff: 0.14253,
    energy_threephaseserivce: 0,
  },
  2030: {
    fixed_perday: 0,
    fixed_permonth: 8.76,
    demand_charge: 16.29158,
    energy_summer_on: 0.6609,
    energy_summer_mid: 0.40084,
    energy_summer_off: 0.25369,
    energy_winter_mid: 0.47493,
    energy_winter_off: 0.27445,
    energy_winter_superoff: 0.14253,
    energy_threephaseserivce: 0,
  },
  2031: {
    fixed_perday: 0,
    fixed_permonth: 8.76,
    demand_charge: 19.54989,
    energy_summer_on: 0.6609,
    energy_summer_mid: 0.40084,
    energy_summer_off: 0.25369,
    energy_winter_mid: 0.47493,
    energy_winter_off: 0.27445,
    energy_winter_superoff: 0.14253,
    energy_threephaseserivce: 0,
  },
};

export default touEV7;
