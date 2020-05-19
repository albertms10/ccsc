import { upperCaseFirst } from "./index";

/**
 * Returns the given string into Pascal case.
 * @param {string} s
 * @returns {string}
 */
export default (s) =>
  s ? s.trim().toLowerCase().split(/[ _-]/g).map(upperCaseFirst).join("") : "";
