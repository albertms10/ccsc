import { Concert, Esdeveniment, Formacio, Persona, Projecte } from "model";
import { Pool, RowDataPacket } from "mysql2/promise";
import { ControllerRequestHandler, ProjecteRaw } from "raw-model";
import { parseAndSendJSON, queryFile } from "../helpers";

export const formacions_detall: ControllerRequestHandler<Formacio> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Formacio & RowDataPacket)[]>(
      queryFile("formacions/select__formacio"),
      [id]
    )
    .then(([[formacio]]) => res.json(formacio))
    .catch(next);
};

export const formacions_detall_esdeveniments: ControllerRequestHandler<
  Esdeveniment[]
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Esdeveniment & RowDataPacket)[][]>(
      queryFile("formacions/select__esdeveniments_formacio"),
      [id]
    )
    .then(([[_, esdeveniments]]) =>
      parseAndSendJSON(res, next, esdeveniments, ["projectes"])
    )
    .catch(next);
};

export const formacions_detall_concerts: ControllerRequestHandler<Concert[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Concert & RowDataPacket)[]>(
      queryFile("formacions/select__concerts_formacio"),
      [id]
    )
    .then(([concerts]) => res.json(concerts))
    .catch(next);
};

export const formacions_detall_projectes: ControllerRequestHandler<
  Projecte[]
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(ProjecteRaw & RowDataPacket)[]>(
      queryFile("formacions/select__projectes_formacio"),
      [id]
    )
    .then(([projectes]) =>
      parseAndSendJSON(res, next, projectes, ["directors", "formacions"])
    )
    .catch(next);
};

export const formacions_detall_integrants: ControllerRequestHandler<
  Persona[]
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Persona & RowDataPacket)[]>(
      queryFile("formacions/select__integrants_formacio"),
      [id]
    )
    .then(([integrants]) => res.json(integrants))
    .catch(next);
};
