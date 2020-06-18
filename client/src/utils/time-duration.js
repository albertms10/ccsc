import moment from "moment";

export default (time) => {
  const timeMoment = moment(time, "HH:mm:ss");

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
