import { stripAccents } from "utils/strings/index";

interface InitialsOptions {
  minValue?: number;
  maxInitials?: number;
}

/**
 * Returns the initial characters of each word in a string.
 */
export default (
  s: string,
  { minValue = 0, maxInitials = 0 }: InitialsOptions = {}
): string => {
  const words = stripAccents(s)
    .trim()
    .split(/[ '’–-]+/)
    .filter((w) => w.length >= minValue);

  let initials: string[] = [];
  if (maxInitials > 0) {
    const pushed: string[] = [];
    const sorted = words.concat().sort((a, b) => b.length - a.length);

    for (let i = 0; i < maxInitials; i++)
      pushed.push(words.find((word) => word === sorted[i]) || "");
    initials = words.filter((word) => pushed.includes(word));
  }

  if (initials.length === 0) initials = words;
  return initials
    .map((words) => (words.length >= minValue ? words.charAt(0) : ""))
    .join("")
    .toUpperCase();
};
