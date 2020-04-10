/**
 * Makes the first character of the string uppercase.
 *
 * @param {string} s
 * @returns {string}
 */
export default (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
