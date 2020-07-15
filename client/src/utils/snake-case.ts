/**
 * Returns the given string into snake case.
 */
export default (s: string): string =>
  s!.trim().toLowerCase().replace(/[ -]/g, "_");
