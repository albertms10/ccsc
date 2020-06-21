SELECT *,
       m.titol AS titol_moviment,
       o.titol AS titol_obra,
       (
           SELECT IFNULL(JSON_ARRAYAGG(
                                 JSON_OBJECT(
                                         'id_projecte', id_projecte,
                                         'titol', titol,
                                         'inicials', inicials,
                                         'color', color
                                     )
                             ), '[]')
           FROM projectes
                    INNER JOIN moviments_projectes USING (id_projecte)
           WHERE id_moviment = (SELECT m.id_moviment)
       )       AS projectes
FROM moviments m
         INNER JOIN obres o USING (id_obra);
