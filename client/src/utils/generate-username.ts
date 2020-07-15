import { stripAccents } from "./index";

export default (name: string, surname: string): string =>
  stripAccents(
    name!
      .trim()
      .split(" ")
      .map((word, i) => (i > 0 ? word[0] : word))
      .join("")
      .toLowerCase() +
      surname!
        .trim()
        .split(" ")
        .map((word) => (word[0] === word[0].toUpperCase() ? word[0] : ""))
        .join("")
        .toLowerCase()
  );
