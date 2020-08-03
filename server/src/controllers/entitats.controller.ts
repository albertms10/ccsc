import { Avis, Curs, Entitat } from "model";
import { Pool, RowDataPacket } from "mysql2/promise";
import { AvisRaw, ControllerRequestHandler } from "raw-model";
import { parseAndSendJSON, queryFile } from "../helpers";

export const entitats_get: ControllerRequestHandler<Entitat[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(Entitat & RowDataPacket)[]>(queryFile("entitats/select__entitats"))
    .then(([entitats]) => res.json(entitats))
    .catch(next);
};

export const entitats_detall: ControllerRequestHandler<Entitat> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Entitat & RowDataPacket)[]>(queryFile("entitats/select__entitat"), [
      id,
    ])
    .then(([[entitat]]) => res.json(entitat))
    .catch(next);
};

export const entitats_detall_avisos_detall: ControllerRequestHandler<Avis> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { name } = req.params;

  pool
    .query<(AvisRaw & RowDataPacket)[]>(
      queryFile("entitats/select__avisos_entitat"),
      [name]
    )
    .then(([[avis]]) =>
      parseAndSendJSON(res, next, avis, ["seccions", "acceptacions"])
    )
    .catch(next);
};

export const entitats_detall_cursos: ControllerRequestHandler<Curs[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(Curs & RowDataPacket)[]>(
      queryFile("entitats/select__cursos_entitats")
    )
    .then(([cursos]) => res.json(cursos))
    .catch(next);
};
