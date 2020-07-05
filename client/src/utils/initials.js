import { stripAccents } from "./index";

/**
 * @typedef {Object} InitialsOptions
 * @property {number} [minValue]
 * @property {number} [maxInitials]
 */

/**
 * Returns the initial characters of each word in a string.
 * @param {string} s
 * @param {InitialsOptions} [options]
 * @returns {string}
 */
export default (s, { minValue = 0, maxInitials = 0 } = {}) => {
  if (typeof s !== "string" || !s) return "";

  const words = stripAccents(s)
    .trim()
    .split(/[ '’–-]+/)
    .filter((w) => w.length >= minValue);

  let initials = [];
  if (maxInitials > 0) {
    const pushed = [];
    const sorted = words.concat().sort((a, b) => b.length - a.length);

    for (let i = 0; i < maxInitials; i++)
      pushed.push(words.find((w) => w === sorted[i]));
    initials = words.filter((w) => pushed.includes(w));
  }

  if (initials.length === 0) initials = words;
  return initials
    .map((w) => (w.length >= minValue ? w.charAt(0) : ""))
    .join("")
    .toUpperCase();
};
