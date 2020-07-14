import { NextFunction, Request, Response } from "express";
import { Pool } from "promise-mysql";
import { queryFile } from "../helpers";

export const localitzacions_post = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { localitzacio } = req.body;

  pool
    .query(queryFile("localitzacions/insert__localitzacions"), [
      [
        [
          localitzacio.tipus_via,
          localitzacio.carrer,
          localitzacio.numero,
          localitzacio.fins_numero,
          localitzacio.codi_postal,
          localitzacio.gmaps,
          localitzacio.ciutat,
        ],
      ],
    ])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};

export const localitzacions_tipusvies_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("localitzacions/select__tipus_vies"))
    .then((tipus_vies) => res.json(tipus_vies))
    .catch((e) => next(e));
};

export const localitzacions_detall = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("localitzacions/select__localitzacio"), [id])
    .then((localitzacio) => res.json(localitzacio))
    .catch((e) => next(e));
};

export const localitzacions_ciutats_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("localitzacions/select__ciutats"))
    .then((ciutats) => res.json(ciutats))
    .catch((e) => next(e));
};

export const localitzacions_provincies_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("localitzacions/select__provincies"))
    .then((provincies) => res.json(provincies))
    .catch((e) => next(e));
};

export const localitzacions_paisos_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("localitzacions/select__paisos"))
    .then((paisos) => res.json(paisos))
    .catch((e) => next(e));
};
