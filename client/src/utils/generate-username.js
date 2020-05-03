import { stripAccents } from "./index";

export default (name, surname) =>
  name && surname
    ? stripAccents(
        name
          .trim()
          .split(" ")
          .map((n, i) => (i > 0 ? n[0] : n))
          .join("")
          .toLowerCase() +
          surname
            .trim()
            .split(" ")
            .map((n) => (n[0] === n[0].toUpperCase() ? n[0] : ""))
            .join("")
            .toLowerCase()
      )
    : "";
