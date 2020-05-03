/**
 * Returns the given string into upper snake case.
 *
 * @param {string} s
 * @returns {string}
 */
export default (s) => (s ? s.trim().toUpperCase().replace(/[ -]/g, "_") : "");
