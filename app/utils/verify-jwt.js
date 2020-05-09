const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

/**
 * Verifies the authenticity of the given JWT token.
 * @param {string} accessToken
 * @param {Function} callback
 */
const verifyJWT = (accessToken, callback) =>
  jwt.verify(accessToken, config.secret, callback);

module.exports = verifyJWT;
