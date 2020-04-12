/**
 * Converts the given string into kebab case.
 *
 * @param {string} s
 * @returns {string}
 */
export default (s) => s.toLowerCase().replace(/[ _]/g, '-');
