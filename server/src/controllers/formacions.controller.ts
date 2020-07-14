import { NextFunction, Request, Response } from "express";
import { Pool } from "promise-mysql";
import { parseAndSendJSON, queryFile } from "../helpers";

export const formacions_detall = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("formacions/select__formacio"), [id])
    .then((rows) => res.json(rows))
    .catch((e) => next(e));
};

export const formacions_detall_esdeveniments = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("formacions/select__esdeveniments_formacio"), [id])
    .then(([_, esdeveniments]) =>
      parseAndSendJSON(res, next, esdeveniments, ["projectes"])
    )
    .catch((e) => next(e));
};

export const formacions_detall_concerts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("formacions/select__concerts_formacio"), [id])
    .then((concerts) => res.json(concerts))
    .catch((e) => next(e));
};

export const formacions_detall_projectes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("formacions/select__projectes_formacio"), [id])
    .then((projectes) =>
      parseAndSendJSON(res, next, projectes, ["directors", "formacions"])
    )
    .catch((e) => next(e));
};

export const formacions_detall_integrants = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("formacions/select__integrants_formacio"), [id])
    .then((integrants) => res.json(integrants))
    .catch((e) => next(e));
};
