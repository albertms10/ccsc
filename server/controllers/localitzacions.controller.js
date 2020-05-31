exports.localitzacions_post = (req, res, next) => {
  const pool = req.app.get("pool");
  const {
    tipus_via,
    carrer,
    numero,
    fins_numero,
    codi_postal,
    gmaps,
    ciutat
  } = req.body.localitzacio;

  pool
    .query(
        `INSERT INTO localitzacions (id_tipus_via, carrer, numero, fins_numero, codi_postal, gmaps, id_ciutat)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [tipus_via, carrer, numero, fins_numero, codi_postal, gmaps, ciutat]
    )
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};

exports.localitzacions_tipusvies_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(
        `SELECT *
         FROM tipus_vies;`
    )
    .then((tipus_vies) => res.json(tipus_vies))
    .catch((e) => next(e));
};

exports.localitzacions_detall = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_localitzacio = req.params.id;

  pool
    .query(
        `SELECT id_localitzacio,
                tv.*,
                carrer,
                IFNULL(CONCAT(numero, '–', fins_numero), numero) AS numero,
                codi_postal,
                gmaps,
                c.id_ciutat,
                c.nom                                            AS ciutat,
                c.id_provincia,
                (
                    SELECT nom
                    FROM ciutats
                    WHERE id_ciutat = (SELECT c.id_provincia)
                )                                                AS provincia,
                p2.id_pais,
                p2.nom                                           AS pais
         FROM localitzacions
                  LEFT JOIN tipus_vies tv USING (id_tipus_via)
                  LEFT JOIN ciutats c USING (id_ciutat)
                  LEFT JOIN provincies p ON IFNULL(c.id_provincia, c.id_ciutat) = p.id_provincia
                  LEFT JOIN paisos p2 USING (id_pais)
         WHERE ?;`,
      { id_localitzacio }
    )
    .then((localitzacio) => res.json(localitzacio))
    .catch((e) => next(e));
};

exports.localitzacions_ciutats_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(
        `SELECT id_ciutat,
                ciutats.nom                             AS ciutat,
                IFNULL(ciutats.id_provincia, id_ciutat) AS id_provincia,
                (
                    SELECT nom
                    FROM ciutats
                    WHERE id_ciutat = (SELECT p.id_provincia)
                )                                       AS provincia,
                p2.id_pais,
                p2.nom                                  AS pais
         FROM ciutats
                  LEFT JOIN provincies p ON IFNULL(ciutats.id_provincia, ciutats.id_ciutat) = p.id_provincia
                  LEFT JOIN paisos p2 USING (id_pais);`
    )
    .then((ciutats) => res.json(ciutats))
    .catch((e) => next(e));
};

exports.localitzacions_provincies_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(
        `SELECT provincies.id_provincia, c.nom, p.*
         FROM provincies
                  INNER JOIN ciutats c ON provincies.id_provincia = c.id_ciutat
                  LEFT JOIN paisos p USING (id_pais);`
    )
    .then((provincies) => res.json(provincies))
    .catch((e) => next(e));
};

exports.localitzacions_paisos_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(
        `SELECT *
         FROM paisos;`
    )
    .then((paisos) => res.json(paisos))
    .catch((e) => next(e));
};
