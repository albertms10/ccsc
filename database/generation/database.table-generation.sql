CREATE DATABASE amcc
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

SET default_storage_engine = innodb;

CREATE TABLE IF NOT EXISTS activitats
(
    id_activitat SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom          VARCHAR(50) NOT NULL,
    descripcio   TEXT        NOT NULL
);

CREATE TABLE IF NOT EXISTS carrecs_junta
(
    id_carrec_junta TINYINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    carrec          VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS ciutats
(
    id_ciutat    SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom          VARCHAR(50)       NOT NULL,
    id_provincia SMALLINT UNSIGNED NULL,
    CONSTRAINT nom
        UNIQUE (nom, id_provincia)
);

CREATE INDEX id_provincia
    ON ciutats (id_provincia);

CREATE TABLE IF NOT EXISTS cursos
(
    id_curs VARCHAR(5) NOT NULL
        PRIMARY KEY,
    inici   DATE       NOT NULL,
    final   DATE       NULL
);

CREATE TABLE IF NOT EXISTS emails_espera
(
    email VARCHAR(255) NOT NULL,
    CONSTRAINT emails_espera_email_uindex
        UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS equips
(
    id_equip   SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom        VARCHAR(100) NOT NULL,
    descripcio TEXT         NULL
);

CREATE TABLE IF NOT EXISTS estats_confirmacio
(
    id_estat_confirmacio TINYINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    estat                VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS feines_equips
(
    id_feina_equip SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom            VARCHAR(100)      NOT NULL,
    descripcio     TEXT              NULL,
    id_equip       SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT feines_equips_ibfk_1
        FOREIGN KEY (id_equip) REFERENCES equips (id_equip)
);

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
);

CREATE TABLE IF NOT EXISTS idiomes
(
    id_idioma CHAR(2)     NOT NULL
        PRIMARY KEY,
    nom       VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS insignies
(
    id_insignia SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom         VARCHAR(100) NOT NULL,
    descripcio  VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS missatges
(
    id_missatge SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom         VARCHAR(255)                        NOT NULL,
    email       VARCHAR(255)                        NOT NULL,
    missatge    TEXT                                NOT NULL,
    data        TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

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
);

CREATE TABLE IF NOT EXISTS moviments
(
    id_moviment SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    ordre       SMALLINT UNSIGNED NOT NULL,
    titol       VARCHAR(100)      NULL,
    durada      TIME              NULL,
    tonalitat   VARCHAR(10)       NULL,
    compassos   SMALLINT UNSIGNED NULL,
    id_obra     SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT moviments_ibfk_1
        FOREIGN KEY (id_obra) REFERENCES obres (id_obra)
);

CREATE INDEX id_obra
    ON moviments (id_obra);

CREATE INDEX id_idioma
    ON obres (id_idioma);

CREATE TABLE IF NOT EXISTS paisos
(
    id_pais CHAR(2)     NOT NULL
        PRIMARY KEY,
    nom     VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS parts_destacades_moviment
(
    id_part_destacada_moviment SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    id_moviment                SMALLINT UNSIGNED             NOT NULL,
    compas_inici               SMALLINT UNSIGNED DEFAULT '1' NOT NULL,
    compas_final               SMALLINT UNSIGNED             NULL,
    CONSTRAINT parts_destacades_moviment_ibfk_1
        FOREIGN KEY (id_moviment) REFERENCES moviments (id_moviment)
);

CREATE INDEX id_moviment
    ON parts_destacades_moviment (id_moviment);

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
);

CREATE TABLE IF NOT EXISTS moviments_projectes
(
    id_moviment SMALLINT UNSIGNED NOT NULL,
    id_projecte SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_moviment, id_projecte),
    CONSTRAINT moviments_projectes_ibfk_1
        FOREIGN KEY (id_moviment) REFERENCES moviments (id_moviment),
    CONSTRAINT moviments_projectes_ibfk_2
        FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte)
);

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
);

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
);

