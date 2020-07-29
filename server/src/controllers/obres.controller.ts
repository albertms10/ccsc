import { NextFunction, Request, Response } from "express";
import { Pool } from "promise-mysql";
import { parseAndSendJSON, queryFile } from "../helpers";

export const obres_get = (req: Request, res: Response, next: NextFunction) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("obres/select__obres"))
    .then((obres) => res.json(obres))
    .catch(next);
};

export const obres_idiomes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("obres/select__idiomes"))
    .then((idiomes) => res.json(idiomes))
    .catch(next);
};

export const obres_detall = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("obres/select__obra"), [id])
    .then(([obra]) => res.json(obra))
    .catch(next);
};

export const obres_post = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { obra } = req.body;

  const connection = await pool.getConnection();

  const transactionRollback = (e) => connection.rollback().then(() => next(e));

  connection
    .beginTransaction()
    .then(() => {
      connection
        .query(queryFile("obres/insert__obres"), [
          [[obra.titol, obra.subtitol, ...obra.anys, obra.id_idioma]],
        ])
        .then(() => {
          connection.commit();
          res.status(204).send();
        })
        .catch(transactionRollback);
    })
    .catch(transactionRollback);
};

export const obres_delete = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("obres/delete__obra"), [id])
    .then(() => res.status(204).send())
    .catch(next);
};

export const obres_detall_moviments = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("obres/select__moviments_obra"), [id])
    .then((moviments) => parseAndSendJSON(res, next, moviments, ["projectes"]))
    .catch(next);
};
