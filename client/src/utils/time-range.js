import moment from "moment";

/**
 * @typedef {Object} TimeRangeOptions
 * @property {boolean} textual=false
 */

/**
 * Returns the textual time range of two given dates
 * @param {string} start
 * @param {string} end
 * @param {TimeRangeOptions} options
 * @returns {string}
 */
export default (start, end, options = { textual: false }) => {
  if (start && end) {
    const leading = options.textual ? "de " : "";
    const separator = options.textual ? " a " : "–";

    return (
      leading +
      moment(start).format("LT") +
      separator +
      moment(end).format("LT")
    );
  } else if (start) {
    const leading = options.textual ? "a les " : "";

    return leading + moment(start).format("LT");
  }

  return "Hora a determinar";
};
