SELECT *,
       m.titol AS titol_moviment,
       o.titol AS titol_obra
FROM moviments_esdeveniment_musical
         INNER JOIN moviments m USING (id_moviment)
         INNER JOIN obres o USING (id_obra)
WHERE id_esdeveniment_musical = ?;
