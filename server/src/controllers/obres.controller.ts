import { Idioma, Moviment, Obra } from "model";
import { OkPacket, Pool, RowDataPacket } from "mysql2/promise";
import { ControllerRequestHandler, ObraPost } from "server-model";
import { queryFile } from "../helpers";

export const obres_get: ControllerRequestHandler<Obra[]> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(Obra & RowDataPacket)[]>(queryFile("obres/select__obres"))
    .then(([obres]) => res.json(obres))
    .catch(next);
};

export const obres_idiomes: ControllerRequestHandler<Idioma[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(Idioma & RowDataPacket)[]>(queryFile("obres/select__idiomes"))
    .then(([idiomes]) => res.json(idiomes))
    .catch(next);
};

export const obres_detall: ControllerRequestHandler<Obra> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Obra & RowDataPacket)[]>(queryFile("obres/select__obra"), [id])
    .then(([[obra]]) => res.json(obra))
    .catch(next);
};

export const obres_post: ControllerRequestHandler<null, ObraPost> = async (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const obra = req.body;

  const connection = await pool.getConnection();

  const transactionRollback = (e: Error) => {
    connection.rollback().then(() => next(e));
  };

  connection
    .beginTransaction()
    .then(() => {
      connection
        .query<OkPacket>(queryFile("obres/insert__obres"), [
          [[obra.titol, obra.subtitol, ...obra.anys, obra.id_idioma]],
        ])
        .then(async () => {
          await connection.commit();
          res.status(204).send();
        })
        .catch(transactionRollback);
    })
    .catch(transactionRollback);
};

export const obres_delete: ControllerRequestHandler = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<OkPacket>(queryFile("obres/delete__obra"), [id])
    .then(() => res.status(204).send())
    .catch(next);
};

export const obres_detall_moviments: ControllerRequestHandler<Moviment[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Moviment & RowDataPacket)[]>(
      queryFile("obres/select__moviments_obra"),
      [id]
    )
    .then(([moviments]) => res.json(moviments))
    .catch(next);
};
