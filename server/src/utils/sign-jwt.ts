import * as jwt from "jsonwebtoken";
import * as config from "../config/auth.config";

/**
 * Signs a JWT token with the given payload
 * and expiration time in seconds.
 */
export default ({
  payload,
  expiresIn = 10800,
}: {
  payload: any;
  expiresIn?: number;
}): string => jwt.sign(payload, config.secret, { expiresIn });
