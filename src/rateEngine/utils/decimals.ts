const SCALER = 1e10;

const addDecimals = (d1, d2) => {
  return Math.round((d1 + d2) * SCALER) / SCALER;
};

const subtractDecimals = (d1, d2) => {
  return Math.round((d1 - d2) * SCALER) / SCALER;
};

const multiplyDecimals = (d1, d2) => {
  return Math.round(d1 * d2 * SCALER) / SCALER;
};

const divideDecimals = (numerator, denominator) => {
  return Math.round((numerator * SCALER) / denominator) / SCALER;
};

const roundToTwoDecimals = (num) => {
  return Math.round(num * 100) / 100;
};

export { addDecimals, subtractDecimals, multiplyDecimals, divideDecimals, roundToTwoDecimals };
