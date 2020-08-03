import { Titular } from "model";
import { Pool, RowDataPacket } from "mysql2/promise";
import { ControllerRequestHandler } from "raw-model";
import { queryFile } from "../helpers";

export const titulars_get: ControllerRequestHandler<Titular[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(Titular & RowDataPacket)[]>(queryFile("titulars/select__titulars"))
    .then(([titulars]) => res.json(titulars))
    .catch(next);
};
