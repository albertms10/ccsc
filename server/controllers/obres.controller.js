exports.obres_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(
        `SELECT *
         FROM obres;`
    )
    .then((obres) => res.json(obres))
    .catch((e) => next(e));
};

exports.obres_idiomes = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(
        `SELECT *
         FROM idiomes;`
    )
    .then((idiomes) => res.json(idiomes))
    .catch((e) => next(e));
};

exports.obres_post = async (req, res, next) => {
  const pool = req.app.get("pool");
  const obra = req.body;

  const connection = await pool.getConnection();

  const transactionRollback = (e) =>
    connection.rollback().then(() => {
      console.log("Transaction rolled back");
      next(e);
    });

  connection
    .beginTransaction()
    .then(() => {
      connection
        .query(
            `INSERT INTO obres (titol, subtitol, any_inici, any_final, id_idioma)
             VALUES ?`,
          [[[obra.titol, obra.subtitol, ...obra.anys, obra.id_idioma]]]
        )
        .then(() => {
          connection.commit();
          res.status(204).send();
        })
        .catch(transactionRollback);
    })
    .catch(transactionRollback);
};

exports.obres_delete = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_obra = req.params.id;

  pool
    .query(
      "SET @id_obra = ?;" +
        `DELETE svmp
         FROM socis_veu_moviment_projectes svmp
                  INNER JOIN veus_moviments USING (id_veu_moviment)
                  INNER JOIN moviments USING (id_moviment)
         WHERE id_obra = @id_obra;

            DELETE vm
            FROM veus_moviments vm
                     INNER JOIN moviments USING (id_moviment)
            WHERE id_obra = @id_obra;

            DELETE
            FROM moviments
            WHERE id_obra = @id_obra;

            DELETE
            FROM obres
            WHERE id_obra = @id_obra;`,
      [id_obra]
    )
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};
