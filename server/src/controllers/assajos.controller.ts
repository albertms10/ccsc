import {
  Assaig,
  AssistenciesAssaig,
  Formacio,
  FragmentMovimentEsdevenimentMusical,
  ItemGrafica,
  Moviment,
  PersonaConvocada,
  Projecte,
  Veu,
} from "model";
import { OkPacket, Pool, RowDataPacket } from "mysql2/promise";
import { AssaigPost, ControllerRequestHandler, Count } from "server-model";
import { queryFile } from "../helpers";

export const assajos_detall: ControllerRequestHandler<Assaig> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Assaig & RowDataPacket)[]>(queryFile("assajos/select__assaig"), [
      id,
    ])
    .then(([[assaig]]) => res.json(assaig))
    .catch(next);
};

export const assajos_count: ControllerRequestHandler<number> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(Count & RowDataPacket)[]>(
      queryFile("assajos/select__count_assajos")
    )
    .then(([[{ count }]]) => res.json(count))
    .catch(next);
};

export const assajos_historial: ControllerRequestHandler<ItemGrafica[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(ItemGrafica & RowDataPacket)[]>(
      queryFile("assajos/select__historial_assajos")
    )
    .then(([historial]) => res.json(historial))
    .catch(next);
};

export const assajos_assistencia: ControllerRequestHandler<
  AssistenciesAssaig[]
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { "group-by": groupBy } = req.query;

  pool
    .query<(AssistenciesAssaig & RowDataPacket)[]>(
      queryFile(
        groupBy === "veus"
          ? "assajos/select__assistencia_assajos_veus"
          : "assajos/select__assistencia_assajos_estat"
      )
    )
    .then(([assistencia]) => res.json(assistencia))
    .catch(next);
};

export const assajos_post: ControllerRequestHandler<null, AssaigPost> = async (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const assaig = req.body;

  const connection = await pool.getConnection();

  const transactionRollback = (e: Error) => {
    connection.rollback().then(() => next(e));
  };

  connection
    .beginTransaction()
    .then(() => {
      connection
        .query<OkPacket>(queryFile("assajos/insert__esdeveniments"), [
          [[assaig.dia_inici, ...assaig.hora]],
        ])
        .then(([{ insertId: id_esdeveniment }]) => {
          connection
            .query<OkPacket>(
              queryFile("assajos/insert__esdeveniments_musicals"),
              [[[id_esdeveniment]]]
            )
            .then(() => {
              connection
                .query<OkPacket>(queryFile("assajos/insert__assajos"), [
                  [[id_esdeveniment, assaig.es_general, assaig.es_extra]],
                ])
                .then(async () => {
                  try {
                    if (assaig.projectes.length > 0)
                      await connection.query<OkPacket>(
                        queryFile("assajos/insert__assajos_projectes"),
                        [
                          assaig.projectes.map((projecte) => [
                            id_esdeveniment,
                            projecte,
                          ]),
                        ]
                      );
                  } catch (e) {
                    transactionRollback(e);
                  }

                  try {
                    if (assaig.formacions.length > 0)
                      await connection.query<OkPacket>(
                        queryFile("assajos/insert__assaig_formacio"),
                        [
                          assaig.formacions.map((formacio) => [
                            id_esdeveniment,
                            formacio,
                          ]),
                        ]
                      );
                  } catch (e) {
                    transactionRollback(e);
                  }

                  await connection.commit();
                  res.status(204).send();
                })
                .catch(transactionRollback);
            })
            .catch(transactionRollback);
        })
        .catch(transactionRollback);
    })
    .catch(transactionRollback);
};

export const assajos_delete: ControllerRequestHandler = (req, res, next) => {
  const pool: Pool = res.app.get("pool");
  const { id } = req.params;

  pool
    .query<OkPacket>(queryFile("assajos/delete__assaig"), [id])
    .then(() => res.status(204).send())
    .catch(next);
};

export const assajos_detall_moviments_get: ControllerRequestHandler<
  Moviment[]
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Moviment & RowDataPacket)[]>(
      queryFile("assajos/select__moviments_assaig"),
      [id]
    )
    .then(([moviments]) => res.json(moviments))
    .catch(next);
};

