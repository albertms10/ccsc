/**
 * Returns a string with its first character uppercased.
 */
export default (s: string): string =>
  s?.trim().charAt(0).toUpperCase() + s.trim().slice(1) ?? "";
