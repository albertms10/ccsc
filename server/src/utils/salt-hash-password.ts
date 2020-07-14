import { createHmac, randomBytes } from "crypto";

/**
 * Generates a random string given the size of random
 * bytes and returns it using a HEX encoding.
 */
const randomString = (size: number): string =>
  randomBytes(size).toString("hex");

/**
 * Generates a pair salt and hash for a given password.
 */
export default ({
  password,
  salt = randomString(4),
}: {
  password: string;
  salt?: string;
}): { salt: string; hash: string } => {
  const hash = createHmac("sha512", salt).update(password);
  return { salt, hash: hash.digest("hex") };
};
