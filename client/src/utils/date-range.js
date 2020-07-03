import moment from "moment";
import { nIndexOf } from "./index";

/**
 * Returns the textual date and time range of two given dates
 * @param {string} dateStart
 * @param {string} [timeStart]
 * @param {string} [dateEnd]
 * @param {string} [timeEnd]
 * @param {Object} [options]
 * @returns {string[]}
 */
export default (
  dateStart,
  timeStart,
  dateEnd,
  timeEnd,
  options = { long: true }
) => {
  const startFormat = moment(dateStart).format(
    `${options.long ? "dddd, " : ""}LL`
  );

  return [
    options.long
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
