SELECT NOT EXISTS(
        SELECT *
        FROM projectes
        WHERE inicials = ?
    ) AS disponible;
