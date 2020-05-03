exports.associacio_get = (req, res, next) => {
  const connection = req.app.get("connection");

  connection.query(
    `SELECT *
       FROM associacio;`,
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};
