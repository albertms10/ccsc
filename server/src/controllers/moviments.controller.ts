import { NextFunction, Request, Response } from "express";
import { Pool } from "promise-mysql";
import { parseAndSendJSON, queryFile } from "../helpers";

export const moviments_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("moviments/select__moviments"))
    .then((moviments) => parseAndSendJSON(res, next, moviments, ["projectes"]))
    .catch((e) => next(e));
};

export const moviments_post = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { moviment } = req.body;

  pool
    .query(queryFile("moviments/insert__moviments"), [
      [
        [
          moviment.id_obra,
          moviment.ordre || {
            toSqlString: () =>
              `(SELECT IFNULL(MAX(ordre) + 1, 1)
                FROM (SELECT * FROM moviments) m
                WHERE id_obra = ${pool.escape(moviment.id_obra)})`,
          },
          moviment.titol,
          moviment.durada,
        ],
      ],
    ])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};

export const moviments_detall = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("moviments/select__moviment"), [id])
    .then(([moviment]) => res.json(moviment))
    .catch((e) => next(e));
};

export const moviments_detall_delete = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("moviments/delete__moviment"), [id])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};
