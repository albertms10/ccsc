SELECT *,
       EXISTS(
               SELECT *
               FROM veus
                        INNER JOIN veus_convocades_assaig USING (id_veu)
               WHERE id_assaig = ?
                 AND id_veu = v.id_veu
           ) AS convocada
FROM veus v;
