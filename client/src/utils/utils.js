/**
 * Strips any accented character in range U+0300 to 0+036F.
 *
 * @param string
 * @returns {string}
 */
export const stripAccents = string => {
  if (typeof string !== 'string') return '';
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Given an integer, finds the propper unit in order to express its value
 *
 * @param value
 * @param unit
 * @returns {string}
 */
export const closestTimeValue = (value, unit = 's') => {
  const units = ['s', 'min', 'h', 'd', 'm', 'y'];
  const strTime = ['segon', 'minut', 'hora', 'dia', 'mes', 'any'];
  const strTimes = ['segons', 'minuts', 'hores', 'dies', 'mesos', 'anys'];
  const durations = ['60', '60', '24', '30', '12', '10'];

  let num = value;
  let i;

  for (i = units.indexOf(unit); value >= durations[i] && i < durations.length - 1; i++) {
    num /= durations[i];
  }

  num = Math.round(num);
  return `${num} ${num === 1 ? strTime[i] : strTimes[i]}`;
};

/**
 * Capitalizes the first letter of the given string.
 *
 * @param string
 * @returns {string}
 */
export const capitalizeFirst = string => {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Converts the given string into kebab case.
 *
 * @param string
 * @returns {string}
 */
export const kebabCase = string => string.toLowerCase().replace(/[ _]/g, '-');

/**
 * Converts the given string into snake case.
 *
 * @param string
 * @returns {string}
 */
export const snakeCase = string => string.toLowerCase().replace(/[ -]/g, '_');

/**
 * Converts the given string into upper snake case.
 *
 * @param string
 * @returns {string}
 */
export const upperSnakeCase = string => string.toUpperCase().replace(/[ -]/g, '_');

/**
 * Returns the index of the nth occurence of a value in a string.
 *
 * @param string
 * @param findValue
 * @param n
 * @returns {number | void}
 */
export const nIndexOf = (string, findValue, n) => {
  if (typeof string !== 'string') return;
  const ret = string.split(findValue, n).join(findValue).length;
  return ret >= string.length || n <= 0
    ? -1
    : ret;
};
