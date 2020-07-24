SET @id_assaig = ?;

SELECT *,
       EXISTS(
               SELECT *
               FROM assajos_projectes
               WHERE id_assaig = @id_assaig
                 AND id_projecte = p.id_projecte
           ) AS treballat
FROM projectes p,
     (
         SELECT e.dia_inici
         FROM assajos
                  INNER JOIN esdeveniments e ON (id_esdeveniment = id_assaig)
         WHERE id_assaig = @id_assaig
     ) d
WHERE d.dia_inici
          BETWEEN IFNULL(data_inici, d.dia_inici)
          AND IFNULL(data_final, d.dia_inici);
