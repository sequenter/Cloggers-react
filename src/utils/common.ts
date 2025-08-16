// Whether or not we are in development mode
export const DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

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
