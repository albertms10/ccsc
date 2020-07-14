import * as dotenv from "dotenv";

dotenv.config();

export const secret = process.env.JWT_SECRET;
