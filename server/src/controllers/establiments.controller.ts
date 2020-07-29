import { NextFunction, Request, Response } from "express";
import { Pool } from "promise-mysql";
import { queryFile } from "../helpers";

export const establiments_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("establiments/select__establiments"))
    .then((establiments) => res.json(establiments))
    .catch(next);
};

export const establiments_detall_esdeveniments = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("establiments/select__esdeveniments_establiment"), [id])
    .then(([establiment]) => res.json(establiment))
    .catch(next);
};
