exports.projectes_count = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(
        `SELECT COUNT(*) AS count
         FROM projectes;`
    )
    .then(([{ count }]) => res.json(count))
    .catch((e) => next(e));
};

exports.projectes_historial = (req, res, next) => {
  const pool = req.app.get("pool");

  // TODO: Com tenir en compte els projectes que s’allarguin més d‘un curs?
  pool
    .query(
        `SELECT REPLACE(id_curs, '-', '–') AS x, COUNT(*) AS y
         FROM projectes
                  INNER JOIN cursos USING (id_curs)
         GROUP BY id_curs, cursos.inici
         ORDER BY cursos.inici;`
    )
    .then((historial) => res.json(historial))
    .catch((e) => next(e));
};

exports.projectes_checkinicials = (req, res, next) => {
  const pool = req.app.get("pool");
  const inicials = req.params.inicials;

  pool
    .query(
        `SELECT NOT EXISTS(
                    SELECT *
                    FROM projectes
                    WHERE ?
                ) AS disponible;`,
      { inicials }
    )
    .then(([{ disponible }]) => res.json(!!disponible))
    .catch((e) => next(e));
};

exports.projectes_post = async (req, res, next) => {
  const pool = req.app.get("pool");
  const {
    titol,
    descripcio,
    inicials,
    color,
    data,
    formacions,
    id_curs
  } = req.body;

  const connection = await pool.getConnection();

  const transactionRollback = (e) => connection.rollback().then(() => next(e));

  connection.beginTransaction().then(() =>
    connection
      .query(
          `INSERT INTO projectes (titol, descripcio, inicials, color, data_inici,
                                  data_final, id_curs)
           VALUES ?;`,
        [[[titol, descripcio, inicials, color, ...data, id_curs]]]
      )
      .then(async ({ insertId: id_projecte }) => {
        try {
          if (formacions.length > 0)
            await connection.query(
                `INSERT INTO projectes_formacions (id_projecte, id_formacio)
                 VALUES ?;`,
              [formacions.map((formacio) => [id_projecte, formacio])]
            );
        } catch (e) {
          transactionRollback(e);
        } finally {
          connection.commit();
          res.status(204).send();
        }
      })
      .catch(transactionRollback)
  );
};

exports.projectes_delete = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_projecte = req.params.id;

  pool
    .query(
      "SET @id_projecte = ?;" +
      "START TRANSACTION;" +
        `DELETE
         FROM assajos_projectes
         WHERE id_projecte = @id_projecte;

            DELETE
            FROM directors_projectes
            WHERE id_projecte = @id_projecte;

            DELETE
            FROM projectes_formacions
            WHERE id_projecte = @id_projecte;

            DELETE
            FROM socis_projectes_veu
            WHERE id_projecte = @id_projecte;

            DELETE
            FROM socis_veu_moviment_projectes
            WHERE id_projecte = @id_projecte;

            DELETE
            FROM projectes
            WHERE id_projecte = @id_projecte;

            COMMIT;`,
      [id_projecte]
    )
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};
