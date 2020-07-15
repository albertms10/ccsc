import { typeOf } from "./index";

interface KeyReplacementObject {
  [key: string]: string;
}

/**
 * Returns an array of split data given the `pivot` key
 * and the keys to split the data into.
 */
export default (
  data: any[],
  pivot: string,
  keys: string[] | KeyReplacementObject,
  splitKeyName: string = "type"
): any[] => {
  const pushData = (array: any[], key: string, keyName?: string) =>
    array.push(
      ...data.map((item) => ({
        [pivot]: item[pivot],
        value: item[key],
        [splitKeyName]: keyName || key,
      }))
    );

  const splitData: any[] = [];

  const dataType = typeOf(keys);

  if (dataType === "[object Object]")
    Object.keys(keys).forEach((key) =>
      pushData(splitData, key, (keys as KeyReplacementObject)[key])
    );
  else if (dataType === "[object Array]")
    (keys as any[]).forEach((key) => pushData(splitData, key));

  return splitData;
};
