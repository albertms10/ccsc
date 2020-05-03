/**
 * Returns a string with its first character uppercased.
 *
 * @param {string} s
 * @returns {string}
 */
export default (s) =>
  s ? s.trim().charAt(0).toUpperCase() + s.trim().slice(1) : "";
