import * as bcrypt from "bcrypt";
import { BooleanMap } from "common";
import {
  Activitat,
  Assaig,
  CountSocis,
  Formacio,
  ItemGrafica,
  Projecte,
  Soci,
} from "model";
import { OkPacket, Pool, RowDataPacket } from "mysql2/promise";
import { ControllerRequestHandler } from "raw-model";
import { ROLES_JUNTA_DIRECTIVA } from "../../../common/common.constants";
import { queryFile } from "../helpers";

export const socis_count: ControllerRequestHandler<CountSocis> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(CountSocis & RowDataPacket)[]>(
      queryFile("socis/select__count_socis")
    )
    .then(([[counts]]) => res.json(counts))
    .catch(next);
};

export const socis_historial: ControllerRequestHandler<ItemGrafica[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(ItemGrafica & RowDataPacket)[]>(
      queryFile("socis/select__historial_socis")
    )
    .then(([historial]) => res.json(historial))
    .catch(next);
};

export const socis_detall: ControllerRequestHandler<Soci> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Soci & RowDataPacket)[]>(queryFile("socis/select__soci"), [id])
    .then(([[soci]]) => res.json(soci))
    .catch(next);
};

export const socis_get: ControllerRequestHandler<Soci[]> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(Soci & RowDataPacket)[]>(queryFile("socis/select__socis"))
    .then(([socis]) => res.json(socis))
    .catch(next);
};

export const socis_post: ControllerRequestHandler<null, Soci> = async (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { email } = res.locals;
  const soci = req.body;

  const connection = await pool.getConnection();

  const transactionRollback = (e: Error) => {
    connection.rollback().then(() => next(e));
  };

  connection
    .beginTransaction()
    .then(() => {
      connection
        .query<OkPacket>(queryFile("socis/insert__persones"), [
          [
            [
              soci.nom,
              soci.cognoms,
              soci.naixement,
              soci.id_pais,
              soci.dni,
              email || soci.email,
              soci.telefon,
            ],
          ],
        ])
        .then(async ([{ insertId: id_persona }]) => {
          const matchedValues = soci.dni.match(/\d+/);
          const password =
            matchedValues && matchedValues.length > 0
              ? matchedValues[0]
              : soci.dni;
          const hashedPassword = await bcrypt.hash(password, 14);

          connection
            .query<OkPacket>(queryFile("socis/insert__usuaris"), [
              [[soci.username, id_persona, hashedPassword]],
            ])
            .then(([{ insertId: id_usuari }]) => {
              connection
                .query<OkPacket>(queryFile("socis/insert__roles_usuari"), [
                  [[id_usuari, 1]],
                ])
                .catch(transactionRollback);
            })
            .catch(transactionRollback);

          connection
            .query<OkPacket>(queryFile("socis/insert__socis"), [
              [[id_persona, soci.experiencia_musical, soci.estudis_musicals]],
            ])
            .then(() => {
              if (soci.acceptacions)
                connection
                  .query<OkPacket>(
                    queryFile("socis/insert__acceptacions_soci"),
                    [
                      Object.keys(soci.acceptacions as BooleanMap).map(
                        (acceptacio) => [
                          id_persona,
                          {
                            toSqlString: () =>
                              `(SELECT id_acceptacio_avis
                            FROM acceptacions_avis 
                            WHERE form_name = ${connection.escape(
                              acceptacio
                            )})`,
                          },
                          (soci.acceptacions as BooleanMap)[acceptacio],
                        ]
                      ),
                    ]
                  )
                  .catch(transactionRollback);

              connection
                .query<OkPacket>(queryFile("socis/insert__historial_soci"), [
                  [[id_persona, soci.data_alta]],
                ])
                .then(() => {
                  connection
                    .query<OkPacket>(queryFile("socis/delete__email_espera"), {
                      email,
                    })
                    .then(async () => {
                      await connection.commit();
                      res.status(204).send();
                    })
                    .catch(transactionRollback);
                })
                .catch(transactionRollback);
            });
        })
        .catch(transactionRollback);
    })
    .catch(next);
};

export const socis_delete: ControllerRequestHandler = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<OkPacket>(queryFile("socis/delete__soci"), [id])
    .then(() => res.status(204).send())
    .catch(next);
};

export const socis_detall_formacions: ControllerRequestHandler<Formacio[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Formacio & RowDataPacket)[][]>(
      queryFile("socis/select__formacions_soci"),
      [id, ROLES_JUNTA_DIRECTIVA]
    )
    .then(([[_, formacions]]) => res.json(formacions))
    .catch(next);
};

export const socis_detall_projectes: ControllerRequestHandler<Projecte[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Projecte & RowDataPacket)[][]>(
      queryFile("socis/select__projectes_soci"),
      [id, ROLES_JUNTA_DIRECTIVA]
    )
    .then(([[_, projectes]]) => res.json(projectes))
    .catch(next);
};

export const socis_detall_assajos: ControllerRequestHandler<Assaig[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Assaig & RowDataPacket)[][]>(
      queryFile("socis/select__assajos_soci"),
      [id, ROLES_JUNTA_DIRECTIVA]
    )
    .then(([[_, assajos]]) => res.json(assajos))
    .catch(next);
};

export const socis_detall_acceptacions_get: ControllerRequestHandler<BooleanMap> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<({ acceptacions: BooleanMap } & RowDataPacket)[]>(
      queryFile("socis/select__acceptacions_soci"),
      [id]
    )
    .then(([[{ acceptacions }]]) => res.json(acceptacions))
    .catch(next);
};

export const socis_detall_acceptacions_put: ControllerRequestHandler<
  BooleanMap,
  BooleanMap
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;
  const acceptacions = req.body;

  pool
    .query<OkPacket>(queryFile("socis/insert__acceptacions_soci"), [
      Object.keys(acceptacions).map((acceptacio) => [
        id,
        {
          toSqlString: () =>
            `(SELECT id_acceptacio_avis
              FROM acceptacions_avis
              WHERE form_name = ${
                // @ts-ignore
                pool.escape(acceptacio)
              })`,
        },
        acceptacions[acceptacio],
      ]),
    ])
    .then(() => res.json(acceptacions))
    .catch(next);
};

export const socis_detall_activitat: ControllerRequestHandler<Activitat[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Activitat & RowDataPacket)[]>(
      queryFile("socis/select__activitat_soci"),
      [id]
    )
    .then(([activitat]) => res.json(activitat))
    .catch(next);
};

export const socis_detall_alta: ControllerRequestHandler = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<OkPacket>(queryFile("socis/insert__historial_soci"), [
      [[id, { toSqlString: () => `CURRENT_DATE` }]],
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const socis_detall_baixa: ControllerRequestHandler = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<OkPacket>(queryFile("socis/update__baixa_historial_soci"), [id])
    .then(() => res.status(204).send())
    .catch(next);
};

export const socis_detall_propersassajos: ControllerRequestHandler<
  Assaig[],
  null,
  { limit?: number }
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;
  const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 4;

  pool
    .query<(Assaig & RowDataPacket)[]>(
      queryFile("socis/select__propers_assajos_soci"),
      [id, limit]
    )
    .then(([assajos]) => res.json(assajos))
    .catch(next);
};
