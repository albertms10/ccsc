import { NextFunction, Request, Response } from "express";
import { Pool } from "promise-mysql";
import { queryFile } from "../helpers";

export const usuaris_detall_firstavailablenum = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { username } = req.params;

  pool
    .query(queryFile("usuaris/select__first_available_num_usuari"), [username])
    .then(([_, [{ first_available_num }]]) =>
      res.json(parseInt(first_available_num || 0))
    )
    .catch(next);
};
