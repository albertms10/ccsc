import { stripAccents } from "../strings";

/**
 * Returns a generated username from the given `name` and `surname`.
 */
export default (name: string, surname: string): string =>
  stripAccents(
    name
      .trim()
      .split(" ")
      .map((word, index) => (index > 0 ? word.charAt(0) : word))
      .join("")
      .toLowerCase() +
      surname
        .trim()
        .split(" ")
        .map((word) => {
          const first = word.charAt(0);
          return first === first.toUpperCase() ? first : "";
        })
        .join("")
        .toLowerCase()
  );
