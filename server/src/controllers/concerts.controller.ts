import { NextFunction, Request, Response } from "express";
import { Pool } from "promise-mysql";
import { queryFile } from "../helpers";

export const concerts_count = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("concerts/select__count_concerts"))
    .then(([{ count }]) => res.json(count))
    .catch((e) => next(e));
};

export const concerts_historial = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("concerts/select__historial_concerts"))
    .then((historial) => res.json(historial))
    .catch((e) => next(e));
};
