module.exports = (app) => {
  const connection = app.get("connection");

  app.get("/api/home/titulars", (req, res, next) => {
    connection.query(
      `SELECT *
         FROM titulars
         ORDER BY ordre IS NULL, data_inici;`,
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      }
    );
  });
};