CREATE TABLE IF NOT EXISTS seccions_moviment
(
    id_seccio_moviment SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    id_moviment        SMALLINT UNSIGNED             NOT NULL,
    titol              VARCHAR(100)                  NULL,
    compas_inici       SMALLINT UNSIGNED DEFAULT '1' NOT NULL,
    compas_final       SMALLINT UNSIGNED             NULL,
    CONSTRAINT seccions_moviment_ibfk_1
        FOREIGN KEY (id_moviment) REFERENCES moviments (id_moviment)
);

CREATE INDEX id_moviment
    ON seccions_moviment (id_moviment);

CREATE TABLE IF NOT EXISTS tipus_avisos
(
    id_tipus_avis SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom           VARCHAR(100) NOT NULL,
    unique_name   VARCHAR(50)  NOT NULL,
    CONSTRAINT tipus_avisos_form_name_uindex
        UNIQUE (unique_name)
);

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
);

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
);

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
);

CREATE INDEX id_avis
    ON seccions_avis (id_avis);

CREATE TABLE IF NOT EXISTS tipus_entitats
(
    id_tipus_entitat SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom              VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS entitats
(
    id_entitat       SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom              VARCHAR(100)                  NOT NULL,
    nif              VARCHAR(12)                   NOT NULL,
    id_tipus_entitat SMALLINT UNSIGNED DEFAULT '1' NOT NULL,
    CONSTRAINT entitats_ibfk_1
        FOREIGN KEY (id_tipus_entitat) REFERENCES tipus_entitats (id_tipus_entitat)
);

CREATE INDEX id_tipus_entitat
    ON entitats (id_tipus_entitat);

CREATE TABLE IF NOT EXISTS tipus_establiments
(
    id_tipus_establiment SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    nom                  VARCHAR(100)      NOT NULL
);

CREATE TABLE IF NOT EXISTS tipus_formacions
(
    id_tipus_formacio SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom               VARCHAR(50) NOT NULL
);

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
);

CREATE INDEX id_tipus_formacio
    ON formacions (id_tipus_formacio);

CREATE TABLE IF NOT EXISTS formacions_entitats
(
    id_formacio SMALLINT UNSIGNED NOT NULL,
    id_entitat  SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_entitat, id_formacio),
    CONSTRAINT formacions_entitats_ibfk_1
        FOREIGN KEY (id_entitat) REFERENCES entitats (id_entitat),
    CONSTRAINT formacions_entitats_ibfk_2
        FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio)
);

CREATE INDEX id_formacio
    ON formacions_entitats (id_formacio);

CREATE TABLE IF NOT EXISTS projectes_formacions
(
    id_projecte SMALLINT UNSIGNED NOT NULL,
    id_formacio SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_projecte, id_formacio),
    CONSTRAINT projectes_formacions_ibfk_1
        FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte),
    CONSTRAINT projectes_formacions_ibfk_2
        FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio)
);

CREATE INDEX id_formacio
    ON projectes_formacions (id_formacio);

CREATE TABLE IF NOT EXISTS tipus_vies
(
    id_tipus_via SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom          VARCHAR(100) NOT NULL,
    abreviatura  VARCHAR(10)  NULL
);

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
);

CREATE TABLE IF NOT EXISTS esdeveniments
(
    id_esdeveniment         SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    data                    DATE                         NOT NULL,
    hora_inici              TIME                         NULL,
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
);

CREATE TABLE IF NOT EXISTS classes_activitat
(
    id_classe_activitat SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    id_activitat        SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT classes_activitat_ibfk_1
        FOREIGN KEY (id_classe_activitat) REFERENCES esdeveniments (id_esdeveniment),
    CONSTRAINT classes_activitat_ibfk_2
        FOREIGN KEY (id_activitat) REFERENCES activitats (id_activitat)
);

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
);

