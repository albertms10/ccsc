module.exports = (app) => {
  const connection = app.get("connection");

  app.get("/api/usuaris/:username/first-available-num", (req, res, next) => {
    const username = req.params.username;

    connection.query(
      `SELECT MAX(CAST(REGEXP_SUBSTR(username, '[0-9]*$') AS UNSIGNED)) + 1 AS first_available_num
         FROM usuaris
         WHERE REGEXP_SUBSTR(username, '[a-zA-Z.]+') = ?;`,
      [username],
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      }
    );
  });
};
