/**
 * Converts the given string into sentence case.
 *
 * @param {string} s
 * @returns {string}
 */
export default (s) => {
  if (typeof s !== 'string') return '';
  return s.split('.').map(p => p.trim().charAt(0).toUpperCase() + p.trim().slice(1)).join('. ');
};