CREATE TABLE IF NOT EXISTS assajos
(
    id_assaig  SMALLINT UNSIGNED    NOT NULL
        PRIMARY KEY,
    es_general TINYINT(1) DEFAULT 0 NOT NULL,
    es_extra   TINYINT(1) DEFAULT 0 NOT NULL,
    CONSTRAINT assajos_ibfk_1
        FOREIGN KEY (id_assaig) REFERENCES esdeveniments_musicals (id_esdeveniment_musical)
);

CREATE TABLE IF NOT EXISTS assajos_formacions
(
    id_assaig   SMALLINT UNSIGNED NOT NULL,
    id_formacio SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_assaig, id_formacio),
    CONSTRAINT assajos_formacions_ibfk_1
        FOREIGN KEY (id_assaig) REFERENCES assajos (id_assaig),
    CONSTRAINT assajos_formacions_ibfk_2
        FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio)
);

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
);

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
);

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
);

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
);

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

CREATE TABLE IF NOT EXISTS fragments_moviment_esdeveniment_musical
(
    id_moviment_esdeveniment_musical SMALLINT UNSIGNED             NOT NULL,
    compas_inici                     SMALLINT UNSIGNED DEFAULT '1' NOT NULL,
    compas_final                     SMALLINT UNSIGNED             NULL,
    pes                              TINYINT UNSIGNED  DEFAULT '1' NOT NULL,
    nota                             TEXT                          NULL,
    PRIMARY KEY (id_moviment_esdeveniment_musical, compas_inici),
    CONSTRAINT fragments_moviment_esdeveniment_musical_ibfk_1
        FOREIGN KEY (id_moviment_esdeveniment_musical) REFERENCES moviments_esdeveniment_musical (id_moviment_esdeveniment_musical)
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
);

CREATE TABLE IF NOT EXISTS autors
(
    id_autor SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    defuncio DATE              NULL,
    cataleg  VARCHAR(10)       NULL,
    CONSTRAINT autors_ibfk_1
        FOREIGN KEY (id_autor) REFERENCES persones (id_persona)
);

CREATE TABLE IF NOT EXISTS directors
(
    id_director SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    CONSTRAINT directors_ibfk_1
        FOREIGN KEY (id_director) REFERENCES persones (id_persona)
);

CREATE TABLE IF NOT EXISTS directors_concerts
(
    id_director SMALLINT UNSIGNED NOT NULL,
    id_concert  SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_director, id_concert),
    CONSTRAINT directors_concerts_ibfk_1
        FOREIGN KEY (id_director) REFERENCES directors (id_director),
    CONSTRAINT directors_concerts_ibfk_2
        FOREIGN KEY (id_concert) REFERENCES concerts (id_concert)
);

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
);

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
);

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
);

CREATE TABLE IF NOT EXISTS assemblees
(
    id_assemblea      SMALLINT UNSIGNED    NOT NULL
        PRIMARY KEY,
    es_extraordinaria TINYINT(1) DEFAULT 0 NOT NULL,
    CONSTRAINT assemblees_ibfk_1
        FOREIGN KEY (id_assemblea) REFERENCES reunions (id_reunio)
);

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
);

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
);

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
);

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
);

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
);

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
);

CREATE INDEX id_curs
    ON insignies_socis_curs (id_curs);

CREATE INDEX id_soci
    ON insignies_socis_curs (id_soci);

CREATE TABLE IF NOT EXISTS membres_junta
(
    id_soci         SMALLINT UNSIGNED NOT NULL,
    id_carrec_junta TINYINT UNSIGNED  NOT NULL,
    data_inici      DATE              NOT NULL,
    data_final      DATE              NULL,
    PRIMARY KEY (id_soci, id_carrec_junta, data_inici),
    CONSTRAINT membres_junta_ibfk_1
        FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    CONSTRAINT membres_junta_ibfk_2
        FOREIGN KEY (id_carrec_junta) REFERENCES carrecs_junta (id_carrec_junta)
);

