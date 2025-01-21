import { getCommonRateElements } from "./commonRateElements.ts";

// Assume Secondary <2kV voltage for this application
const touEV9 = (year: number) => {
  return {
    name: "TOU-EV-9",
    title: "Above 500kW.",
    code: "TOU_EV_9",
    helpText:
      "Applicable to businesses that separately meter the charging of their electric vehicles with charging demands exceeding 500 kW.",

    minKw: 500,
    maxKw: Infinity,

    rateElements: getCommonRateElements("TOU_EV_9", years, year),
  };
};

const years = {
  2024: {
    fixed_permonth: 434.84,
    demand_charge: 0,
    energy_summer_on: 0.55751,
    energy_summer_mid: 0.34658,
    energy_summer_off: 0.19465,
    energy_winter_mid: 0.39583,
    energy_winter_off: 0.20708,
    energy_winter_superoff: 0.11499,
  },
  2025: {
    fixed_permonth: 434.84,
    demand_charge: 0,
    energy_summer_on: 0.55751,
    energy_summer_mid: 0.34658,
    energy_summer_off: 0.19465,
    energy_winter_mid: 0.39583,
    energy_winter_off: 0.20708,
    energy_winter_superoff: 0.11499,
  },
  2026: {
    fixed_permonth: 434.84,
    demand_charge: 3.69874720819057,
    energy_summer_on: 0.487779625615833,
    energy_summer_mid: 0.276851997171223,
    energy_summer_off: 0.194830335019026,
    energy_winter_mid: 0.326103498899183,
    energy_winter_off: 0.207264543305111,
    energy_winter_superoff: 0.137250773509474,
  },
  2027: {
    fixed_permonth: 434.84,
    demand_charge: 7.39749441638113,
    energy_summer_on: 0.478315098692097,
    energy_summer_mid: 0.267387470247486,
    energy_summer_off: 0.185365808095289,
    energy_winter_mid: 0.316638971975447,
    energy_winter_off: 0.197800016381374,
    energy_winter_superoff: 0.127786246585737,
  },
  2028: {
    fixed_permonth: 434.84,
    demand_charge: 11.0962416245717,
    energy_summer_on: 0.46885057176836,
    energy_summer_mid: 0.257922943323749,
    energy_summer_off: 0.175901281171553,
    energy_winter_mid: 0.30717444505171,
    energy_winter_off: 0.188335489457638,
    energy_winter_superoff: 0.118321719662,
  },
  2029: {
    fixed_permonth: 434.84,
    demand_charge: 14.7949888327623,
    energy_summer_on: 0.459386044844624,
    energy_summer_mid: 0.248458416400013,
    energy_summer_off: 0.166436754247816,
    energy_winter_mid: 0.297709918127974,
    energy_winter_off: 0.178870962533901,
    energy_winter_superoff: 0.108857192738264,
  },
  2030: {
    fixed_permonth: 434.84,
    demand_charge: 18.4937360409528,
    energy_summer_on: 0.449921517920887,
    energy_summer_mid: 0.238993889476276,
    energy_summer_off: 0.156972227324079,
    energy_winter_mid: 0.288245391204237,
    energy_winter_off: 0.169406435610164,
    energy_winter_superoff: 0.0993926658145272,
  },
  2031: {
    fixed_permonth: 434.84,
    demand_charge: 22.1924832491434,
    energy_summer_on: 0.44045699099715,
    energy_summer_mid: 0.229529362552539,
    energy_summer_off: 0.147507700400343,
    energy_winter_mid: 0.2787808642805,
    energy_winter_off: 0.159941908686428,
    energy_winter_superoff: 0.0899281388907905,
  },
};

export default touEV9;
