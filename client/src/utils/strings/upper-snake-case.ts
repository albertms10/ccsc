/**
 * Returns the given string into upper snake case.
 */
export default (s: string): string =>
  s?.trim().toUpperCase().replace(/[ -]/g, "_") ?? "";
