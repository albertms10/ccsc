/**
 * Returns the given string into snake case.
 * @param {string} s
 * @returns {string}
 */
export default (s) => (s ? s.trim().toLowerCase().replace(/[ -]/g, "_") : "");
