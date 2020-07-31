CREATE DATABASE amcc
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

SET storage_engine = innodb;

CREATE TABLE IF NOT EXISTS activitats
(
    id_activitat SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom          VARCHAR(50) NOT NULL,
    descripcio   TEXT        NOT NULL
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS carrecs_junta
(
    id_carrec_junta TINYINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    carrec          VARCHAR(20) NOT NULL
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS ciutats
(
    id_ciutat    SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom          VARCHAR(50)       NOT NULL,
    id_provincia SMALLINT UNSIGNED NULL,
    CONSTRAINT nom
        UNIQUE (nom, id_provincia)
)
    CHARSET = utf8mb4;

CREATE INDEX id_provincia
    ON ciutats (id_provincia);

CREATE TABLE IF NOT EXISTS compassos_moviment_esdeveniment_musical
(
    id_moviment_esdeveniment_musical SMALLINT UNSIGNED  NOT NULL,
    compas_inici                     SMALLINT DEFAULT 1 NOT NULL,
    compas_final                     SMALLINT           NOT NULL,
    nota                             TEXT               NULL,
    PRIMARY KEY (id_moviment_esdeveniment_musical, compas_inici)
);

CREATE TABLE IF NOT EXISTS cursos
(
    id_curs VARCHAR(5) NOT NULL
        PRIMARY KEY,
    inici   DATE       NOT NULL,
    final   DATE       NULL
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS emails_espera
(
    email VARCHAR(255) NOT NULL,
    CONSTRAINT emails_espera_email_uindex
        UNIQUE (email)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS equips
(
    id_equip   SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom        VARCHAR(100) NOT NULL,
    descripcio TEXT         NULL
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS estats_confirmacio
(
    id_estat_confirmacio TINYINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    estat                VARCHAR(50) NOT NULL
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS feines_equips
(
    id_feina_equip SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom            VARCHAR(100)      NOT NULL,
    descripcio     TEXT              NULL,
    id_equip       SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT feines_equips_ibfk_1
        FOREIGN KEY (id_equip) REFERENCES equips (id_equip)
)
    CHARSET = utf8mb4;

CREATE INDEX id_equip
    ON feines_equips (id_equip);

CREATE TABLE IF NOT EXISTS horaris_curs
(
    id_curs       VARCHAR(5) NOT NULL,
    periode_inici DATE       NOT NULL,
    periode_final DATE       NULL,
    hora_inici    TIME       NOT NULL,
    hora_final    TIME       NOT NULL,
    PRIMARY KEY (id_curs, periode_inici),
    CONSTRAINT horaris_curs_ibfk_1
        FOREIGN KEY (id_curs) REFERENCES cursos (id_curs)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS idiomes
(
    id_idioma CHAR(2)     NOT NULL
        PRIMARY KEY,
    nom       VARCHAR(50) NOT NULL
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS insignies
(
    id_insignia SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom         VARCHAR(100) NOT NULL,
    descripcio  VARCHAR(255) NOT NULL
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS missatges
(
    id_missatge SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom         VARCHAR(255)                        NOT NULL,
    email       VARCHAR(255)                        NOT NULL,
    missatge    TEXT                                NOT NULL,
    data        TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS obres
(
    id_obra     SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    titol       VARCHAR(100)      NOT NULL,
    subtitol    VARCHAR(200)      NULL,
    num_cataleg SMALLINT UNSIGNED NULL,
    any_inici   SMALLINT UNSIGNED NULL,
    any_final   SMALLINT UNSIGNED NULL,
    id_idioma   CHAR(2)           NULL,
    CONSTRAINT obres_ibfk_1
        FOREIGN KEY (id_idioma) REFERENCES idiomes (id_idioma)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS moviments
(
    id_moviment SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    ordre       SMALLINT UNSIGNED NOT NULL,
    titol       VARCHAR(100)      NULL,
    durada      TIME              NULL,
    tonalitat   VARCHAR(10)       NULL,
    id_obra     SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT moviments_ibfk_1
        FOREIGN KEY (id_obra) REFERENCES obres (id_obra)
)
    CHARSET = utf8mb4;

CREATE INDEX id_obra
    ON moviments (id_obra);

CREATE INDEX id_idioma
    ON obres (id_idioma);

CREATE TABLE IF NOT EXISTS paisos
(
    id_pais CHAR(2)     NOT NULL
        PRIMARY KEY,
    nom     VARCHAR(50) NOT NULL
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS projectes
(
    id_projecte SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    titol       VARCHAR(50) NOT NULL,
    descripcio  TEXT        NULL,
    inicials    VARCHAR(3)  NOT NULL,
    color       CHAR(6)     NULL,
    data_inici  DATE        NULL,
    data_final  DATE        NULL,
    id_curs     VARCHAR(5)  NOT NULL,
    CONSTRAINT projectes_ibfk_1
        FOREIGN KEY (id_curs) REFERENCES cursos (id_curs)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS moviments_projectes
(
    id_moviment SMALLINT UNSIGNED NOT NULL,
    id_projecte SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_moviment, id_projecte),
    CONSTRAINT moviments_projectes_ibfk_1
        FOREIGN KEY (id_moviment) REFERENCES moviments (id_moviment),
    CONSTRAINT moviments_projectes_ibfk_2
        FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte)
)
    CHARSET = utf8mb4;

CREATE INDEX id_projecte
    ON moviments_projectes (id_projecte);

CREATE INDEX id_curs
    ON projectes (id_curs);

CREATE TABLE IF NOT EXISTS provincies
(
    id_provincia SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    id_pais      CHAR(2)           NOT NULL,
    CONSTRAINT provincies_ibfk_1
        FOREIGN KEY (id_provincia) REFERENCES ciutats (id_ciutat),
    CONSTRAINT provincies_ibfk_2
        FOREIGN KEY (id_pais) REFERENCES paisos (id_pais)
)
    CHARSET = utf8mb4;

ALTER TABLE ciutats
    ADD CONSTRAINT ciutats_ibfk_1
        FOREIGN KEY (id_provincia) REFERENCES provincies (id_provincia);

CREATE INDEX id_pais
    ON provincies (id_pais);

CREATE TABLE IF NOT EXISTS roles
(
    id_role TINYINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    role    VARCHAR(50) NOT NULL
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS tipus_agrupacions
(
    id_tipus_agrupacio SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom                VARCHAR(50) NOT NULL
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS agrupacions
(
    id_agrupacio       SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom                VARCHAR(100)                  NOT NULL,
    nif                VARCHAR(12)                   NOT NULL,
    id_tipus_agrupacio SMALLINT UNSIGNED DEFAULT '1' NOT NULL,
    CONSTRAINT agrupacions_ibfk_1
        FOREIGN KEY (id_tipus_agrupacio) REFERENCES tipus_agrupacions (id_tipus_agrupacio)
)
    CHARSET = utf8mb4;

CREATE INDEX id_tipus_agrupacio
    ON agrupacions (id_tipus_agrupacio);

CREATE TABLE IF NOT EXISTS tipus_avisos
(
    id_tipus_avis SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom           VARCHAR(100) NOT NULL,
    unique_name   VARCHAR(50)  NOT NULL,
    CONSTRAINT tipus_avisos_form_name_uindex
        UNIQUE (unique_name)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS avisos
(
    id_avis            SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    titol              VARCHAR(100)         NULL,
    descripcio         TEXT                 NULL,
    titol_acceptacions VARCHAR(100)         NULL,
    requerit           TINYINT(1) DEFAULT 0 NOT NULL,
    data_inici         DATE                 NULL,
    data_final         DATE                 NULL,
    id_tipus_avis      SMALLINT UNSIGNED    NULL,
    CONSTRAINT avisos_ibfk_1
        FOREIGN KEY (id_tipus_avis) REFERENCES tipus_avisos (id_tipus_avis)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS acceptacions_avis
(
    id_acceptacio_avis SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    titol              VARCHAR(255)         NOT NULL,
    descripcio         TEXT                 NULL,
    requerida          TINYINT(1) DEFAULT 0 NOT NULL,
    form_name          VARCHAR(50)          NOT NULL,
    id_avis            SMALLINT UNSIGNED    NOT NULL,
    CONSTRAINT acceptacions_avis_form_name_uindex
        UNIQUE (form_name),
    CONSTRAINT acceptacions_avis_ibfk_1
        FOREIGN KEY (id_avis) REFERENCES avisos (id_avis)
)
    CHARSET = utf8mb4;

CREATE INDEX id_avis
    ON acceptacions_avis (id_avis);

CREATE INDEX id_tipus_avis
    ON avisos (id_tipus_avis);

CREATE TABLE IF NOT EXISTS seccions_avis
(
    id_seccio_avis SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    titol          VARCHAR(100)      NOT NULL,
    descripcio     TEXT              NOT NULL,
    id_avis        SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT seccions_avis_ibfk_1
        FOREIGN KEY (id_avis) REFERENCES avisos (id_avis)
)
    CHARSET = utf8mb4;

CREATE INDEX id_avis
    ON seccions_avis (id_avis);

CREATE TABLE IF NOT EXISTS tipus_establiments
(
    id_tipus_establiment SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    nom                  VARCHAR(100)      NOT NULL
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS tipus_formacions
(
    id_tipus_formacio SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom               VARCHAR(50) NOT NULL
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS formacions
(
    id_formacio       SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom               VARCHAR(100)      NOT NULL,
    nom_curt          VARCHAR(50)       NULL,
    descripcio        VARCHAR(255)      NULL,
    num_persones      TINYINT UNSIGNED  NULL,
    id_tipus_formacio SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT formacions_nom_curt_uindex
        UNIQUE (nom_curt),
    CONSTRAINT formacions_ibfk_1
        FOREIGN KEY (id_tipus_formacio) REFERENCES tipus_formacions (id_tipus_formacio)
)
    CHARSET = utf8mb4;

CREATE INDEX id_tipus_formacio
    ON formacions (id_tipus_formacio);

CREATE TABLE IF NOT EXISTS formacions_agrupacions
(
    id_formacio  SMALLINT UNSIGNED NOT NULL,
    id_agrupacio SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_agrupacio, id_formacio),
    CONSTRAINT formacions_agrupacions_ibfk_1
        FOREIGN KEY (id_agrupacio) REFERENCES agrupacions (id_agrupacio),
    CONSTRAINT formacions_agrupacions_ibfk_2
        FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio)
)
    CHARSET = utf8mb4;

CREATE INDEX id_formacio
    ON formacions_agrupacions (id_formacio);

CREATE TABLE IF NOT EXISTS projectes_formacions
(
    id_projecte SMALLINT UNSIGNED NOT NULL,
    id_formacio SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_projecte, id_formacio),
    CONSTRAINT projectes_formacions_ibfk_1
        FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte),
    CONSTRAINT projectes_formacions_ibfk_2
        FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio)
)
    CHARSET = utf8mb4;

CREATE INDEX id_formacio
    ON projectes_formacions (id_formacio);

CREATE TABLE IF NOT EXISTS tipus_vies
(
    id_tipus_via SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom          VARCHAR(100) NOT NULL,
    abreviatura  VARCHAR(10)  NULL
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS localitzacions
(
    id_localitzacio SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    id_tipus_via    SMALLINT UNSIGNED DEFAULT '1' NOT NULL,
    carrer          VARCHAR(100)                  NOT NULL,
    numero          SMALLINT UNSIGNED             NULL,
    fins_numero     SMALLINT UNSIGNED             NULL,
    codi_postal     SMALLINT UNSIGNED ZEROFILL    NOT NULL,
    gmaps           VARCHAR(512)                  NULL,
    id_ciutat       SMALLINT UNSIGNED             NULL,
    CONSTRAINT localitzacions_ibfk_1
        FOREIGN KEY (id_ciutat) REFERENCES ciutats (id_ciutat),
    CONSTRAINT localitzacions_ibfk_2
        FOREIGN KEY (id_tipus_via) REFERENCES tipus_vies (id_tipus_via)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS esdeveniments
(
    id_esdeveniment         SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    dia_inici               DATE                         NOT NULL,
    hora_inici              TIME                         NULL,
    dia_final               DATE                         NULL,
    hora_final              TIME                         NULL,
    es_assaig_ordinari      TINYINT(1)       DEFAULT 0   NOT NULL,
    id_estat_esdeveniment   TINYINT UNSIGNED DEFAULT '2' NOT NULL,
    id_localitzacio         SMALLINT UNSIGNED            NULL,
    id_estat_localitzacio   TINYINT UNSIGNED DEFAULT '2' NULL,
    id_esdeveniment_ajornat SMALLINT UNSIGNED            NULL,
    notes                   TEXT                         NULL,
    CONSTRAINT esdeveniments_ibfk_2
        FOREIGN KEY (id_esdeveniment_ajornat) REFERENCES esdeveniments (id_esdeveniment),
    CONSTRAINT esdeveniments_ibfk_3
        FOREIGN KEY (id_estat_esdeveniment) REFERENCES estats_confirmacio (id_estat_confirmacio),
    CONSTRAINT esdeveniments_ibfk_4
        FOREIGN KEY (id_estat_localitzacio) REFERENCES estats_confirmacio (id_estat_confirmacio),
    CONSTRAINT esdeveniments_ibfk_5
        FOREIGN KEY (id_localitzacio) REFERENCES localitzacions (id_localitzacio)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS classes_activitat
(
    id_classe_activitat SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    id_activitat        SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT classes_activitat_ibfk_1
        FOREIGN KEY (id_classe_activitat) REFERENCES esdeveniments (id_esdeveniment),
    CONSTRAINT classes_activitat_ibfk_2
        FOREIGN KEY (id_activitat) REFERENCES activitats (id_activitat)
)
    CHARSET = utf8mb4;

CREATE INDEX id_activitat
    ON classes_activitat (id_activitat);

CREATE INDEX id_esdeveniment_ajornat
    ON esdeveniments (id_esdeveniment_ajornat);

CREATE INDEX id_estat_esdeveniment
    ON esdeveniments (id_estat_esdeveniment);

CREATE INDEX id_estat_localitzacio
    ON esdeveniments (id_estat_localitzacio);

CREATE INDEX id_localitzacio
    ON esdeveniments (id_localitzacio);

CREATE TABLE IF NOT EXISTS esdeveniments_musicals
(
    id_esdeveniment_musical SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    CONSTRAINT esdeveniments_musicals_ibfk_1
        FOREIGN KEY (id_esdeveniment_musical) REFERENCES esdeveniments (id_esdeveniment)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS assajos
(
    id_assaig  SMALLINT UNSIGNED    NOT NULL
        PRIMARY KEY,
    es_general TINYINT(1) DEFAULT 0 NOT NULL,
    es_extra   TINYINT(1) DEFAULT 0 NOT NULL,
    CONSTRAINT assajos_ibfk_1
        FOREIGN KEY (id_assaig) REFERENCES esdeveniments_musicals (id_esdeveniment_musical)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS assajos_formacions
(
    id_assaig   SMALLINT UNSIGNED NOT NULL,
    id_formacio SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_assaig, id_formacio),
    CONSTRAINT assajos_formacions_ibfk_1
        FOREIGN KEY (id_assaig) REFERENCES assajos (id_assaig),
    CONSTRAINT assajos_formacions_ibfk_2
        FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio)
)
    CHARSET = utf8mb4;

CREATE INDEX id_formacio
    ON assajos_formacions (id_formacio);

CREATE TABLE IF NOT EXISTS assajos_projectes
(
    id_assaig   SMALLINT UNSIGNED NOT NULL,
    id_projecte SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_assaig, id_projecte),
    CONSTRAINT assajos_projectes_ibfk_1
        FOREIGN KEY (id_assaig) REFERENCES assajos (id_assaig),
    CONSTRAINT assajos_projectes_ibfk_2
        FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte)
)
    CHARSET = utf8mb4;

CREATE INDEX id_projecte
    ON assajos_projectes (id_projecte);

CREATE TABLE IF NOT EXISTS concerts
(
    id_concert  SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    titol       VARCHAR(50)       NOT NULL,
    id_projecte SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT concerts_ibfk_2
        FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte),
    CONSTRAINT concerts_ibfk_3
        FOREIGN KEY (id_concert) REFERENCES esdeveniments_musicals (id_esdeveniment_musical)
)
    CHARSET = utf8mb4;

CREATE INDEX id_projecte
    ON concerts (id_projecte);

CREATE TABLE IF NOT EXISTS establiments
(
    id_establiment       SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    nom                  VARCHAR(100)      NOT NULL,
    descripcio           TEXT              NULL,
    lloc_web             VARCHAR(255)      NULL,
    id_tipus_establiment SMALLINT UNSIGNED NULL,
    CONSTRAINT establiments_ibfk_1
        FOREIGN KEY (id_establiment) REFERENCES localitzacions (id_localitzacio),
    CONSTRAINT establiments_ibfk_2
        FOREIGN KEY (id_tipus_establiment) REFERENCES tipus_establiments (id_tipus_establiment)
)
    CHARSET = utf8mb4;

CREATE INDEX id_tipus_establiment
    ON establiments (id_tipus_establiment);

CREATE TABLE IF NOT EXISTS formacions_concerts
(
    id_formacio SMALLINT UNSIGNED NOT NULL,
    id_concert  SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_formacio, id_concert),
    CONSTRAINT formacions_concerts_ibfk_1
        FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio),
    CONSTRAINT formacions_concerts_ibfk_2
        FOREIGN KEY (id_concert) REFERENCES concerts (id_concert)
)
    CHARSET = utf8mb4;

CREATE INDEX id_concert
    ON formacions_concerts (id_concert);

CREATE INDEX id_ciutat
    ON localitzacions (id_ciutat);

CREATE INDEX id_tipus_via
    ON localitzacions (id_tipus_via);

CREATE TABLE IF NOT EXISTS moviments_esdeveniment_musical
(
    id_moviment_esdeveniment_musical SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    id_moviment                      SMALLINT UNSIGNED NOT NULL,
    id_esdeveniment_musical          SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT moviments_esdeveniment_musical_ibfk_1
        FOREIGN KEY (id_moviment) REFERENCES moviments (id_moviment),
    CONSTRAINT moviments_esdeveniment_musical_ibfk_2
        FOREIGN KEY (id_esdeveniment_musical) REFERENCES esdeveniments_musicals (id_esdeveniment_musical)
);

CREATE INDEX id_esdeveniment_musical
    ON moviments_esdeveniment_musical (id_esdeveniment_musical);

CREATE INDEX id_moviment
    ON moviments_esdeveniment_musical (id_moviment);

CREATE TABLE IF NOT EXISTS persones
(
    id_persona      SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom             VARCHAR(50)          NOT NULL,
    cognoms         VARCHAR(50)          NOT NULL,
    nom_complet     VARCHAR(101) AS (concat(nom, _utf8mb4' ', cognoms)),
    es_dona         TINYINT(1) DEFAULT 1 NOT NULL,
    naixement       DATE                 NULL,
    id_pais         CHAR(2)              NULL,
    dni             VARCHAR(12)          NULL,
    email           VARCHAR(50)          NULL,
    telefon         VARCHAR(14)          NULL,
    es_institucio   TINYINT(1) DEFAULT 0 NOT NULL,
    es_anonim       TINYINT(1) DEFAULT 0 NOT NULL,
    id_localitzacio SMALLINT UNSIGNED    NULL,
    CONSTRAINT persones_ibfk_1
        FOREIGN KEY (id_pais) REFERENCES paisos (id_pais),
    CONSTRAINT persones_ibfk_2
        FOREIGN KEY (id_localitzacio) REFERENCES localitzacions (id_localitzacio)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS autors
(
    id_autor SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    defuncio DATE              NULL,
    cataleg  VARCHAR(10)       NULL,
    CONSTRAINT autors_ibfk_1
        FOREIGN KEY (id_autor) REFERENCES persones (id_persona)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS directors
(
    id_director SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    CONSTRAINT directors_ibfk_1
        FOREIGN KEY (id_director) REFERENCES persones (id_persona)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS directors_concerts
(
    id_director SMALLINT UNSIGNED NOT NULL,
    id_concert  SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_director, id_concert),
    CONSTRAINT directors_concerts_ibfk_1
        FOREIGN KEY (id_director) REFERENCES directors (id_director),
    CONSTRAINT directors_concerts_ibfk_2
        FOREIGN KEY (id_concert) REFERENCES concerts (id_concert)
)
    CHARSET = utf8mb4;

CREATE INDEX id_concert
    ON directors_concerts (id_concert);

CREATE TABLE IF NOT EXISTS directors_formacions
(
    id_director SMALLINT UNSIGNED NOT NULL,
    id_formacio SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_director, id_formacio),
    CONSTRAINT directors_formacions_ibfk_1
        FOREIGN KEY (id_director) REFERENCES directors (id_director),
    CONSTRAINT directors_formacions_ibfk_2
        FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio)
)
    CHARSET = utf8mb4;

CREATE INDEX id_formacio
    ON directors_formacions (id_formacio);

CREATE TABLE IF NOT EXISTS directors_projectes
(
    id_projecte SMALLINT UNSIGNED NOT NULL,
    id_director SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_projecte, id_director),
    CONSTRAINT directors_projectes_ibfk_1
        FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte),
    CONSTRAINT directors_projectes_ibfk_2
        FOREIGN KEY (id_director) REFERENCES directors (id_director)
)
    CHARSET = utf8mb4;

CREATE INDEX id_director
    ON directors_projectes (id_director);

CREATE INDEX id_localitzacio
    ON persones (id_localitzacio);

CREATE INDEX id_pais
    ON persones (id_pais);

CREATE TABLE IF NOT EXISTS reunions
(
    id_reunio SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    CONSTRAINT reunions_ibfk_1
        FOREIGN KEY (id_reunio) REFERENCES esdeveniments (id_esdeveniment)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS assemblees
(
    id_assemblea      SMALLINT UNSIGNED    NOT NULL
        PRIMARY KEY,
    es_extraordinaria TINYINT(1) DEFAULT 0 NOT NULL,
    CONSTRAINT assemblees_ibfk_1
        FOREIGN KEY (id_assemblea) REFERENCES reunions (id_reunio)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS punts_reunio
(
    id_punt_reunio SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    ordre          TINYINT UNSIGNED  NOT NULL,
    titol          VARCHAR(255)      NOT NULL,
    descripcio     TEXT              NULL,
    id_reunio      SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT punts_reunio_ibfk_1
        FOREIGN KEY (id_reunio) REFERENCES reunions (id_reunio)
)
    CHARSET = utf8mb4;

CREATE INDEX id_reunio
    ON punts_reunio (id_reunio);

CREATE TABLE IF NOT EXISTS socis
(
    id_soci             SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    experiencia_musical TEXT              NULL,
    estudis_musicals    TEXT              NULL,
    CONSTRAINT socis_ibfk_1
        FOREIGN KEY (id_soci) REFERENCES persones (id_persona)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS assistents_esdeveniment
(
    id_esdeveniment      SMALLINT UNSIGNED            NOT NULL,
    id_soci              SMALLINT UNSIGNED            NOT NULL,
    amb_retard           TINYINT(1)       DEFAULT 0   NOT NULL,
    id_estat_confirmacio TINYINT UNSIGNED DEFAULT '2' NOT NULL,
    PRIMARY KEY (id_esdeveniment, id_soci),
    CONSTRAINT assistents_esdeveniment_ibfk_1
        FOREIGN KEY (id_esdeveniment) REFERENCES esdeveniments (id_esdeveniment),
    CONSTRAINT assistents_esdeveniment_ibfk_2
        FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    CONSTRAINT assistents_esdeveniment_ibfk_3
        FOREIGN KEY (id_estat_confirmacio) REFERENCES estats_confirmacio (id_estat_confirmacio)
)
    CHARSET = utf8mb4;

CREATE INDEX id_estat_confirmacio
    ON assistents_esdeveniment (id_estat_confirmacio);

CREATE INDEX id_soci
    ON assistents_esdeveniment (id_soci);

CREATE TABLE IF NOT EXISTS delegacionsvot_assemblea
(
    id_soci_delegant SMALLINT UNSIGNED NOT NULL,
    id_soci_delegat  SMALLINT UNSIGNED NOT NULL,
    id_assemblea     SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_soci_delegant, id_soci_delegat),
    CONSTRAINT delegacionsvot_assemblea_ibfk_1
        FOREIGN KEY (id_soci_delegant) REFERENCES socis (id_soci),
    CONSTRAINT delegacionsvot_assemblea_ibfk_2
        FOREIGN KEY (id_soci_delegat) REFERENCES socis (id_soci),
    CONSTRAINT delegacionsvot_assemblea_ibfk_3
        FOREIGN KEY (id_assemblea) REFERENCES assemblees (id_assemblea)
)
    CHARSET = utf8mb4;

CREATE INDEX id_assemblea
    ON delegacionsvot_assemblea (id_assemblea);

CREATE INDEX id_soci_delegat
    ON delegacionsvot_assemblea (id_soci_delegat);

CREATE TABLE IF NOT EXISTS historial_socis
(
    id_historial_soci SMALLINT UNSIGNED NOT NULL,
    data_alta         DATE              NOT NULL,
    data_baixa        DATE              NULL,
    PRIMARY KEY (id_historial_soci, data_alta),
    CONSTRAINT historial_socis_ibfk_1
        FOREIGN KEY (id_historial_soci) REFERENCES socis (id_soci)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS insignies_socis_curs
(
    id_insignia SMALLINT UNSIGNED NOT NULL,
    id_soci     SMALLINT UNSIGNED NOT NULL,
    id_curs     VARCHAR(5)        NOT NULL,
    PRIMARY KEY (id_insignia, id_soci, id_curs),
    CONSTRAINT insignies_socis_curs_ibfk_1
        FOREIGN KEY (id_insignia) REFERENCES insignies (id_insignia),
    CONSTRAINT insignies_socis_curs_ibfk_2
        FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    CONSTRAINT insignies_socis_curs_ibfk_3
        FOREIGN KEY (id_curs) REFERENCES cursos (id_curs)
)
    CHARSET = utf8mb4;

CREATE INDEX id_curs
    ON insignies_socis_curs (id_curs);

CREATE INDEX id_soci
    ON insignies_socis_curs (id_soci);

CREATE TABLE IF NOT EXISTS integrants_junta
(
    id_soci         SMALLINT UNSIGNED NOT NULL,
    id_carrec_junta TINYINT UNSIGNED  NOT NULL,
    data_inici      DATE              NOT NULL,
    data_final      DATE              NULL,
    PRIMARY KEY (id_soci, id_carrec_junta, data_inici),
    CONSTRAINT integrants_junta_ibfk_1
        FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    CONSTRAINT integrants_junta_ibfk_2
        FOREIGN KEY (id_carrec_junta) REFERENCES carrecs_junta (id_carrec_junta)
)
    CHARSET = utf8mb4;

CREATE INDEX id_carrec_junta
    ON integrants_junta (id_carrec_junta);

CREATE TABLE IF NOT EXISTS responsables_activitats
(
    id_activitat SMALLINT UNSIGNED NOT NULL,
    id_soci      SMALLINT UNSIGNED NOT NULL,
    data_inici   DATE              NOT NULL,
    data_final   DATE              NULL,
    PRIMARY KEY (id_activitat, id_soci, data_inici),
    CONSTRAINT responsables_activitats_ibfk_1
        FOREIGN KEY (id_activitat) REFERENCES activitats (id_activitat),
    CONSTRAINT responsables_activitats_ibfk_2
        FOREIGN KEY (id_soci) REFERENCES socis (id_soci)
);

CREATE INDEX id_soci
    ON responsables_activitats (id_soci);

CREATE TABLE IF NOT EXISTS responsables_activitats_no
(
    id_activitat SMALLINT UNSIGNED NOT NULL,
    id_soci      SMALLINT UNSIGNED NOT NULL,
    data_inici   DATE              NOT NULL,
    data_final   DATE              NULL,
    PRIMARY KEY (id_activitat, id_soci, data_inici),
    CONSTRAINT responsables_activitats_no_ibfk_1
        FOREIGN KEY (id_activitat) REFERENCES activitats (id_activitat),
    CONSTRAINT responsables_activitats_no_ibfk_2
        FOREIGN KEY (id_soci) REFERENCES socis (id_soci)
);

CREATE INDEX id_soci
    ON responsables_activitats_no (id_soci);

CREATE TABLE IF NOT EXISTS responsables_equips
(
    id_soci    SMALLINT UNSIGNED NOT NULL,
    id_equip   SMALLINT UNSIGNED NOT NULL,
    data_inici DATE              NOT NULL,
    data_final DATE              NULL,
    PRIMARY KEY (id_soci, id_equip, data_inici),
    CONSTRAINT responsables_equips_ibfk_1
        FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    CONSTRAINT responsables_equips_ibfk_2
        FOREIGN KEY (id_equip) REFERENCES equips (id_equip)
)
    CHARSET = utf8mb4;

CREATE INDEX id_equip
    ON responsables_equips (id_equip);

CREATE TABLE IF NOT EXISTS responsables_feines_equips
(
    id_soci        SMALLINT UNSIGNED NOT NULL,
    id_feina_equip SMALLINT UNSIGNED NOT NULL,
    data_inici     DATE              NOT NULL,
    data_final     DATE              NULL,
    PRIMARY KEY (id_soci, id_feina_equip, data_inici),
    CONSTRAINT responsables_feines_equips_ibfk_1
        FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    CONSTRAINT responsables_feines_equips_ibfk_2
        FOREIGN KEY (id_feina_equip) REFERENCES feines_equips (id_feina_equip)
)
    CHARSET = utf8mb4;

CREATE INDEX id_feina_equip
    ON responsables_feines_equips (id_feina_equip);

CREATE TABLE IF NOT EXISTS socis_acceptacions
(
    id_soci            SMALLINT UNSIGNED    NOT NULL,
    id_acceptacio_avis SMALLINT UNSIGNED    NOT NULL,
    accepta            TINYINT(1) DEFAULT 0 NOT NULL,
    PRIMARY KEY (id_soci, id_acceptacio_avis),
    CONSTRAINT socis_acceptacions_ibfk_1
        FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    CONSTRAINT socis_acceptacions_ibfk_2
        FOREIGN KEY (id_acceptacio_avis) REFERENCES acceptacions_avis (id_acceptacio_avis)
)
    CHARSET = utf8mb4;

CREATE INDEX id_acceptacio_avis
    ON socis_acceptacions (id_acceptacio_avis);

CREATE TABLE IF NOT EXISTS socis_activitats
(
    id_soci      SMALLINT UNSIGNED NOT NULL,
    id_activitat SMALLINT UNSIGNED NOT NULL,
    data_inici   DATE              NOT NULL,
    data_final   DATE              NULL,
    PRIMARY KEY (id_soci, id_activitat, data_inici),
    CONSTRAINT socis_activitats_ibfk_1
        FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    CONSTRAINT socis_activitats_ibfk_2
        FOREIGN KEY (id_activitat) REFERENCES activitats (id_activitat)
)
    CHARSET = utf8mb4;

CREATE INDEX id_activitat
    ON socis_activitats (id_activitat);

CREATE TABLE IF NOT EXISTS socis_formacions
(
    id_soci_formacio SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    id_soci          SMALLINT UNSIGNED NOT NULL,
    id_formacio      SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT socis_formacions_ibfk_1
        FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    CONSTRAINT socis_formacions_ibfk_2
        FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio)
)
    CHARSET = utf8mb4;

CREATE INDEX id_formacio
    ON socis_formacions (id_formacio);

CREATE INDEX id_soci
    ON socis_formacions (id_soci);

CREATE TABLE IF NOT EXISTS solistes
(
    id_solista SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    CONSTRAINT solistes_ibfk_1
        FOREIGN KEY (id_solista) REFERENCES persones (id_persona)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS solistes_concerts
(
    id_solista SMALLINT UNSIGNED NOT NULL,
    id_concert SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_solista, id_concert),
    CONSTRAINT solistes_concerts_ibfk_1
        FOREIGN KEY (id_solista) REFERENCES solistes (id_solista),
    CONSTRAINT solistes_concerts_ibfk_2
        FOREIGN KEY (id_concert) REFERENCES concerts (id_concert)
)
    CHARSET = utf8mb4;

CREATE INDEX id_concert
    ON solistes_concerts (id_concert);

CREATE TABLE IF NOT EXISTS titulars
(
    id_titular SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    titol      VARCHAR(255) NOT NULL,
    imatge     VARCHAR(255) NULL,
    data_inici DATETIME     NULL,
    data_final DATETIME     NULL,
    link       VARCHAR(255) NULL,
    ordre      TINYINT      NULL
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS trimestres
(
    id_trimestre SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    num          TINYINT UNSIGNED NOT NULL,
    data_inici   DATE             NULL,
    data_final   DATE             NULL,
    id_curs      VARCHAR(5)       NOT NULL,
    CONSTRAINT trimestres_ibfk_1
        FOREIGN KEY (id_curs) REFERENCES cursos (id_curs)
)
    CHARSET = utf8mb4;

CREATE INDEX id_curs
    ON trimestres (id_curs);

CREATE TABLE IF NOT EXISTS usuaris_complet
(
    id_usuari  SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    username   VARCHAR(20)                         NOT NULL,
    creacio    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_persona SMALLINT UNSIGNED                   NOT NULL,
    hash       VARCHAR(255)                        NOT NULL,
    CONSTRAINT id_persona
        UNIQUE (id_persona),
    CONSTRAINT usuaris_complet_ibfk_1
        FOREIGN KEY (id_persona) REFERENCES persones (id_persona)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS roles_usuaris
(
    id_usuari SMALLINT UNSIGNED NOT NULL,
    id_role   TINYINT UNSIGNED  NOT NULL,
    PRIMARY KEY (id_usuari, id_role),
    CONSTRAINT roles_usuaris_ibfk_1
        FOREIGN KEY (id_usuari) REFERENCES usuaris_complet (id_usuari),
    CONSTRAINT roles_usuaris_ibfk_2
        FOREIGN KEY (id_role) REFERENCES roles (id_role)
)
    CHARSET = utf8mb4;

CREATE INDEX id_perfil
    ON roles_usuaris (id_role);

CREATE TABLE IF NOT EXISTS veus
(
    id_veu      TINYINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom         VARCHAR(20) NOT NULL,
    abreviatura VARCHAR(2)  NOT NULL
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS socis_formacions_veus
(
    id_soci_formacio SMALLINT UNSIGNED NOT NULL,
    id_veu           TINYINT UNSIGNED  NOT NULL,
    data_inici       DATE              NOT NULL,
    data_final       DATE              NULL,
    PRIMARY KEY (id_soci_formacio, id_veu, data_inici),
    CONSTRAINT socis_formacions_veus_ibfk_1
        FOREIGN KEY (id_soci_formacio) REFERENCES socis_formacions (id_soci_formacio),
    CONSTRAINT socis_formacions_veus_ibfk_2
        FOREIGN KEY (id_veu) REFERENCES veus (id_veu)
)
    CHARSET = utf8mb4;

CREATE INDEX id_veu
    ON socis_formacions_veus (id_veu);

CREATE TABLE IF NOT EXISTS socis_projectes_veu
(
    id_soci     SMALLINT UNSIGNED NOT NULL,
    id_projecte SMALLINT UNSIGNED NOT NULL,
    id_veu      TINYINT UNSIGNED  NOT NULL,
    PRIMARY KEY (id_soci, id_projecte),
    CONSTRAINT socis_projectes_veu_ibfk_1
        FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    CONSTRAINT socis_projectes_veu_ibfk_2
        FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte),
    CONSTRAINT socis_projectes_veu_ibfk_3
        FOREIGN KEY (id_veu) REFERENCES veus (id_veu)
)
    CHARSET = utf8mb4;

CREATE INDEX id_projecte
    ON socis_projectes_veu (id_projecte);

CREATE INDEX id_veu
    ON socis_projectes_veu (id_veu);

CREATE TABLE IF NOT EXISTS veus_convocades_assaig
(
    id_assaig SMALLINT UNSIGNED NOT NULL,
    id_veu    TINYINT(1)        NOT NULL,
    PRIMARY KEY (id_assaig, id_veu),
    CONSTRAINT veus_convocades_assaig_ibfk_1
        FOREIGN KEY (id_assaig) REFERENCES assajos (id_assaig)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS veus_moviments
(
    id_veu_moviment SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    divisi          TINYINT UNSIGNED  NULL,
    id_veu          TINYINT UNSIGNED  NOT NULL,
    id_moviment     SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT veus_moviments_ibfk_1
        FOREIGN KEY (id_veu) REFERENCES veus (id_veu),
    CONSTRAINT veus_moviments_ibfk_2
        FOREIGN KEY (id_moviment) REFERENCES moviments (id_moviment)
)
    CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS socis_veu_moviment_projectes
(
    id_soci         SMALLINT UNSIGNED NOT NULL,
    id_veu_moviment SMALLINT UNSIGNED NOT NULL,
    id_projecte     SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_soci, id_veu_moviment, id_projecte),
    CONSTRAINT socis_veu_moviment_projectes_ibfk_1
        FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    CONSTRAINT socis_veu_moviment_projectes_ibfk_2
        FOREIGN KEY (id_veu_moviment) REFERENCES veus_moviments (id_veu_moviment),
    CONSTRAINT socis_veu_moviment_projectes_ibfk_3
        FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte)
)
    CHARSET = utf8mb4;

CREATE INDEX id_projecte
    ON socis_veu_moviment_projectes (id_projecte);

CREATE INDEX id_veu_moviment
    ON socis_veu_moviment_projectes (id_veu_moviment);

CREATE INDEX id_moviment
    ON veus_moviments (id_moviment);

CREATE INDEX id_veu
    ON veus_moviments (id_veu);

CREATE OR REPLACE VIEW assajos_estat AS
SELECT DISTINCT ee.id_esdeveniment                                        AS id_esdeveniment,
                ee.data_inici                                             AS data_inici,
                ee.dia_inici                                              AS dia_inici,
                ee.hora_inici                                             AS hora_inici,
                ee.data_final                                             AS data_final,
                ee.dia_final                                              AS dia_final,
                ee.hora_final                                             AS hora_final,
                ee.localitzacio                                           AS localitzacio,
                ee.establiment                                            AS establiment,
                ee.id_esdeveniment_ajornat                                AS id_esdeveniment_ajornat,
                ee.id_estat_esdeveniment                                  AS id_estat_esdeveniment,
                ee.estat_esdeveniment                                     AS estat_esdeveniment,
                ee.id_estat_localitzacio                                  AS id_estat_localitzacio,
                ee.estat_localitzacio                                     AS estat_localitzacio,
                a.id_assaig                                               AS id_assaig,
                assajos_son_parcials.es_parcial                           AS es_parcial,
                concat('Assaig', if(assajos_son_parcials.es_parcial, ' parcial', ''), if(a.es_general, ' general', ''),
                       if(a.es_extra, ' extra', ''))                      AS titol,
                (SELECT ifnull(json_arrayagg(json_object('id_formacio', ccsc.formacions.id_formacio, 'nom',
                                                         ccsc.formacions.nom, 'nom_curt',
                                                         ifnull(ccsc.formacions.nom_curt, ccsc.formacions.nom))), '[]')
                 FROM (ccsc.formacions
                          JOIN ccsc.assajos_formacions
                               ON ((ccsc.formacions.id_formacio = ccsc.assajos_formacions.id_formacio)))
                 WHERE (ccsc.assajos_formacions.id_assaig = a.id_assaig)) AS formacions,
                (SELECT ifnull(json_arrayagg(json_object('id_projecte', ccsc.projectes.id_projecte, 'titol',
                                                         ccsc.projectes.titol, 'inicials', ccsc.projectes.inicials,
                                                         'color', ccsc.projectes.color)), '[]')
                 FROM (ccsc.projectes
                          JOIN ccsc.assajos_projectes
                               ON ((ccsc.projectes.id_projecte = ccsc.assajos_projectes.id_projecte)))
                 WHERE (ccsc.assajos_projectes.id_assaig = a.id_assaig))  AS projectes
FROM ((ccsc.assajos a JOIN ccsc.esdeveniments_estat ee ON ((ee.id_esdeveniment = a.id_assaig)))
         LEFT JOIN ccsc.assajos_son_parcials ON ((a.id_assaig = assajos_son_parcials.id_assaig)));

CREATE OR REPLACE VIEW assajos_estat_moviments AS
SELECT ae.id_esdeveniment                                                                   AS id_esdeveniment,
       ae.data_inici                                                                        AS data_inici,
       ae.dia_inici                                                                         AS dia_inici,
       ae.hora_inici                                                                        AS hora_inici,
       ae.data_final                                                                        AS data_final,
       ae.dia_final                                                                         AS dia_final,
       ae.hora_final                                                                        AS hora_final,
       ae.localitzacio                                                                      AS localitzacio,
       ae.establiment                                                                       AS establiment,
       ae.id_esdeveniment_ajornat                                                           AS id_esdeveniment_ajornat,
       ae.id_estat_esdeveniment                                                             AS id_estat_esdeveniment,
       ae.estat_esdeveniment                                                                AS estat_esdeveniment,
       ae.id_estat_localitzacio                                                             AS id_estat_localitzacio,
       ae.estat_localitzacio                                                                AS estat_localitzacio,
       ae.id_assaig                                                                         AS id_assaig,
       ae.es_parcial                                                                        AS es_parcial,
       ae.titol                                                                             AS titol,
       ae.formacions                                                                        AS formacions,
       ae.projectes                                                                         AS projectes,
       (SELECT ifnull(json_arrayagg(json_object('id_moviment', m.id_moviment, 'id_obra', m.id_obra, 'titol_moviment',
                                                m.titol_moviment, 'titol_obra', m.titol_obra, 'ordre', m.ordre,
                                                'es_unic_moviment', m.es_unic_moviment)), '[]')
        FROM (ccsc.moviments_full m
                 JOIN ccsc.moviments_esdeveniment_musical
                      ON ((m.id_moviment = ccsc.moviments_esdeveniment_musical.id_moviment)))
        WHERE (ccsc.moviments_esdeveniment_musical.id_esdeveniment_musical = ae.id_assaig)) AS moviments
FROM ccsc.assajos_estat ae;

CREATE OR REPLACE VIEW assajos_son_parcials AS
SELECT DISTINCT a.id_assaig                                                         AS id_assaig,
                exists(SELECT ccsc.veus_convocades_assaig.id_veu
                       FROM ccsc.veus_convocades_assaig
                       WHERE (ccsc.veus_convocades_assaig.id_assaig = a.id_assaig)) AS es_parcial
FROM (ccsc.assajos a
         JOIN ccsc.veus v);

CREATE OR REPLACE VIEW assajos_veus AS
SELECT asp.id_assaig  AS id_assaig,
       asp.es_parcial AS es_parcial,
       if(((0 = asp.es_parcial) OR (0 <> (SELECT ccsc.veus_convocades_assaig.id_veu
                                          FROM ccsc.veus_convocades_assaig
                                          WHERE ((ccsc.veus_convocades_assaig.id_veu = v.id_veu) AND
                                                 (ccsc.veus_convocades_assaig.id_assaig = asp.id_assaig))))), v.id_veu,
          NULL)       AS id_veu,
       v.nom          AS nom_veu,
       v.abreviatura  AS abreviatura_veu
FROM (ccsc.assajos_son_parcials asp
         JOIN ccsc.veus v);

CREATE OR REPLACE VIEW esdeveniments_estat AS
SELECT DISTINCT e.id_esdeveniment                                                                AS id_esdeveniment,
                ifnull(concat(e.dia_inici, ' ', e.hora_inici), e.dia_inici)                      AS data_inici,
                date_format(e.dia_inici, '%Y-%m-%d')                                             AS dia_inici,
                e.hora_inici                                                                     AS hora_inici,
                ifnull(concat(ifnull(e.dia_final, e.dia_inici), ' ', e.hora_final), e.dia_final) AS data_final,
                date_format(ifnull(e.dia_final, e.dia_inici), '%Y-%m-%d')                        AS dia_final,
                e.hora_final                                                                     AS hora_final,
                (SELECT concat_ws(' ', tv.nom, concat(ccsc.localitzacions.carrer, ','), concat(
                        ifnull(concat(ccsc.localitzacions.numero, '–', ccsc.localitzacions.fins_numero),
                               concat(ccsc.localitzacions.numero)), ','), c.nom, concat('(', (SELECT ccsc.ciutats.nom
                                                                                              FROM ccsc.ciutats
                                                                                              WHERE (ccsc.ciutats.id_ciutat = (SELECT c.id_provincia))),
                                                                                        ')'))
                 FROM ((ccsc.localitzacions JOIN ccsc.tipus_vies tv ON ((ccsc.localitzacions.id_tipus_via = tv.id_tipus_via)))
                          JOIN ccsc.ciutats c ON ((ccsc.localitzacions.id_ciutat = c.id_ciutat)))
                 WHERE (ccsc.localitzacions.id_localitzacio = (SELECT e.id_localitzacio)))       AS localitzacio,
                (SELECT e2.nom
                 FROM (ccsc.localitzacions
                          JOIN ccsc.establiments e2 ON ((ccsc.localitzacions.id_localitzacio = e2.id_establiment)))
                 WHERE (ccsc.localitzacions.id_localitzacio = (SELECT e.id_localitzacio)))       AS establiment,
                e.id_esdeveniment_ajornat                                                        AS id_esdeveniment_ajornat,
                e.id_estat_esdeveniment                                                          AS id_estat_esdeveniment,
                (SELECT ccsc.estats_confirmacio.estat
                 FROM ccsc.estats_confirmacio
                 WHERE (ccsc.estats_confirmacio.id_estat_confirmacio =
                        (SELECT e.id_estat_esdeveniment)))                                       AS estat_esdeveniment,
                e.id_estat_localitzacio                                                          AS id_estat_localitzacio,
                (SELECT ccsc.estats_confirmacio.estat
                 FROM ccsc.estats_confirmacio
                 WHERE (ccsc.estats_confirmacio.id_estat_confirmacio =
                        (SELECT e.id_estat_localitzacio)))                                       AS estat_localitzacio
FROM ccsc.esdeveniments e;

CREATE OR REPLACE VIEW moviments_full AS
SELECT o.id_obra                                                                    AS id_obra,
       o.num_cataleg                                                                AS num_cataleg,
       m.id_moviment                                                                AS id_moviment,
       m.ordre                                                                      AS ordre,
       (SELECT (NOT exists(SELECT 1
                           FROM ccsc.moviments
                           WHERE ((ccsc.moviments.id_obra = o.id_obra) AND
                                  (ccsc.moviments.id_moviment <> m.id_moviment))))) AS es_unic_moviment,
       m.durada                                                                     AS durada,
       ifnull(m.titol, o.titol)                                                     AS titol_moviment,
       o.titol                                                                      AS titol_obra,
       o.any_inici                                                                  AS any_inici,
       (SELECT ifnull(json_arrayagg(
                              json_object('id_projecte', ccsc.projectes.id_projecte, 'titol', ccsc.projectes.titol,
                                          'inicials', ccsc.projectes.inicials, 'color', ccsc.projectes.color)), '[]')
        FROM (ccsc.projectes
                 JOIN ccsc.moviments_projectes ON ((ccsc.projectes.id_projecte = ccsc.moviments_projectes.id_projecte)))
        WHERE (ccsc.moviments_projectes.id_moviment = m.id_moviment))               AS projectes
FROM (ccsc.moviments m
         JOIN ccsc.obres o ON ((m.id_obra = o.id_obra)));

CREATE OR REPLACE VIEW projectes_full AS
SELECT DISTINCT ccsc.projectes.id_projecte                                                            AS id_projecte,
                ccsc.projectes.titol                                                                  AS titol,
                ccsc.projectes.descripcio                                                             AS descripcio,
                ccsc.projectes.inicials                                                               AS inicials,
                ccsc.projectes.color                                                                  AS color,
                ccsc.projectes.data_inici                                                             AS data_inici,
                ccsc.projectes.data_final                                                             AS data_final,
                ccsc.projectes.id_curs                                                                AS id_curs,
                year(ccsc.cursos.inici)                                                               AS any_inici_curs,
                year(ccsc.cursos.final)                                                               AS any_final_curs,
                (SELECT ifnull(json_arrayagg(json_object('id_director', ccsc.directors_projectes.id_director, 'nom',
                                                         p.nom_complet)), '[]')
                 FROM (ccsc.directors_projectes
                          JOIN ccsc.persones p ON ((ccsc.directors_projectes.id_director = p.id_persona)))
                 WHERE (ccsc.directors_projectes.id_projecte = (SELECT ccsc.projectes.id_projecte)))  AS directors,
                (SELECT ifnull(json_arrayagg(json_object('id_formacio', ccsc.formacions.id_formacio, 'nom',
                                                         ccsc.formacions.nom, 'nom_curt',
                                                         ifnull(ccsc.formacions.nom_curt, ccsc.formacions.nom))), '[]')
                 FROM (ccsc.projectes_formacions
                          JOIN ccsc.formacions
                               ON ((ccsc.projectes_formacions.id_formacio = ccsc.formacions.id_formacio)))
                 WHERE (ccsc.projectes_formacions.id_projecte = (SELECT ccsc.projectes.id_projecte))) AS formacions
FROM (ccsc.projectes
         JOIN ccsc.cursos ON ((ccsc.projectes.id_curs = ccsc.cursos.id_curs)))
ORDER BY (ccsc.projectes.data_inici IS NULL), ccsc.projectes.data_inici, (ccsc.projectes.data_final IS NULL),
         ccsc.projectes.data_final, ccsc.projectes.titol;

CREATE OR REPLACE VIEW socis_convocats_assajos AS
SELECT sv.id_persona                                                                               AS id_persona,
       sv.id_soci                                                                                  AS id_soci,
       sv.nom                                                                                      AS nom,
       sv.cognoms                                                                                  AS cognoms,
       sv.nom_complet                                                                              AS nom_complet,
       av.id_assaig                                                                                AS id_assaig,
       av.es_parcial                                                                               AS es_parcial,
       av.id_veu                                                                                   AS id_veu,
       av.nom_veu                                                                                  AS nom_veu,
       av.abreviatura_veu                                                                          AS abreviatura_veu,
       if(ae.amb_retard, TRUE, FALSE)                                                              AS amb_retard,
       ifnull(ec.id_estat_confirmacio, 1)                                                          AS id_estat_confirmacio,
       (SELECT ccsc.estats_confirmacio.estat
        FROM ccsc.estats_confirmacio
        WHERE (ccsc.estats_confirmacio.id_estat_confirmacio = ifnull(ec.id_estat_confirmacio, 1))) AS estat
FROM ((((ccsc.assajos_veus av LEFT JOIN ccsc.socis_veus sv ON ((av.id_veu = sv.id_veu))) LEFT JOIN ccsc.assajos a ON ((av.id_assaig = a.id_assaig))) LEFT JOIN ccsc.assistents_esdeveniment ae ON (((ae.id_soci = sv.id_soci) AND (ae.id_esdeveniment = a.id_assaig))))
         LEFT JOIN ccsc.estats_confirmacio ec ON ((ec.id_estat_confirmacio = ae.id_estat_confirmacio)))
WHERE (((exists(SELECT 1
                FROM (ccsc.assajos
                         JOIN ccsc.veus_convocades_assaig
                              ON ((ccsc.assajos.id_assaig = ccsc.veus_convocades_assaig.id_assaig)))
                WHERE (ccsc.assajos.id_assaig = a.id_assaig)) IS FALSE AND exists(SELECT 1
                                                                                  FROM ((ccsc.assajos JOIN ccsc.assajos_formacions ON ((ccsc.assajos.id_assaig = ccsc.assajos_formacions.id_assaig)))
                                                                                           JOIN ccsc.socis_formacions
                                                                                                ON ((ccsc.assajos_formacions.id_formacio =
                                                                                                     ccsc.socis_formacions.id_formacio)))
                                                                                  WHERE ((ccsc.assajos.id_assaig = a.id_assaig) AND
                                                                                         (ccsc.socis_formacions.id_soci = sv.id_soci)))) OR
        sv.id_veu IN (SELECT DISTINCT ccsc.veus_convocades_assaig.id_veu
                      FROM (ccsc.assajos
                               JOIN ccsc.veus_convocades_assaig
                                    ON ((ccsc.assajos.id_assaig = ccsc.veus_convocades_assaig.id_assaig)))
                      WHERE (ccsc.assajos.id_assaig = a.id_assaig))) AND sv.id_soci IN (SELECT ccsc.socis.id_soci
                                                                                        FROM ((ccsc.socis JOIN ccsc.socis_formacions ON ((ccsc.socis.id_soci = ccsc.socis_formacions.id_soci)))
                                                                                                 JOIN ccsc.assajos_formacions
                                                                                                      ON ((ccsc.socis_formacions.id_formacio =
                                                                                                           ccsc.assajos_formacions.id_formacio)))
                                                                                        WHERE (ccsc.assajos_formacions.id_assaig = a.id_assaig)));

CREATE OR REPLACE VIEW socis_veus AS
SELECT p.id_persona                                                                 AS id_persona,
       s.id_soci                                                                    AS id_soci,
       p.nom                                                                        AS nom,
       p.cognoms                                                                    AS cognoms,
       p.nom_complet                                                                AS nom_complet,
       (SELECT ifnull((SELECT group_concat(ccsc.veus_moviments.id_veu SEPARATOR ',')
                       FROM (ccsc.socis_veu_moviment_projectes
                                JOIN ccsc.veus_moviments ON ((ccsc.socis_veu_moviment_projectes.id_veu_moviment =
                                                              ccsc.veus_moviments.id_veu_moviment)))
                       WHERE (ccsc.socis_veu_moviment_projectes.id_soci = s.id_soci)),
                      ifnull((SELECT group_concat(ccsc.socis_projectes_veu.id_veu SEPARATOR ',')
                              FROM ccsc.socis_projectes_veu
                              WHERE (ccsc.socis_projectes_veu.id_soci = s.id_soci)),
                             (SELECT group_concat(ccsc.socis_formacions_veus.id_veu SEPARATOR ',')
                              FROM ((ccsc.socis_formacions_veus JOIN ccsc.socis_formacions ON ((
                                      ccsc.socis_formacions_veus.id_soci_formacio =
                                      ccsc.socis_formacions.id_soci_formacio)))
                                       JOIN ccsc.formacions
                                            ON ((ccsc.socis_formacions.id_formacio = ccsc.formacions.id_formacio)))
                              WHERE (ccsc.socis_formacions.id_soci = s.id_soci))))) AS id_veu
FROM (ccsc.socis s
         JOIN ccsc.persones p ON ((p.id_persona = s.id_soci)));

CREATE OR REPLACE VIEW usuaris AS
SELECT ccsc.usuaris_complet.id_usuari  AS id_usuari,
       ccsc.usuaris_complet.username   AS username,
       ccsc.usuaris_complet.creacio    AS creacio,
       ccsc.usuaris_complet.id_persona AS id_persona
FROM ccsc.usuaris_complet;

CREATE OR REPLACE VIEW usuaris_info AS
SELECT uc.id_usuari                                                                                                          AS id_usuari,
       uc.username                                                                                                           AS username,
       p.nom                                                                                                                 AS nom,
       p.cognoms                                                                                                             AS cognoms,
       p.es_dona                                                                                                             AS es_dona,
       uc.id_persona                                                                                                         AS id_persona,
       uc.hash                                                                                                               AS hash,
       (SELECT json_arrayagg(ccsc.roles.role)
        FROM (ccsc.roles_usuaris
                 JOIN ccsc.roles ON ((ccsc.roles_usuaris.id_role = ccsc.roles.id_role)))
        WHERE (ccsc.roles_usuaris.id_usuari = uc.id_usuari))                                                                 AS roles,
       (SELECT ifnull(json_arrayagg(ccsc.tipus_avisos.unique_name), '[]')
        FROM ((ccsc.avisos JOIN ccsc.tipus_avisos ON ((ccsc.avisos.id_tipus_avis = ccsc.tipus_avisos.id_tipus_avis)))
                 JOIN ccsc.acceptacions_avis av ON ((ccsc.avisos.id_avis = av.id_avis)))
        WHERE (((0 <> av.requerida) IS TRUE) AND exists(SELECT 1
                                                        FROM ccsc.socis_acceptacions
                                                        WHERE ((ccsc.socis_acceptacions.id_acceptacio_avis = av.id_acceptacio_avis) AND
                                                               ((0 <> ccsc.socis_acceptacions.accepta) IS TRUE) AND
                                                               (ccsc.socis_acceptacions.id_soci = p.id_persona))) IS FALSE)) AS avisos,
       exists(SELECT 1
              FROM (ccsc.socis s
                       JOIN ccsc.historial_socis hs ON ((s.id_soci = hs.id_historial_soci)))
              WHERE ((s.id_soci = p.id_persona) AND
                     (curdate() BETWEEN hs.data_alta AND ifnull((hs.data_baixa - INTERVAL 1 DAY), curdate())))
              ORDER BY hs.data_alta DESC)                                                                                    AS es_actiu
FROM (ccsc.usuaris_complet uc
         LEFT JOIN ccsc.persones p ON ((uc.id_persona = p.id_persona)));
