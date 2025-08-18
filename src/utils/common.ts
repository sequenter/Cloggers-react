// Whether or not we are in development mode
export const DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

/**
 * Creates a multidimentional array of two indicies, containing items of a given array corresponding to the result of a boolean comparator.
 * @param {Array<T>} arr The array to reduce into the result array
 * @param {Predicate<T>} comparator A callback that returns a boolean to determine which index an item gets pushed to in the array
 * @returns {[Array<T>, Array<T>]} Filtered array
 */
export const bifilter = <T>(arr: Array<T>, comparator: Predicate<T>): [Array<T>, Array<T>] =>
  arr.reduce(
    (acc, item) => {
      acc[+comparator(item)].push(item);
      return acc;
    },
    [[] as Array<T>, [] as Array<T>]
  );

/**
 * Determines whether or not a given object is empty.
 * @param {Record<T, U>} obj
 * @returns {boolean}
 */
export const isObjectEmpty = <T extends string | number | symbol, U>(obj: Record<T, U>): boolean => {
  for (const _ in obj) {
    return false;
  }

  return true;
};

/**
 * Get a unix timestamp of today, subtracted by the given date increments.
 * @param {number} months
 * @param {number} days
 * @param {number} hours
 * @param {number} minutes
 * @returns {number} Unix timestamp
 */
export const getUnixDateSubtract = (months: number = 0, days: number = 0, hours: number = 0, minutes: number = 0): number => {
  const now = new Date();

  now.setMonth(now.getMonth() - months);
  now.setDate(now.getDate() - days);
  now.setHours(now.getHours() - hours);
  now.setMinutes(now.getMinutes() - minutes);

  return Math.floor(now.getTime() / 1000);
};