CREATE INDEX id_carrec_junta
    ON membres_junta (id_carrec_junta);

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
);

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
);

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
);

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
);

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
);

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
);

CREATE TABLE IF NOT EXISTS solistes_concerts
(
    id_solista SMALLINT UNSIGNED NOT NULL,
    id_concert SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_solista, id_concert),
    CONSTRAINT solistes_concerts_ibfk_1
        FOREIGN KEY (id_solista) REFERENCES solistes (id_solista),
    CONSTRAINT solistes_concerts_ibfk_2
        FOREIGN KEY (id_concert) REFERENCES concerts (id_concert)
);

CREATE INDEX id_concert
    ON solistes_concerts (id_concert);

CREATE TABLE IF NOT EXISTS titulars
(
    id_titular     SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    titol          VARCHAR(255) NOT NULL,
    imatge         VARCHAR(255) NULL,
    datahora_inici DATETIME     NULL,
    datahora_final DATETIME     NULL,
    link           VARCHAR(255) NULL,
    ordre          TINYINT      NULL
);

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
);

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
);

CREATE TABLE IF NOT EXISTS roles_usuaris
(
    id_usuari SMALLINT UNSIGNED NOT NULL,
    id_role   TINYINT UNSIGNED  NOT NULL,
    PRIMARY KEY (id_usuari, id_role),
    CONSTRAINT roles_usuaris_ibfk_1
        FOREIGN KEY (id_usuari) REFERENCES usuaris_complet (id_usuari),
    CONSTRAINT roles_usuaris_ibfk_2
        FOREIGN KEY (id_role) REFERENCES roles (id_role)
);

CREATE INDEX id_perfil
    ON roles_usuaris (id_role);

CREATE TABLE IF NOT EXISTS veus
(
    id_veu      TINYINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom         VARCHAR(20) NOT NULL,
    abreviatura VARCHAR(2)  NOT NULL
);

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
);

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
);

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
);

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
);

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
);

CREATE INDEX id_projecte
    ON socis_veu_moviment_projectes (id_projecte);

CREATE INDEX id_veu_moviment
    ON socis_veu_moviment_projectes (id_veu_moviment);

CREATE INDEX id_moviment
    ON veus_moviments (id_moviment);

CREATE INDEX id_veu
    ON veus_moviments (id_veu);

CREATE OR REPLACE VIEW assajos_estat AS
SELECT DISTINCT ee.id_esdeveniment                                   AS id_esdeveniment,
                ee.data                                              AS data,
                ee.datahora_inici                                    AS datahora_inici,
                ee.hora_inici                                        AS hora_inici,
                ee.datahora_final                                    AS datahora_final,
                ee.hora_final                                        AS hora_final,
                ee.localitzacio                                      AS localitzacio,
                ee.establiment                                       AS establiment,
                ee.id_esdeveniment_ajornat                           AS id_esdeveniment_ajornat,
                ee.id_estat_esdeveniment                             AS id_estat_esdeveniment,
                ee.estat_esdeveniment                                AS estat_esdeveniment,
                ee.id_estat_localitzacio                             AS id_estat_localitzacio,
                ee.estat_localitzacio                                AS estat_localitzacio,
                a.id_assaig                                          AS id_assaig,
                assajos_son_parcials.es_parcial                      AS es_parcial,
                concat('Assaig', if(assajos_son_parcials.es_parcial, ' parcial', ''), if(a.es_general, ' general', ''),
                       if(a.es_extra, ' extra', ''))                 AS titol,
                (SELECT cast(ifnull(json_arrayagg(json_object('id_formacio', formacions.id_formacio, 'nom',
                                                              formacions.nom, 'nom_curt',
                                                              ifnull(formacions.nom_curt, formacions.nom))),
                                    '[]') AS JSON)
                 FROM (formacions
                          JOIN assajos_formacions
                               ON ((formacions.id_formacio = assajos_formacions.id_formacio)))
                 WHERE (assajos_formacions.id_assaig = a.id_assaig)) AS formacions,
                (SELECT cast(ifnull(json_arrayagg(json_object('id_projecte', projectes.id_projecte, 'titol',
                                                              projectes.titol, 'inicials', projectes.inicials,
                                                              'color', projectes.color)), '[]') AS JSON)
                 FROM (projectes
                          JOIN assajos_projectes
                               ON ((projectes.id_projecte = assajos_projectes.id_projecte)))
                 WHERE (assajos_projectes.id_assaig = a.id_assaig))  AS projectes
