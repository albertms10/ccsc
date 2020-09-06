import { kebabCase, stripAccents } from "./index";

/**
 * Returns an accent-stripped kebab-cased string from the given one.
 */
export default (s: string): string => stripAccents(kebabCase(s));
