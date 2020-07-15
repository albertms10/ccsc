import moment from "moment";
import { nIndexOf } from "./index";

interface DateRangeOptions {
  isLong?: boolean;
  includesYear?: boolean;
  connector?: string;
}

/**
 * Returns the textual date and time range of two given dates
 */
export default (
  dateStart: string,
  timeStart: string,
  dateEnd: string,
  timeEnd: string,
  {
    isLong = true,
    includesYear = true,
    connector = " de",
  }: DateRangeOptions = {}
): string[] => {
  const startFormat = moment(dateStart).format(`${isLong ? "dddd, " : ""}LL`);

  return [
    includesYear
      ? startFormat
      : startFormat.substring(
          0,
          nIndexOf(
            startFormat,
            " de",
            startFormat.match(new RegExp(connector, "g"))!.length
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
