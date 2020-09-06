const units = ["s", "min", "h", "d", "m", "y"];
const durations = [60, 60, 24, 30, 12, 10];

/**
 * Given an integer, finds the propper unit in order to express its value.
 */
export default (value: number, unit: typeof units[number] = "d"): string => {
  let num = value;
  let i: number;

  for (
    i = units.indexOf(unit);
    value >= durations[i] && i < durations.length - 1;
    value /= durations[i], num /= durations[i], i++
  ) {}

  num = Math.round(num);
  return `${num}\u00a0${
    num === 1
      ? ["segon", "minut", "hora", "dia", "mes", "any"][i]
      : ["segons", "minuts", "hores", "dies", "mesos", "anys"][i]
  }`;
};
