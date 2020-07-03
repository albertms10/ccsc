import moment from "moment";
import { nIndexOf } from "./index";

/**
 * @typedef {Object} DateRangeOptions
 * @property {boolean} [isLong]
 * @property {boolean} [includesYear]
 */

/**
 * Returns the textual date and time range of two given dates
 * @param {string} dateStart
 * @param {string} [timeStart]
 * @param {string} [dateEnd]
 * @param {string} [timeEnd]
 * @param {DateRangeOptions} [options]
 * @returns {string[]}
 */
export default (
  dateStart,
  timeStart,
  dateEnd,
  timeEnd,
  options = { isLong: true, includesYear: true }
) => {
  const startFormat = moment(dateStart).format(
    `${options.isLong ? "dddd, " : ""}LL`
  );

  return [
    options.includesYear
      ? startFormat
      : startFormat.substring(0, nIndexOf(startFormat, " de", 2)),
    ...(timeStart
      ? [
          moment(`${dateStart} ${timeStart}`).format("LT") +
            (timeEnd ? "–" + moment(`${dateEnd} ${timeEnd}`).format("LT") : ""),
        ]
      : []),
  ];
};
