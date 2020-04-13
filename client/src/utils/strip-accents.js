/**
 * Strips any accented character in range U+0300 to 0+036F.
 *
 * @param {string} s
 * @returns {string}
 */
export default (s) => {
  if (typeof s !== "string") return "";
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
