import moment from "moment";
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

          const dateMoment = moment(date);

          return (
            dateMoment.format("L").includes(frag) ||
            dateMoment.format("LT").includes(frag) ||
            dateMoment.format("LL").includes(frag)
          );
        }))
  );
