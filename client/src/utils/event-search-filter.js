import moment from "moment";
import { stripAccents } from "./index";

/**
 * @typedef {Object} SearchFilterFilters
 * @property {string[]} [texts]
 * @property {string[]} [dates]
 */

/**
 * Returns `true` if the given query matches against
 * `texts` and `dates` arrays.
 * @param {string} query
 * @param {SearchFilterFilters} filters
 * @returns {boolean}
 */
export default (query, filters = { texts: [], dates: [] }) =>
  query.split(/[ '’–-]+/).every(
    (frag) =>
      (filters.texts &&
        filters.texts.some((text) => {
          if (!text) return false;

          const strippedText = stripAccents(text.toString());
          const initialsMatch = strippedText.match(/[A-Z]/g);

          return (
            strippedText
              .toLowerCase()
              .includes(stripAccents(frag.toLowerCase())) ||
            (initialsMatch &&
              frag.includes(initialsMatch.join("").toLowerCase()))
          );
        })) ||
      (filters.dates &&
        filters.dates.some((date) => {
          if (!date) return false;
          const d = moment(date);
          return (
            d.format("L").includes(frag) ||
            d.format("LT").includes(frag) ||
            d.format("LL").includes(frag)
          );
        }))
  );
