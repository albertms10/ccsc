/**
 * Returns a concatenated comma-separated string with the specified last separator.
 */
export default (items: string[], lastSeparator: string = "i"): string => {
  if (!items) return "";

  const l = items.length;
  if (l <= 2) return items.join(` ${lastSeparator} `);

  return (
    items.filter((_, i, items) => i < items.length - 1).join(", ") +
    ` ${lastSeparator} ${items[l - 1]}`
  );
};
