import moment from "moment";
import { nIndexOf } from "./index";

/**
 * @typedef {Object} DateRangeOptions
 * @property {boolean} [isLong]
 * @property {boolean} [includesYear]
 * @property {string} [connector]
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
  { isLong = true, includesYear = true, connector = " de" } = {}
) => {
  const startFormat = moment(dateStart).format(`${isLong ? "dddd, " : ""}LL`);

  return [
    includesYear
      ? startFormat
      : startFormat.substring(
          0,
          nIndexOf(
            startFormat,
            " de",
            startFormat.match(new RegExp(connector, "g")).length
          )
        ),
    ...(timeStart
      ? [
          moment(`${dateStart} ${timeStart}`).format("LT") +
            (timeEnd ? "–" + moment(`${dateEnd} ${timeEnd}`).format("LT") : ""),
        ]
      : []),
  ];
};
