SELECT *
FROM moviments_esdeveniment_musical
         INNER JOIN moviments USING (id_moviment)
         INNER JOIN obres USING (id_obra)
WHERE id_esdeveniment_musical = ?;
