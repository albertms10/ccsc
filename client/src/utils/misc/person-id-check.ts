interface PersonIdCheckResponse {
  reason?: string;
  status: "success" | "warning" | "error" | "";
  options?: Record<string, unknown>;
}

type InitialLetters = "X" | "Y" | "Z" | "K" | "L" | "M";
type SubstitutionChars = { [L in InitialLetters]?: number };

export const personIdCheckES = (value: string) =>
  new Promise<PersonIdCheckResponse>((resolve, reject) => {
    const MAX_DIGITS = 8;
    value = value.toUpperCase();

    if (/[A-Z]/.test(value.charAt(0))) {
      const substitutionChars: SubstitutionChars = { Y: 1, Z: 2 };
      const letter = value.charAt(0) as InitialLetters;
      value = (substitutionChars[letter] || "") + value.slice(1);
    }

    const numberMatcher = value.match(/[0-9]+/);

    if (numberMatcher && numberMatcher[0].length <= MAX_DIGITS) {
      const LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";
      const letter = value.charAt(value.length - 1);
      const number = parseInt(numberMatcher[0]);

      if (letter === LETTERS[number % LETTERS.length])
        return resolve({ status: "success" });
      else
        return reject({
          reason: "letter does not correspond",
          status: "error",
        });
    } else {
      return reject({
        reason: "number must be max",
        options: {
          number: MAX_DIGITS,
        },
        status: "",
      });
    }
  });

export const personIdMatchers = [
  {
    state: "es",
    matcher: /([XYZKLM][0-9]{1,7}|[0-9]{1,8})[A-Z]/i,
    checker: personIdCheckES,
  },
];

/**
 * Checks for the correct person ID pattern evaluation returning a `Promise`.
 */
export default (value: string): Promise<PersonIdCheckResponse> => {
  if (!value) return Promise.reject();

  for (const { matcher, checker } of personIdMatchers)
    if (value.match(matcher)) return checker(value);

  return Promise.reject({
    reason: "number does not match with any pattern",
    status: "warning",
  });
};
