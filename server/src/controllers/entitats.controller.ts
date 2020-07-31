import { NextFunction, Request, Response } from "express";
import { Pool } from "promise-mysql";
import { parseAndSendJSON, queryFile } from "../helpers";

export const entitats_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("entitats/select__entitats"))
    .then(([entitat]) => res.json(entitat))
    .catch(next);
};

export const entitats_avisos_detall = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { name } = req.params;

  pool
    .query(queryFile("entitats/select__avisos_entitat"), [name])
    .then(([avis]) =>
      parseAndSendJSON(res, next, avis, ["seccions", "acceptacions"])
    )
    .catch(next);
};

export const entitats_cursos = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("entitats/select__cursos_entitats"))
    .then((cursos) => res.json(cursos))
    .catch(next);
};
