module.exports = (app) => {
  const connection = app.get("connection");

  app.post("/api/home/titulars", (req, res, next) => {
    connection.query(
      `SELECT *
         FROM titulars
         ORDER BY ordre, data_inici;`,
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      }
    );
  });
};
