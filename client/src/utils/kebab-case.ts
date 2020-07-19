/**
 * Returns the given string into kebab case.
 */
export default (s: string): string =>
  s?.trim().toLowerCase().replace(/[ _]/g, "-") ?? "";
