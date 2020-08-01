SELECT *
FROM fragments_moviment_esdeveniment_musical
         INNER JOIN moviments_esdeveniment_musical USING (id_moviment_esdeveniment_musical)
WHERE id_esdeveniment_musical = ?
  AND id_moviment = ?;
