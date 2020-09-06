import moment from "moment";
import { nIndexOf } from "../misc";

interface DateRangeOptions {
  isLong?: boolean;
  includesYear?: boolean;
  separator?: string;
}

/**
 * Returns the textual date and time range of two given dates
 */
export default (
  dateStart: string,
  timeStart: string,
  dateEnd?: string,
  timeEnd?: string,
  { isLong = true, includesYear = true, separator = " " }: DateRangeOptions = {}
): string[] => {
  const startFormat = moment(dateStart).format(`${isLong ? "dddd, " : ""}LL`);

  const formatMatch = startFormat.match(new RegExp(separator, "g"));

  return [
    includesYear
      ? startFormat
      : startFormat.substring(
          0,
          nIndexOf(startFormat, separator, formatMatch ? formatMatch.length : 0)
        ),
    ...(timeStart
      ? [
          moment(`${dateStart} ${timeStart}`).format("LT") +
            (timeEnd ? "–" + moment(`${dateEnd} ${timeEnd}`).format("LT") : ""),
        ]
      : []),
  ];
};
