/**
 * Returns `true` if the array includes all given values.
 */
export default <T>(array: T[], values: T[]): boolean =>
  array.length > 0 &&
  values.length > 0 &&
  array.some((value) => values.indexOf(value) !== -1);
