/**
 * Returns the given string into kebab case.
 *
 * @param {string} s
 * @returns {string}
 */
export default (s) => {
  if (typeof s !== "string") return "";
  return s.toLowerCase().replace(/[ _]/g, "-");
};