export const assajos_detall_moviments_post: ControllerRequestHandler<
  null,
  { id_moviment: number }
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id: id_assaig } = req.params;
  const { id_moviment } = req.body;

  pool
    .query<OkPacket>(
      queryFile("assajos/insert__moviments_esdeveniment_musical"),
      [[[id_assaig, id_moviment]]]
    )
    .then(() => res.status(204).send())
    .catch(next);
};

export const assajos_detall_moviments_delete: ControllerRequestHandler = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id_assaig, id_moviment } = req.params;

  pool
    .query<OkPacket>(queryFile("assajos/delete__moviment_assaig"), [
      id_assaig,
      id_moviment,
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const assajos_detall_moviments_fragments: ControllerRequestHandler<
  FragmentMovimentEsdevenimentMusical[]
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id_assaig, id_moviment } = req.params;

  pool
    .query<(FragmentMovimentEsdevenimentMusical & RowDataPacket)[]>(
      queryFile("assajos/select__fragments_moviment_assaig"),
      [id_assaig, id_moviment]
    )
    .then(([fragments]) => res.json(fragments))
    .catch(next);
};

export const assajos_detall_projectes_get: ControllerRequestHandler<
  Projecte[]
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Projecte & RowDataPacket)[][]>(
      queryFile("assajos/select__projectes_assaig"),
      [id]
    )
    .then(([[_, projectes]]) => res.json(projectes))
    .catch(next);
};

export const assajos_detall_projectes_post: ControllerRequestHandler<
  null,
  { id_projecte: number }
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id: id_assaig } = req.params;
  const { id_projecte } = req.body;

  pool
    .query<OkPacket>(queryFile("assajos/insert__assajos_projectes"), [
      [[id_assaig, id_projecte]],
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const assajos_detall_projectes_delete: ControllerRequestHandler = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id_assaig, id_projecte } = req.params;

  pool
    .query<OkPacket>(queryFile("assajos/delete__projecte_assaig"), [
      id_assaig,
      id_projecte,
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const assajos_detall_formacions_get: ControllerRequestHandler<
  Formacio[]
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Formacio & RowDataPacket)[]>(
      queryFile("assajos/select__formacions_assaig"),
      [id]
    )
    .then(([formacions]) => res.json(formacions))
    .catch(next);
};

export const assajos_detall_formacions_post: ControllerRequestHandler<
  null,
  { id_formacio: number }
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id: id_assaig } = req.params;
  const { id_formacio } = req.body;

  pool
    .query<OkPacket>(queryFile("assajos/insert__assajos_formacions"), [
      [[id_assaig, id_formacio]],
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const assajos_detall_formacions_delete: ControllerRequestHandler = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id_assaig, id_formacio } = req.params;

  pool
    .query<OkPacket>(queryFile("assajos/delete__formacio_assaig"), [
      id_assaig,
      id_formacio,
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const assajos_detall_convocats: ControllerRequestHandler<
  PersonaConvocada[]
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(PersonaConvocada & RowDataPacket)[]>(
      queryFile("assajos/select__convocats_assaig"),
      [id]
    )
    .then(([convocats]) => res.json(convocats))
    .catch(next);
};

export const assajos_detall_veus_get: ControllerRequestHandler<Veu[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Veu & RowDataPacket)[]>(queryFile("assajos/select__veus_assaig"), [
      id,
    ])
    .then(([veus]) => res.json(veus))
    .catch(next);
};

export const assajos_detall_veus_post: ControllerRequestHandler<
  null,
  { id_veu: number }
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id: id_assaig } = req.params;
  const { id_veu } = req.body;

  pool
    .query<OkPacket>(queryFile("assajos/insert__veus_convocades_assaig"), [
      [[id_assaig, id_veu]],
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const assajos_detall_veus_delete: ControllerRequestHandler = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id_assaig, id_veu } = req.params;

  pool
    .query<OkPacket>(queryFile("assajos/delete__veu_assaig"), [
      id_assaig,
      id_veu,
    ])
    .then(() => res.status(204).send())
    .catch(next);
};
