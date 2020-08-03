import { Esdeveniment, Establiment } from "model";
import { Pool, RowDataPacket } from "mysql2/promise";
import { ControllerRequestHandler } from "raw-model";
import { queryFile } from "../helpers";

export const establiments_get: ControllerRequestHandler<Establiment[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(Establiment & RowDataPacket)[]>(
      queryFile("establiments/select__establiments")
    )
    .then(([establiments]) => res.json(establiments))
    .catch(next);
};

export const establiments_detall_esdeveniments: ControllerRequestHandler<
  Esdeveniment[]
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Esdeveniment & RowDataPacket)[]>(
      queryFile("establiments/select__esdeveniments_establiment"),
      [id]
    )
    .then(([esdeveniments]) => res.json(esdeveniments))
    .catch(next);
};
