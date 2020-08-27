/**
 * Returns the given string without separator characters.
 */
export default (s: string) => s?.trim().split(/[_-]/g).join(" ") ?? "";
