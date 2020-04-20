/**
 * Returns the given string into upper snake case.
 *
 * @param {string} s
 * @returns {string}
 */
export default (s) => {
  if (typeof s !== "string") return "";
  return s.toUpperCase().replace(/[ -]/g, "_");
};