FROM ((assajos a JOIN esdeveniments_estat ee ON ((ee.id_esdeveniment = a.id_assaig)))
         LEFT JOIN assajos_son_parcials ON ((a.id_assaig = assajos_son_parcials.id_assaig)));

CREATE OR REPLACE VIEW assajos_estat_moviments AS
SELECT ae.id_esdeveniment                                                              AS id_esdeveniment,
       ae.data                                                                         AS data,
       ae.datahora_inici                                                               AS datahora_inici,
       ae.hora_inici                                                                   AS hora_inici,
       ae.datahora_final                                                               AS datahora_final,
       ae.hora_final                                                                   AS hora_final,
       ae.localitzacio                                                                 AS localitzacio,
       ae.establiment                                                                  AS establiment,
       ae.id_esdeveniment_ajornat                                                      AS id_esdeveniment_ajornat,
       ae.id_estat_esdeveniment                                                        AS id_estat_esdeveniment,
       ae.estat_esdeveniment                                                           AS estat_esdeveniment,
       ae.id_estat_localitzacio                                                        AS id_estat_localitzacio,
       ae.estat_localitzacio                                                           AS estat_localitzacio,
       ae.id_assaig                                                                    AS id_assaig,
       ae.es_parcial                                                                   AS es_parcial,
       ae.titol                                                                        AS titol,
       ae.formacions                                                                   AS formacions,
       ae.projectes                                                                    AS projectes,
       (SELECT cast(ifnull(json_arrayagg(
                                   json_object('id_moviment', m.id_moviment, 'id_obra', m.id_obra, 'titol_moviment',
                                               m.titol_moviment, 'titol_obra', m.titol_obra, 'ordre', m.ordre,
                                               'compassos', m.compassos, 'es_unic_moviment', m.es_unic_moviment)),
                           '[]') AS JSON)
        FROM (moviments_full m
                 JOIN moviments_esdeveniment_musical
                      ON ((m.id_moviment = moviments_esdeveniment_musical.id_moviment)))
        WHERE (moviments_esdeveniment_musical.id_esdeveniment_musical = ae.id_assaig)) AS moviments
FROM assajos_estat ae;

CREATE OR REPLACE VIEW assajos_son_parcials AS
SELECT DISTINCT a.id_assaig                                                    AS id_assaig,
                exists(SELECT veus_convocades_assaig.id_veu
                       FROM veus_convocades_assaig
                       WHERE (veus_convocades_assaig.id_assaig = a.id_assaig)) AS es_parcial
FROM (assajos a
         JOIN veus v);

CREATE OR REPLACE VIEW assajos_veus AS
SELECT asp.id_assaig  AS id_assaig,
       asp.es_parcial AS es_parcial,
       if(((0 = asp.es_parcial) OR (0 <> (SELECT veus_convocades_assaig.id_veu
                                          FROM veus_convocades_assaig
                                          WHERE ((veus_convocades_assaig.id_veu = v.id_veu) AND
                                                 (veus_convocades_assaig.id_assaig = asp.id_assaig))))), v.id_veu,
          NULL)       AS id_veu,
       v.nom          AS nom_veu,
       v.abreviatura  AS abreviatura_veu
FROM (assajos_son_parcials asp
         JOIN veus v);

