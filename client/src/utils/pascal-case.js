import { upperCaseFirst } from "./";

/**
 * Returns the given string into Pascal case.
 *
 * @param {string} s
 * @returns {string}
 */
export default (s) => {
  if (typeof s !== "string") return "";
  return s.toLowerCase().split(/[ _-]/g).map(upperCaseFirst).join("");
};
