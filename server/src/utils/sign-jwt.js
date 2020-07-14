const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

/**
 * Signs a JWT token with the given payload and expiration time in seconds.
 * @param {Object} payload
 * @param {number} expiresIn
 * @returns {string}
 */
const signJWT = ({ payload, expiresIn }) =>
  jwt.sign(payload, config.secret, { expiresIn });

module.exports = signJWT;
