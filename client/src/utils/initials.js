/**
 * Returns the initial characters of each word in a string.
 *
 * @param {string} s
 * @returns {string}
 */
export default (s) => {
  if (typeof s !== "string") return "";
  return s
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
};
