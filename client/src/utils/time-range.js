import moment from "moment";

/**
 * @typedef {Object} TimeRangeOptions
 * @property {boolean} textual=false
 */

/**
 * Returns the textual time range of two given dates
 * @param {string} start
 * @param {string} [end]
 * @param {TimeRangeOptions} [options]
 * @returns {string}
 */
export default (start, end, { textual = false } = {}) => {
  if (start && end) {
    const leading = textual ? "de " : "";
    const separator = textual ? " a " : "–";

    return (
      leading +
      moment(start, "HH:mm:ss").format("LT") +
      separator +
      moment(end, "HH:mm:ss").format("LT")
    );
  } else if (start) {
    const leading = textual ? "a les " : "";

    return leading + moment(start, "HH:mm:ss").format("LT");
  }

  return "Hora a determinar";
};
