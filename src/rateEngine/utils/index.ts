export const sum = (array: Array<number>): number => array.reduce((s, i) => s + i, 0);

export const sumBy = <T>(array: Array<T>, key: keyof T): number => array.reduce((s, i) => s + (i[key] as number), 0);
export const maxBy = <T>(array: Array<T>, key: keyof T): number =>
  Math.max(...array.map((item) => item[key] as number));

export const groupBy = <T>(
  array: Array<T>,
  property: keyof T | ((item: T) => string | number | undefined),
): Record<string, Array<T>> => {
  const getter = (item: T) => {
    if (typeof property === 'function') {
      return property(item);
    } else {
      return (typeof item[property] === 'function' ? item[property]() : item[property]) as string | number | undefined;
    }
  };

  return array.reduce((s, item) => {
    const value = getter(item);
    if (typeof value === 'undefined') {
      return s;
    }
    return {
      ...s,
      [value]: Array.isArray(s[value]) ? [...s[value], item] : [item],
    };
  }, {} as Record<string, Array<T>>);
};

export const mean = (array: Array<number>) => sum(array) / array.length