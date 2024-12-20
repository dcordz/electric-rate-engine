const SCALER = 1e10;

const addDecimals = (d1: number, d2: number) => {
  return Math.round((d1 + d2) * SCALER) / SCALER;
};

const subtractDecimals = (d1: number, d2: number) => {
  return Math.round((d1 - d2) * SCALER) / SCALER;
};

const multiplyDecimals = (d1: number, d2: number) => {
  return Math.round(d1 * d2 * SCALER) / SCALER;
};

const divideDecimals = (numerator: number, denominator: number) => {
  return Math.round((numerator * SCALER) / denominator) / SCALER;
};

const roundToTwoDecimals = (num: number) => {
  return Math.round(num * 100) / 100;
};

export { addDecimals, subtractDecimals, multiplyDecimals, divideDecimals, roundToTwoDecimals };