CREATE OR REPLACE VIEW esdeveniments_estat AS
SELECT DISTINCT e.id_esdeveniment                                                           AS id_esdeveniment,
                date_format(e.data, '%Y-%m-%d')                                             AS data,
                ifnull(concat(e.data, ' ', e.hora_inici), e.data)                           AS datahora_inici,
                e.hora_inici                                                                AS hora_inici,
                concat(e.data, ' ', e.hora_final)                                           AS datahora_final,
                e.hora_final                                                                AS hora_final,
                (SELECT concat_ws(' ', tv.nom, concat(localitzacions.carrer, ','), concat(
                        ifnull(concat(localitzacions.numero, '–', localitzacions.fins_numero),
                               concat(localitzacions.numero)), ','), c.nom, concat('(', (SELECT ciutats.nom
                                                                                         FROM ciutats
                                                                                         WHERE (ciutats.id_ciutat = c.id_provincia)),
                                                                                   ')'))
                 FROM ((localitzacions JOIN tipus_vies tv ON ((localitzacions.id_tipus_via = tv.id_tipus_via)))
                          JOIN ciutats c ON ((localitzacions.id_ciutat = c.id_ciutat)))
                 WHERE (localitzacions.id_localitzacio = e.id_localitzacio))                AS localitzacio,
                (SELECT e2.nom
                 FROM (localitzacions l
                          JOIN establiments e2 ON ((l.id_localitzacio = e2.id_establiment)))
                 WHERE (l.id_localitzacio = e.id_localitzacio))                             AS establiment,
                e.id_esdeveniment_ajornat                                                   AS id_esdeveniment_ajornat,
                e.id_estat_esdeveniment                                                     AS id_estat_esdeveniment,
                (SELECT estats_confirmacio.estat
                 FROM estats_confirmacio
                 WHERE (estats_confirmacio.id_estat_confirmacio = e.id_estat_esdeveniment)) AS estat_esdeveniment,
                e.id_estat_localitzacio                                                     AS id_estat_localitzacio,
                (SELECT estats_confirmacio.estat
                 FROM estats_confirmacio
                 WHERE (estats_confirmacio.id_estat_confirmacio = e.id_estat_localitzacio)) AS estat_localitzacio
FROM esdeveniments e;

CREATE OR REPLACE VIEW moviments_full AS
SELECT o.id_obra                                                               AS id_obra,
       o.num_cataleg                                                           AS num_cataleg,
       m.id_moviment                                                           AS id_moviment,
       m.ordre                                                                 AS ordre,
       (SELECT (NOT exists(SELECT 1
                           FROM moviments
                           WHERE ((moviments.id_obra = o.id_obra) AND
                                  (moviments.id_moviment <> m.id_moviment))))) AS es_unic_moviment,
       m.durada                                                                AS durada,
       ifnull(m.titol, o.titol)                                                AS titol_moviment,
       o.titol                                                                 AS titol_obra,
       o.any_inici                                                             AS any_inici,
       m.compassos                                                             AS compassos,
       (SELECT cast(ifnull(json_arrayagg(
                                   json_object('id_projecte', projectes.id_projecte, 'titol', projectes.titol,
                                               'inicials', projectes.inicials, 'color', projectes.color)),
                           '[]') AS JSON)
        FROM (projectes
                 JOIN moviments_projectes ON ((projectes.id_projecte = moviments_projectes.id_projecte)))
        WHERE (moviments_projectes.id_moviment = m.id_moviment))               AS projectes
FROM (moviments m
         JOIN obres o ON ((m.id_obra = o.id_obra)));

