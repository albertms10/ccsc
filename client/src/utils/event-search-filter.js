import moment from "moment";

/**
 * Returns `true` if the given query matches against
 * `from` and `date`.
 * @param {string} query
 * @param {string} from
 * @param {string[]} dates
 * @returns {boolean}
 */
export default (query, from, dates) =>
  query.split(" ").every(
    (frag) =>
      from.toLowerCase().includes(frag.toLowerCase()) ||
      dates.some((date) => {
        const d = moment(date);
        return (
          d.format("L").includes(frag) ||
          d.format("LT").includes(frag) ||
          d.format("LL").includes(frag)
        );
      })
  );
