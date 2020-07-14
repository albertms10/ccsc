import * as jwt from "jsonwebtoken";
import { VerifyCallback } from "jsonwebtoken";
import * as config from "../config/auth.config";

/**
 * Verifies the authenticity of the given JWT token.
 */
export default (accessToken: string, callback: VerifyCallback): void => {
  jwt.verify(accessToken, config.secret, callback);
};
