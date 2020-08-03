import { Moviment } from "model";
import { OkPacket, Pool, RowDataPacket } from "mysql2/promise";
import { ControllerRequestHandler, MovimentRaw } from "raw-model";
import { parseAndSendJSON, queryFile } from "../helpers";

export const moviments_get: ControllerRequestHandler<Moviment[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(MovimentRaw & RowDataPacket)[]>(
      queryFile("moviments/select__moviments")
    )
    .then(([moviments]) =>
      parseAndSendJSON(res, next, moviments, ["projectes"])
    )
    .catch(next);
};

export const moviments_post: ControllerRequestHandler<null, Moviment> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const moviment = req.body;

  pool
    .query<OkPacket>(queryFile("moviments/insert__moviments"), [
      [
        [
          moviment.id_obra,
          moviment.ordre || {
            toSqlString: () =>
              `(SELECT IFNULL(MAX(ordre) + 1, 1)
                FROM (SELECT * FROM moviments) m
                WHERE id_obra = ${
                  // @ts-ignore
                  pool.escape(moviment.id_obra)
                })`,
          },
          moviment.titol_moviment,
          moviment.durada,
        ],
      ],
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const moviments_detall: ControllerRequestHandler<Moviment> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Moviment & RowDataPacket)[]>(
      queryFile("moviments/select__moviment"),
      [id]
    )
    .then(([[moviment]]) => res.json(moviment))
    .catch(next);
};

export const moviments_detall_delete: ControllerRequestHandler = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<OkPacket>(queryFile("moviments/delete__moviment"), [id])
    .then(() => res.status(204).send())
    .catch(next);
};
