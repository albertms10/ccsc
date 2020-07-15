import moment from "moment";

interface TimeRangeOptions {
  textual?: boolean;
}

/**
 * Returns the textual time range of two given dates
 */
export default (
  start: string,
  end: string,
  { textual = false }: TimeRangeOptions = {}
): string => {
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
