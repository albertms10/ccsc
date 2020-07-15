/**
 * Returns the index of the nth occurence of a value in a string.
 */
export default (
  string: string,
  searchValue: string,
  occurence: number
): number => {
  const ret = string.split(searchValue, occurence).join(searchValue).length;
  return ret >= string.length || occurence <= 0 ? -1 : ret;
};
