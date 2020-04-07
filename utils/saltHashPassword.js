const crypto = require('crypto');

/**
 * Generates a random string given the size of random
 * bytes and returns it using a HEX encoding.
 *
 * @param {number} size
 * @returns {string}
 */
const randomString = (size) => crypto.randomBytes(size).toString('hex');

/**
 * Generates a pair salt and hash for a given pass word.
 *
 * @param {string} password
 * @param {string} salt
 * @returns {[*, string]}
 */
const saltHashPassword = ({ password, salt = randomString(4) }) => {
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password);
  return [
    salt,
    hash.digest('hex'),
  ];
};

module.exports = saltHashPassword;
