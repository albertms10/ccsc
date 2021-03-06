import * as fs from "fs";
import * as path from "path";

export default (filename: string) =>
  fs
    .readFileSync(path.resolve(__dirname, `../queries/${filename}.sql`))
    .toString();
