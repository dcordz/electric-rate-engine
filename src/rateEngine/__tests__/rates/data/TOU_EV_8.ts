import { getCommonRateElements } from "./commonRateElements.ts";

// Voltage: Service under this Schedule will be supplied at one standard voltage.
const touEV8 = (year: number) => {
  return {
    name: "TOU-EV-8",
    code: "TOU_EV_8",
    helpText:
      "Applicable to businesses that separately meter the charging of their electric vehicles with charging demands above 20 kilowatts (kW) and less than 500kW.",
    title: "Above 20kW and up to 500kW.",

    minKw: 20,
    maxKw: 500,

    rateElements: getCommonRateElements("TOU_EV_8", years, year),
  };
};

const years = {
  2024: {
    fixed_perday: 0,
    fixed_permonth: 228.13,
    demand_charge: 0,
    energy_summer_on: 0.69592,
    energy_summer_mid: 0.39786,
    energy_summer_off: 0.23294,
    energy_winter_mid: 0.44997,
    energy_winter_off: 0.24897,
    energy_winter_superoff: 0.12406,
    energy_threephaseserivce: 0,
  },
  2025: {
    fixed_perday: 0,
    fixed_permonth: 228.13,
    demand_charge: 0,
    energy_summer_on: 0.69592,
    energy_summer_mid: 0.39786,
    energy_summer_off: 0.23294,
    energy_winter_mid: 0.44997,
    energy_winter_off: 0.24897,
    energy_winter_superoff: 0.12406,
    energy_threephaseserivce: 0,
  },
  2026: {
    fixed_perday: 0,
    fixed_permonth: 228.13,
    demand_charge: 3.25832,
    energy_summer_on: 0.60946,
    energy_summer_mid: 0.3114,
    energy_summer_off: 0.22986,
    energy_winter_mid: 0.3635,
    energy_winter_off: 0.24589,
    energy_winter_superoff: 0.15939,
    energy_threephaseserivce: 0,
  },
  2027: {
    fixed_perday: 0,
    fixed_permonth: 228.13,
    demand_charge: 6.51663,
    energy_summer_on: 0.59642,
    energy_summer_mid: 0.29836,
    energy_summer_off: 0.21682,
    energy_winter_mid: 0.35046,
    energy_winter_off: 0.23284,
    energy_winter_superoff: 0.14635,
    energy_threephaseserivce: 0,
  },
  2028: {
    fixed_perday: 0,
    fixed_permonth: 228.13,
    demand_charge: 9.77495,
    energy_summer_on: 0.58337,
    energy_summer_mid: 0.28531,
    energy_summer_off: 0.20377,
    energy_winter_mid: 0.33742,
    energy_winter_off: 0.2198,
    energy_winter_superoff: 0.1333,
    energy_threephaseserivce: 0,
  },
  2029: {
    fixed_perday: 0,
    fixed_permonth: 228.13,
    demand_charge: 13.03326,
    energy_summer_on: 0.57033,
    energy_summer_mid: 0.27227,
    energy_summer_off: 0.19073,
    energy_winter_mid: 0.32438,
    energy_winter_off: 0.20676,
    energy_winter_superoff: 0.12026,
    energy_threephaseserivce: 0,
  },
  2030: {
    fixed_perday: 0,
    fixed_permonth: 228.13,
    demand_charge: 16.29158,
    energy_summer_on: 0.55729,
    energy_summer_mid: 0.25923,
    energy_summer_off: 0.17769,
    energy_winter_mid: 0.31133,
    energy_winter_off: 0.19371,
    energy_winter_superoff: 0.10722,
    energy_threephaseserivce: 0,
  },
  2031: {
    fixed_perday: 0,
    fixed_permonth: 228.13,
    demand_charge: 19.54989,
    energy_summer_on: 0.54425,
    energy_summer_mid: 0.24618,
    energy_summer_off: 0.16465,
    energy_winter_mid: 0.29829,
    energy_winter_off: 0.18067,
    energy_winter_superoff: 0.09417,
    energy_threephaseserivce: 0,
  },
};

export default touEV8;
