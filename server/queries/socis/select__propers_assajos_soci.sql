SELECT aem.*
FROM socis_convocats_assajos
         INNER JOIN assajos_estat_moviments aem USING (id_assaig)
WHERE dia_inici >= DATE(NOW())
  AND id_soci = ?
LIMIT ?;
