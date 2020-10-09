import dayjs from "dayjs";
import { initials, stripAccents } from "../strings";

export interface SearchFilters {
  texts?: (string | undefined)[];
  dates?: (string | undefined)[];
}

/**
 * Returns `true` if the given query matches against
 * `texts` and `dates` arrays.
 */
export default (
  query: string,
  { texts = [], dates = [] }: SearchFilters = {}
): boolean =>
  query.split(/[ '’–-]+/).every(
    (frag) =>
      (texts &&
        texts.some((text) => {
          if (!text) return false;

          const strippedText = stripAccents(text.toString());

          return (
            strippedText
              .toLowerCase()
              .includes(stripAccents(frag.toLowerCase())) ||
            initials(strippedText, { minValue: 3 })
              .toLowerCase()
              .includes(frag.toLowerCase())
          );
        })) ||
      (dates &&
        dates.some((date) => {
          if (!date) return false;

          const dateDayjs = dayjs(date);

          return (
            dateDayjs.format("L").includes(frag) ||
            dateDayjs.format("LT").includes(frag) ||
            dateDayjs.format("LL").includes(frag)
          );
        }))
  );
