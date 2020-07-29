import { NextFunction, Request, Response } from "express";
import { Pool } from "promise-mysql";
import { parseAndSendJSON, queryFile } from "../helpers";

export const assajos_detall = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("assajos/select__assaig"), [id])
    .then(([assaig]) =>
      parseAndSendJSON(res, next, assaig, ["formacions", "projectes"])
    )
    .catch(next);
};

export const assajos_count = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("assajos/select__count_assajos"))
    .then(([{ assajos_count }]) => res.json(assajos_count))
    .catch(next);
};

export const assajos_historial = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query(queryFile("assajos/select__historial_assajos"))
    .then((historial) => res.json(historial))
    .catch(next);
};

export const assajos_assistencia = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { "group-by": groupBy } = req.query;

  pool
    .query(
      queryFile(
        groupBy === "veus"
          ? "assajos/select__assistencia_assajos_veus"
          : "assajos/select__assistencia_assajos_estat"
      )
    )
    .then((assistencia) => res.json(assistencia))
    .catch(next);
};

export const assajos_post = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { assaig } = req.body;

  const connection = await pool.getConnection();

  const transactionRollback = (e) => connection.rollback().then(() => next(e));

  connection
    .beginTransaction()
    .then(() => {
      connection
        .query(queryFile("assajos/insert__esdeveniments"), [
          [[assaig.dia_inici, ...assaig.hora]],
        ])
        .then(({ insertId: id_esdeveniment }) => {
          connection
            .query(queryFile("assajos/insert__esdeveniments_musicals"), [
              [[id_esdeveniment]],
            ])
            .then(() => {
              connection
                .query(queryFile("assajos/insert__assajos"), [
                  [[id_esdeveniment, !!assaig.es_general, !!assaig.es_extra]],
                ])
                .then(async () => {
                  try {
                    if (assaig.projectes.length > 0)
                      await connection.query(
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
                      await connection.query(
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

                  connection.commit();
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

export const assajos_delete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = res.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("assajos/delete__assaig"), [id])
    .then(() => res.status(204).send())
    .catch(next);
};

export const assajos_detall_moviments_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("assajos/select__moviments_assaig"), [id])
    .then((moviments) => parseAndSendJSON(res, next, moviments, ["projectes"]))
    .catch(next);
};

export const assajos_detall_moviments_post = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id: id_assaig } = req.params;
  const { id_moviment } = req.body;

  pool
    .query(queryFile("assajos/insert__moviments_esdeveniment_musical"), [
      [[id_assaig, id_moviment]],
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const assajos_detall_moviments_delete = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id_assaig, id_moviment } = req.params;

  pool
    .query(queryFile("assajos/delete__moviment_assaig"), [
      id_assaig,
      id_moviment,
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const assajos_detall_projectes_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("assajos/select__projectes_assaig"), [id])
    .then(([_, projectes]) => res.json(projectes))
    .catch(next);
};

export const assajos_detall_projectes_post = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id: id_assaig } = req.params;
  const { id_projecte } = req.body;

  pool
    .query(queryFile("assajos/insert__assajos_projectes"), [
      [[id_assaig, id_projecte]],
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const assajos_detall_projectes_delete = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id_assaig, id_projecte } = req.params;

  pool
    .query(queryFile("assajos/delete__projecte_assaig"), [
      id_assaig,
      id_projecte,
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const assajos_detall_formacions_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("assajos/select__formacions_assaig"), [id])
    .then((formacions) => res.json(formacions))
    .catch(next);
};

export const assajos_detall_formacions_post = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id: id_assaig } = req.params;
  const { id_formacio } = req.body;

  pool
    .query(queryFile("assajos/insert__assajos_formacions"), [
      [[id_assaig, id_formacio]],
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const assajos_detall_formacions_delete = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id_assaig, id_formacio } = req.params;

  pool
    .query(queryFile("assajos/delete__formacio_assaig"), [
      id_assaig,
      id_formacio,
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const assajos_detall_convocats = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("assajos/select__convocats_assaig"), [id])
    .then((convocats) => res.json(convocats))
    .catch(next);
};

export const assajos_detall_veus_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("assajos/select__veus_assaig"), [id])
    .then((veus) => res.json(veus))
    .catch(next);
};

export const assajos_detall_veus_post = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id: id_assaig } = req.params;
  const { id_veu } = req.body;

  pool
    .query(queryFile("assajos/insert__veus_convocades_assaig"), [
      [[id_assaig, id_veu]],
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const assajos_detall_veus_delete = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { id_assaig, id_veu } = req.params;

  pool
    .query(queryFile("assajos/delete__veu_assaig"), [id_assaig, id_veu])
    .then(() => res.status(204).send())
    .catch(next);
};
