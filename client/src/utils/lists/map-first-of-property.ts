type ObjectWithBoolean<T> = T & {
  [key: string]: boolean;
};

/**
 * Returns a mapped array with a `key`-named boolean property
 * that indicates if the given `property` has the first
 * value occurrence in the array.
 */
export default <T>(
  items: T[],
  property: keyof T,
  key = "first"
): ObjectWithBoolean<T>[] => {
  const itemsProperty: T[] = [];

  return items.map((item) => ({
    ...item,
    [key]:
      !itemsProperty.includes(item[property] as any) &&
      !!itemsProperty.push(item[property] as any) &&
      true,
  }));
};
