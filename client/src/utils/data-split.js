import { typeOf } from "./index";

/**
 * Returns an array of split data given the `pivot` key
 * and the keys to split the data into.
 * @param {[]} data
 * @param {string} pivot
 * @param {string[] | Object} keys
 * @param {string} [splitKeyName]
 * @returns {[]}
 */
export default (data, pivot, keys, splitKeyName = "type") => {
  const dataType = typeOf(keys);

  const pushData = (array, key, keyName) =>
    array.push(
      ...data.map((item) => ({
        [pivot]: item[pivot],
        value: item[key],
        [splitKeyName]: keyName || key,
      }))
    );

  const splitData = [];

  if (dataType === "[object Object]")
    Object.keys(keys).forEach((key) => pushData(splitData, key, keys[key]));
  else if (dataType === "[object Array]")
    keys.forEach((key) => pushData(splitData, key));

  return splitData;
};
