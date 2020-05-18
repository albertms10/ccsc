/**
 * Given an integer, finds the propper unit in order to express its value.
 * @param {number} value
 * @param {('s'|'min'|'h'|'d'|'m'|'y')} unit
 * @returns {string}
 */
export default (value, unit = "s") => {
  const units = ["s", "min", "h", "d", "m", "y"];
  const durations = [60, 60, 24, 30, 12, 10];

  let num = value;
  let i;

  for (
    i = units.indexOf(unit);
    value >= durations[i] && i < durations.length - 1;
    i++
  ) {
    num /= durations[i];
  }

  num = Math.round(num);
  return `${num} ${
    num === 1
      ? ["segon", "minut", "hora", "dia", "mes", "any"][i]
      : ["segons", "minuts", "hores", "dies", "mesos", "anys"][i]
  }`;
};
