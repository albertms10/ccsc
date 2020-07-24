import moment from "moment";

/**
 * Returns the textual time duration of `time`.
 */
export default (time: string): string => {
  const timeMoment = moment(time, "HH:mm:ss");

  if (!timeMoment.isValid()) return "Sense durada";

  return [
    { format: "H", symbol: "h" },
    { format: "m", symbol: "min" },
    { format: "s", symbol: "s" },
  ]
    .map((time) => ({ ...time, value: timeMoment.format(time.format) }))
    .filter((time) => time.value !== "0")
    .map((time) => `${time.value}\u00a0${time.symbol}`)
    .join(" ");
};
