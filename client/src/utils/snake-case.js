/**
 * Returns the given string into snake case.
 *
 * @param {string} s
 * @returns {string}
 */
export default (s) => {
  if (typeof s !== "string") return "";
  return s.toLowerCase().replace(/[ -]/g, "_");
};
