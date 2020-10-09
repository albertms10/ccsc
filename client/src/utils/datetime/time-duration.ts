import dayjs from "dayjs";

interface TimeDurationOptions {
  defaultText?: string;
}

/**
 * Returns the textual time duration of `time`.
 */
export default (
  time?: string,
  { defaultText = "" }: TimeDurationOptions = {}
): string => {
  if (!time) return defaultText;

  const timeDayjs = dayjs(time, "HH:mm:ss");

  if (!timeDayjs.isValid()) return defaultText;

  return [
    { format: "H", symbol: "h" },
    { format: "m", symbol: "min" },
    { format: "s", symbol: "s" },
  ]
    .map((time) => ({ ...time, value: timeDayjs.format(time.format) }))
    .filter((time) => time.value !== "0")
    .map((time) => `${time.value}\u00a0${time.symbol}`)
    .join(" ");
};
