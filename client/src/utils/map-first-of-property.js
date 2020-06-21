/**
 * Returns a mapped array with a `first` boolean property
 * that indicates if the given `property` has the first
 * value occurrence.
 * @param {[]} items
 * @param {string} property
 * @returns {[]}
 */
export default (items, property) => {
  const itemsProperty = [];
  return items.map((item) => ({
    ...item,
    first:
      !itemsProperty.includes(item[property]) &&
      itemsProperty.push(item[property]) &&
      true,
  }));
};
