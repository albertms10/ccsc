SELECT id_usuari,
       username,
       nom,
       cognoms,
       es_dona,
       id_persona,
       roles,
       avisos,
       es_actiu
FROM usuaris_info
WHERE ?;
