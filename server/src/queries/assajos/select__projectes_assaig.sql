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
         SELECT e.data
         FROM assajos
                  INNER JOIN esdeveniments e ON (id_esdeveniment = id_assaig)
         WHERE id_assaig = @id_assaig
     ) d
WHERE d.data
          BETWEEN IFNULL(data_inici, d.data)
          AND IFNULL(data_final, d.data);
