/**
 * Returns a mapped array with a `first` boolean property
 * that indicates if the given `property` has the first
 * value occurrence.
 */
export default (items: any[], property: string): any[] => {
  const itemsProperty: any[] = [];

  return items.map((item) => ({
    ...item,
    first:
      !itemsProperty.includes(item[property]) &&
      itemsProperty.push(item[property]) &&
      true,
  }));
};
