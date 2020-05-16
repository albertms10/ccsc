exports.localitzacions_post = (req, res, next) => {
  const pool = req.app.get("pool");
  const {
    tipus_via,
    carrer,
    numero,
    fins_numero,
    codi_postal,
    gmaps,
    ciutat,
  } = req.body.localitzacio;

  pool.query(
    `INSERT INTO localitzacions (id_tipus_via, carrer, numero, fins_numero, codi_postal, gmaps, id_ciutat)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [tipus_via, carrer, numero, fins_numero, codi_postal, gmaps, ciutat],
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};

exports.localitzacions_tipusvies_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
    `SELECT *
       FROM tipus_vies;`,
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};

exports.localitzacions_localitzacio_detall = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_localitzacio = req.params.id;

  pool.query(
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
                LEFT JOIN tipus_vies tv ON localitzacions.id_tipus_via = tv.id_tipus_via
                LEFT JOIN ciutats c ON localitzacions.id_ciutat = c.id_ciutat
                LEFT JOIN provincies p ON IFNULL(c.id_provincia, c.id_ciutat) = p.id_provincia
                LEFT JOIN paisos p2 ON p.id_pais = p2.id_pais
       WHERE id_localitzacio = ?;`,
    [id_localitzacio],
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};

exports.localitzacions_ciutats_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
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
                LEFT JOIN paisos p2 ON p.id_pais = p2.id_pais;`,
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};

exports.localitzacions_provincies_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
    `SELECT provincies.id_provincia, c.nom, p.*
       FROM provincies
                INNER JOIN ciutats c ON provincies.id_provincia = c.id_ciutat
                LEFT JOIN paisos p ON provincies.id_pais = p.id_pais;`,
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};

exports.localitzacions_paisos_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
    `SELECT *
       FROM paisos;`,
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};