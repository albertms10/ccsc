UPDATE historial_socis
SET data_baixa = CURRENT_DATE
WHERE id_historial_soci = ?
ORDER BY data_alta DESC
LIMIT 1;
