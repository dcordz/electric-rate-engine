export default function convertInfinities(arr: Array<number | 'Infinity'>): Array<number> {
  return arr.map((n) => n === 'Infinity' ? Infinity : n);
};
