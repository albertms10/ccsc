import { upperCaseFirst } from "./index";

/**
 * Returns the given string into Pascal case.
 */
export default (s: string): string =>
  s?.trim().toLowerCase().split(/[ _-]/g).map(upperCaseFirst).join("") ?? "";
