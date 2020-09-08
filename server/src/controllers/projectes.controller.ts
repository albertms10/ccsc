import { Concert, ItemGrafica, Persona, Projecte, ProjectePost } from "model";
import { OkPacket, Pool, RowDataPacket } from "mysql2/promise";
import { ControllerRequestHandler, Count } from "server-model";
import { queryFile } from "../helpers";

export const projectes_count: ControllerRequestHandler<number> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(Count & RowDataPacket)[]>(
      queryFile("projectes/select__count_projectes")
    )
    .then(([[{ count }]]) => res.json(count))
    .catch(next);
};

export const projectes_historial: ControllerRequestHandler<ItemGrafica[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  // TODO: Com tenir en compte els projectes que s’allarguin més d‘un curs?
  pool
    .query<(ItemGrafica & RowDataPacket)[]>(
      queryFile("projectes/select__historial_projectes")
    )
    .then(([historial]) => res.json(historial))
    .catch(next);
};

export const projectes_checkinicials: ControllerRequestHandler<boolean> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { inicials } = req.params;

  pool
    .query<({ disponible: boolean } & RowDataPacket)[]>(
      queryFile("projectes/select__exists_inicials_projecte"),
      [inicials]
    )
    .then(([[{ disponible }]]) => res.json(disponible))
    .catch(next);
};

export const projectes_detall: ControllerRequestHandler<Projecte> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Projecte & RowDataPacket)[]>(
      queryFile("projectes/select__projecte"),
      [id]
    )
    .then(([[projecte]]) => res.json(projecte))
    .catch(next);
};

export const projectes_post: ControllerRequestHandler<
  null,
  ProjectePost
> = async (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const projecte = req.body;

  const connection = await pool.getConnection();

  const transactionRollback = (e: Error) => {
    connection.rollback().then(() => next(e));
  };

  connection.beginTransaction().then(() =>
    connection
      .query<OkPacket>(queryFile("projectes/insert__projectes"), [
        [
          [
            projecte.titol,
            projecte.descripcio,
            projecte.inicials,
            projecte.color,
            ...projecte.data,
            projecte.id_curs,
          ],
        ],
      ])
      .then(async ([{ insertId: id_projecte }]) => {
        try {
          if (projecte.formacions.length > 0)
            await connection.query<OkPacket>(
              queryFile("projectes/insert__projectes_formacions"),
              [projecte.formacions.map((formacio) => [id_projecte, formacio])]
            );
        } catch (e) {
          // TODO: return Rollback (?)
          transactionRollback(e);
        }

        await connection.commit();
        res.status(204).send();
      })
      .catch(transactionRollback)
  );
};

export const projectes_delete: ControllerRequestHandler = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<OkPacket>(queryFile("projectes/delete__projecte"), [id])
    .then(() => res.status(204).send())
    .catch(next);
};

export const projectes_detall_concerts: ControllerRequestHandler<Concert[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Concert & RowDataPacket)[]>(
      queryFile("projectes/select__concerts_projecte"),
      [id]
    )
    .then(([concerts]) => res.json(concerts))
    .catch(next);
};

export const projectes_detall_participants: ControllerRequestHandler<
  Persona[]
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Persona & RowDataPacket)[]>(
      queryFile("projectes/select__participants_projecte"),
      [id]
    )
    .then(([participants]) => res.json(participants))
    .catch(next);
};

export const projectes_detall_assajos_post: ControllerRequestHandler<
  null,
  { id_assaig: number }
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id: id_projecte } = req.params;
  const { id_assaig } = req.body;

  pool
    .query<OkPacket>(queryFile("assajos/insert__assajos_projectes"), [
      [[id_assaig, id_projecte]],
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const projectes_detall_moviments_post: ControllerRequestHandler<
  null,
  { id_moviment: number }
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id: id_projecte } = req.params;
  const { id_moviment } = req.body;

  pool
    .query<OkPacket>(queryFile("projectes/insert__moviments_projecte"), [
      [[id_moviment, id_projecte]],
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const projectes_detall_moviments_delete: ControllerRequestHandler = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id_projecte, id_moviment } = req.params;

  pool
    .query<OkPacket>(queryFile("projectes/delete__moviment_projecte"), [
      id_projecte,
      id_moviment,
    ])
    .then(() => res.status(204).send())
    .catch(next);
};