CREATE OR REPLACE VIEW projectes_full AS
SELECT DISTINCT p.id_projecte                                              AS id_projecte,
                p.titol                                                    AS titol,
                p.descripcio                                               AS descripcio,
                p.inicials                                                 AS inicials,
                p.color                                                    AS color,
                p.data_inici                                               AS data_inici,
                p.data_final                                               AS data_final,
                p.id_curs                                                  AS id_curs,
                year(c.inici)                                              AS any_inici_curs,
                year(c.final)                                              AS any_final_curs,
                (SELECT cast(ifnull(json_arrayagg(json_object('id_director', dp.id_director, 'nom', p.nom_complet)),
                                    '[]') AS JSON)
                 FROM (directors_projectes dp
                          JOIN persones p ON ((dp.id_director = p.id_persona)))
                 WHERE (dp.id_projecte = p.id_projecte))                   AS directors,
                (SELECT cast(ifnull(json_arrayagg(json_object('id_formacio', formacions.id_formacio, 'nom',
                                                              formacions.nom, 'nom_curt',
                                                              ifnull(formacions.nom_curt, formacions.nom))),
                                    '[]') AS JSON)
                 FROM (projectes_formacions
                          JOIN formacions
                               ON ((projectes_formacions.id_formacio = formacions.id_formacio)))
                 WHERE (projectes_formacions.id_projecte = p.id_projecte)) AS formacions
FROM (projectes p
         JOIN cursos c ON ((p.id_curs = c.id_curs)));

CREATE OR REPLACE VIEW socis_convocats_assajos AS
SELECT sv.id_persona                                                                          AS id_persona,
       sv.id_soci                                                                             AS id_soci,
       sv.nom                                                                                 AS nom,
       sv.cognoms                                                                             AS cognoms,
       sv.nom_complet                                                                         AS nom_complet,
       av.id_assaig                                                                           AS id_assaig,
       av.es_parcial                                                                          AS es_parcial,
       av.id_veu                                                                              AS id_veu,
       av.nom_veu                                                                             AS nom_veu,
       av.abreviatura_veu                                                                     AS abreviatura_veu,
       ae.amb_retard                                                                          AS amb_retard,
       ifnull(ec.id_estat_confirmacio, 1)                                                     AS id_estat_confirmacio,
       (SELECT estats_confirmacio.estat
        FROM estats_confirmacio
        WHERE (estats_confirmacio.id_estat_confirmacio = ifnull(ec.id_estat_confirmacio, 1))) AS estat
FROM ((((assajos_veus av LEFT JOIN socis_veus sv ON ((av.id_veu = sv.id_veu))) LEFT JOIN assajos a ON ((av.id_assaig = a.id_assaig))) LEFT JOIN assistents_esdeveniment ae ON (((ae.id_soci = sv.id_soci) AND (ae.id_esdeveniment = a.id_assaig))))
         LEFT JOIN estats_confirmacio ec ON ((ec.id_estat_confirmacio = ae.id_estat_confirmacio)))
WHERE (((exists(SELECT 1
                FROM (assajos
                         JOIN veus_convocades_assaig
                              ON ((assajos.id_assaig = veus_convocades_assaig.id_assaig)))
                WHERE (assajos.id_assaig = a.id_assaig)) IS FALSE AND exists(SELECT 1
                                                                             FROM ((assajos JOIN assajos_formacions ON ((assajos.id_assaig = assajos_formacions.id_assaig)))
                                                                                      JOIN socis_formacions
                                                                                           ON ((assajos_formacions.id_formacio =
                                                                                                socis_formacions.id_formacio)))
                                                                             WHERE ((assajos.id_assaig = a.id_assaig) AND
                                                                                    (socis_formacions.id_soci = sv.id_soci)))) OR
        sv.id_veu IN (SELECT DISTINCT veus_convocades_assaig.id_veu
                      FROM (assajos
                               JOIN veus_convocades_assaig
                                    ON ((assajos.id_assaig = veus_convocades_assaig.id_assaig)))
                      WHERE (assajos.id_assaig = a.id_assaig))) AND sv.id_soci IN (SELECT socis.id_soci
                                                                                   FROM ((socis JOIN socis_formacions ON ((socis.id_soci = socis_formacions.id_soci)))
                                                                                            JOIN assajos_formacions
                                                                                                 ON ((socis_formacions.id_formacio =
                                                                                                      assajos_formacions.id_formacio)))
                                                                                   WHERE (assajos_formacions.id_assaig = a.id_assaig)));

