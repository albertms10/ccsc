import * as fs from "fs";
import * as path from "path";

export default (filename: string) =>
  fs
    .readFileSync(path.join(__dirname, `../../src/queries/${filename}.sql`))
    .toString();
