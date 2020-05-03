/**
 * Returns the given string into kebab case.
 * @param {string} s
 * @returns {string}
 */
export default (s) => (s ? s.trim().toLowerCase().replace(/[ _]/g, "-") : "");
