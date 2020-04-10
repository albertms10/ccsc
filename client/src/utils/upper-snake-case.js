/**
 * Converts the given string into upper snake case.
 *
 * @param {string} s
 * @returns {string}
 */
export default (s) => s.toUpperCase().replace(/[ -]/g, '_');
