SELECT *
FROM moviments_full
         INNER JOIN moviments_esdeveniment_musical USING (id_moviment)
WHERE id_esdeveniment_musical = ?;
