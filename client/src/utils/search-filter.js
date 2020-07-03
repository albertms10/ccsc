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
export default (query, { texts = [], dates = [] } = {}) =>
  query.split(/[ '’–-]+/).every(
    (frag) =>
      (texts &&
        texts.some((text) => {
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
