import * as jwt from "jsonwebtoken";
import * as config from "../config/auth.config";

interface SignJwtParams {
  payload: any;
  expiresIn?: number;
}

/**
 * Signs a JWT token with the given payload
 * and expiration time in seconds.
 */
export default ({ payload, expiresIn = 10800 }: SignJwtParams): string =>
  jwt.sign(payload, config.secret, { expiresIn });
