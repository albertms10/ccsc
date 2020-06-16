const { queryFile } = require("../helpers");

exports.obres_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("obres/select__obres"))
    .then((obres) => res.json(obres))
    .catch((e) => next(e));
};

exports.obres_idiomes = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("obres/select__idiomes"))
    .then((idiomes) => res.json(idiomes))
    .catch((e) => next(e));
};

exports.obres_detall = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_obra = req.params.id;

  pool
    .query(queryFile("obres/select__obra"), { id_obra })
    .then(([obra]) => res.json(obra))
    .catch((e) => next(e));
};

exports.obres_post = async (req, res, next) => {
  const pool = req.app.get("pool");
  const obra = req.body;

  const connection = await pool.getConnection();

  const transactionRollback = (e) => connection.rollback().then(() => next(e));

  connection
    .beginTransaction()
    .then(() => {
      connection
        .query(queryFile("obres/insert__obra"), [
          [[obra.titol, obra.subtitol, ...obra.anys, obra.id_idioma]],
        ])
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
    .query(queryFile("obres/delete__obra"), [id_obra])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};
