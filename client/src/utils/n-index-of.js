/**
 * Returns the index of the nth occurence of a value in a string.
 *
 * @param {string} string
 * @param {string} searchValue
 * @param {number} occurence
 * @returns {number | void}
 */
export default (string, searchValue, occurence) => {
  if (typeof string !== 'string') return;
  const ret = string.split(searchValue, occurence).join(searchValue).length;
  return ret >= string.length || occurence <= 0
    ? -1
    : ret;
};
