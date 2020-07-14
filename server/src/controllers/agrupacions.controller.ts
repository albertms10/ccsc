import { NextFunction, Request, Response } from "express";
import { Pool } from "promise-mysql";
import { parseAndSendJSON, queryFile } from "../helpers";

export const agrupacions_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("agrupacions/select__agrupacions"))
    .then(([agrupacio]) => res.json(agrupacio))
    .catch((e) => next(e));
};

export const agrupacions_avisos_detall = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { name } = req.params;

  pool
    .query(queryFile("agrupacions/select__avisos_agrupacio"), [name])
    .then(([avis]) =>
      parseAndSendJSON(res, next, avis, ["seccions", "acceptacions"])
    )
    .catch((e) => next(e));
};

export const agrupacions_cursos = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("agrupacions/select__cursos_agrupacions"))
    .then((cursos) => res.json(cursos))
    .catch((e) => next(e));
};
