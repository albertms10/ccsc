import { kebabCase, stripAccents } from "./index";

export default (s: string): string => stripAccents(kebabCase(s));
