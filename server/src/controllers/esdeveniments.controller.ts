import { NextFunction, Request, Response } from "express";
import { Pool } from "promise-mysql";
import { queryFile } from "../helpers";

export const esdeveniments_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("esdeveniments/select__esdeveniments"))
    .then((esdeveniments) => res.json(esdeveniments))
    .catch((e) => next(e));
};

export const esdeveniments_estatsconfirmacio = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("esdeveniments/select__estats_confirmacio"))
    .then((estats) => res.json(estats))
    .catch((e) => next(e));
};

export const esdeveniments_detall_assistents_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("esdeveniments/select__assistents_esdeveniment"), [id])
    .then((assistents) => res.json(assistents))
    .catch((e) => next(e));
};

export const esdeveniments_detall_assistents_put = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id: id_esdeveniment } = req.params;
  const { id_persona, id_estat_confirmacio, amb_retard } = req.body;

  pool
    .query(queryFile("esdeveniments/insert__assistents_esdeveniments"), [
      [[id_esdeveniment, id_persona, id_estat_confirmacio, amb_retard]],
    ])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};
