SELECT *,
       m.titol AS titol_moviment,
       o.titol AS titol_obra
FROM moviments m
         INNER JOIN obres o USING (id_obra);
