/**
 * Returns an array of split data given the `pivot` key
 * and the keys to split the data into.
 * @param {[]} data
 * @param {string} pivot
 * @param {string[]} keys
 * @param {string} [splitKeyName]
 * @returns {[]}
 */
export default (data, pivot, keys, splitKeyName = "type") => {
  let splitData = [];

  keys.forEach((key) => {
    splitData = [
      ...splitData,
      ...data.map((item) => ({
        [pivot]: item[pivot],
        value: item[key],
        [splitKeyName]: key,
      })),
    ];
  });

  return splitData;
};
