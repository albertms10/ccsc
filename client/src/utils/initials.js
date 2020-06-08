/**
 * @typedef {Object} InitialsOptions
 * @property {number} [minValue=0]
 * @property {number} [maxInitials=0]
 */

/**
 * Returns the initial characters of each word in a string.
 * @param {string} s
 * @param {InitialsOptions} [options]
 * @returns {string}
 */
export default (s, options = { minValue: 0, maxInitials: 0 }) => {
  if (typeof s !== "string" || !s) return "";

  const words = s
    .trim()
    .split(" ")
    .filter((w) => w.length >= options.minValue);

  let initials = [];
  if (options.maxInitials > 0) {
    const pushed = [];
    const sorted = words.concat().sort((a, b) => b.length - a.length);

    for (let i = 0; i < options.maxInitials; i++)
      pushed.push(words.find((w) => w === sorted[i]));
    initials = words.filter((w) => pushed.includes(w));
  }

  if (initials.length === 0) initials = words;
  return initials
    .map((w) => (w.length >= options.minValue ? w.charAt(0) : ""))
    .join("")
    .toUpperCase();
};
