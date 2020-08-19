import { AnyMap } from "common";

type KeyReplacementObject<T> = { [P in keyof T]?: string };

/**
 * Returns an array of split data given the `pivot` key
 * and the keys to split the data into.
 */
export default <T extends AnyMap>(
  data: T[],
  pivot: keyof T,
  keys: (keyof T)[] | KeyReplacementObject<T>,
  splitKeyName: string = "type"
): any[] => {
  const pushData = (array: any[], key: string, keyName?: string): void => {
    array.push(
      ...data.map((item) => ({
        [pivot]: item[pivot],
        value: item[key],
        [splitKeyName]: keyName || key,
      }))
    );
  };

  const splitData: any[] = [];

  const dataType = toString.call(keys);

  if (dataType === "[object Object]")
    Object.keys(keys).forEach((key) => {
      pushData(splitData, key, (keys as KeyReplacementObject<T>)[key]);
    });
  else if (dataType === "[object Array]")
    (keys as (keyof T)[]).forEach((key) => pushData(splitData, key as string));

  return splitData;
};
