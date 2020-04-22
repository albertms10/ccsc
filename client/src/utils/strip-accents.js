/**
 * Returns a string with any accented character in range U+0300 to 0+036F stripped.
 *
 * @param {string} s
 * @returns {string}
 */
export default (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
