import moment from "moment";

/**
 * Returns the textual date and time range of two given dates
 * @param {string} dateStart
 * @param {string} [timeStart]
 * @param {string} [dateEnd]
 * @param {string} [timeEnd]
 * @returns {string[]}
 */
export default (dateStart, timeStart, dateEnd, timeEnd) => [
  moment(dateStart).format("dddd, LL"),
  ...(timeStart
    ? [
        moment(`${dateStart} ${timeStart}`).format("LT") +
          (timeEnd ? "–" + moment(`${dateEnd} ${timeEnd}`).format("LT") : ""),
      ]
    : []),
];
