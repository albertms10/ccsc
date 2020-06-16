SELECT NOT EXISTS(
        SELECT *
        FROM projectes
        WHERE ?
    ) AS disponible;
