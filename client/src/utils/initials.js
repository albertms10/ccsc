/**
 * Returns the initial characters of each word in a string.
 * @param {string} s
 * @returns {string}
 */
export default (s) =>
  s
    ? s
        .trim()
        .split(" ")
        .map((w) => w.charAt(0))
        .join("")
        .toUpperCase()
    : "";