CREATE OR REPLACE VIEW socis_veus AS
SELECT p.id_persona                                                      AS id_persona,
       s.id_soci                                                         AS id_soci,
       p.nom                                                             AS nom,
       p.cognoms                                                         AS cognoms,
       p.nom_complet                                                     AS nom_complet,
       (SELECT coalesce((SELECT group_concat(veus_moviments.id_veu SEPARATOR ',')
                         FROM (socis_veu_moviment_projectes
                                  JOIN veus_moviments ON ((socis_veu_moviment_projectes.id_veu_moviment =
                                                           veus_moviments.id_veu_moviment)))
                         WHERE (socis_veu_moviment_projectes.id_soci = s.id_soci)),
                        (SELECT group_concat(socis_projectes_veu.id_veu SEPARATOR ',')
                         FROM socis_projectes_veu
                         WHERE (socis_projectes_veu.id_soci = s.id_soci)),
                        (SELECT group_concat(socis_formacions_veus.id_veu SEPARATOR ',')
                         FROM ((socis_formacions_veus JOIN socis_formacions ON ((
                                 socis_formacions_veus.id_soci_formacio = socis_formacions.id_soci_formacio)))
                                  JOIN formacions
                                       ON ((socis_formacions.id_formacio = formacions.id_formacio)))
                         WHERE (socis_formacions.id_soci = s.id_soci)))) AS id_veu
FROM (socis s
         JOIN persones p ON ((p.id_persona = s.id_soci)));

CREATE OR REPLACE VIEW usuaris AS
SELECT usuaris_complet.id_usuari  AS id_usuari,
       usuaris_complet.username   AS username,
       usuaris_complet.creacio    AS creacio,
       usuaris_complet.id_persona AS id_persona
FROM usuaris_complet;

CREATE OR REPLACE VIEW usuaris_info AS
SELECT uc.id_usuari                                                                                                     AS id_usuari,
       uc.username                                                                                                      AS username,
       p.nom                                                                                                            AS nom,
       p.cognoms                                                                                                        AS cognoms,
       p.es_dona                                                                                                        AS es_dona,
       uc.id_persona                                                                                                    AS id_persona,
       uc.hash                                                                                                          AS hash,
       (SELECT cast(ifnull(json_arrayagg(roles.role), '[]') AS JSON)
        FROM (roles_usuaris
                 JOIN roles ON ((roles_usuaris.id_role = roles.id_role)))
        WHERE (roles_usuaris.id_usuari = uc.id_usuari))                                                                 AS roles,
       (SELECT cast(ifnull(json_arrayagg(tipus_avisos.unique_name), '[]') AS JSON)
        FROM ((avisos JOIN tipus_avisos ON ((avisos.id_tipus_avis = tipus_avisos.id_tipus_avis)))
                 JOIN acceptacions_avis av ON ((avisos.id_avis = av.id_avis)))
        WHERE (((0 <> av.requerida) IS TRUE) AND exists(SELECT 1
                                                        FROM socis_acceptacions
                                                        WHERE ((socis_acceptacions.id_acceptacio_avis = av.id_acceptacio_avis) AND
                                                               ((0 <> socis_acceptacions.accepta) IS TRUE) AND
                                                               (socis_acceptacions.id_soci = p.id_persona))) IS FALSE)) AS avisos,
       exists(SELECT 1
              FROM (socis s
                       JOIN historial_socis hs ON ((s.id_soci = hs.id_historial_soci)))
              WHERE ((s.id_soci = p.id_persona) AND
                     (curdate() BETWEEN hs.data_alta AND ifnull((hs.data_baixa - INTERVAL 1 DAY), curdate())))
              ORDER BY hs.data_alta DESC)                                                                               AS es_actiu
FROM (usuaris_complet uc
         LEFT JOIN persones p ON ((uc.id_persona = p.id_persona)));

