import * as jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import * as config from "../config/auth.config";

/**
 * Signs a JWT token with the given payload and sign
 * options without exposing the secret or private key.
 */
export default (
  payload: string | object | Buffer,
  options?: SignOptions
): string => jwt.sign(payload, config.secret, options);
