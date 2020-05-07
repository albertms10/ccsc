/**
 * Returns `true` if the array includes all given values.
 * @param {Array<T>} array
 * @param {Array<T>} values
 * @returns {boolean}
 * @template T
 */
export default (array, values) =>
  array.length > 0 &&
  values.length > 0 &&
  array.some((value) => values.indexOf(value) !== -1);
