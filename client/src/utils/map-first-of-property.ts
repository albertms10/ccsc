/**
 * Returns a mapped array with a `first` boolean property
 * that indicates if the given `property` has the first
 * value occurrence.
 */
export default (
  items: any[],
  property: string,
  key: string = "first"
): any[] => {
  const itemsProperty: any[] = [];

  return items.map((item) => ({
    ...item,
    [key]:
      !itemsProperty.includes(item[property]) &&
      itemsProperty.push(item[property]) &&
      true,
  }));
};
