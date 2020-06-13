CREATE TABLE IF NOT EXISTS activitats
(
    id_activitat SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom          VARCHAR(50) NOT NULL,
    descripcio   TEXT        NOT NULL
);

CREATE TABLE IF NOT EXISTS agrupacio
(
    id_agrupacio SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom           VARCHAR(100) NOT NULL,
    nif           VARCHAR(12)  NOT NULL
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
    id_curs       VARCHAR(5)                    NOT NULL
        PRIMARY KEY,
    inici         DATE                          NOT NULL,
    final         DATE                          NULL,
    id_agrupacio SMALLINT UNSIGNED DEFAULT '1' NOT NULL,
    CONSTRAINT cursos_ibfk_1
        FOREIGN KEY (id_agrupacio) REFERENCES agrupacions (id_agrupacio)
);

CREATE INDEX id_agrupacio
    ON cursos (id_agrupacio);

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

CREATE TABLE IF NOT EXISTS paisos
(
    id_pais CHAR(2)     NOT NULL
        PRIMARY KEY,
    nom     VARCHAR(50) NOT NULL
);

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

CREATE TABLE IF NOT EXISTS tipus_formacions
(
    id_tipus_formacio SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom                VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS formacions
(
    id_formacio       SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom                VARCHAR(100)      NOT NULL,
    nom_curt           VARCHAR(50)       NULL,
    descripcio         VARCHAR(255)      NULL,
    num_persones       TINYINT UNSIGNED  NULL,
    id_tipus_formacio SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT formacions_ibfk_1
        FOREIGN KEY (id_tipus_formacio) REFERENCES tipus_formacions (id_tipus_formacio)
);

CREATE INDEX id_tipus_formacio
    ON formacions (id_tipus_formacio);

CREATE TABLE IF NOT EXISTS formacions_agrupacio
(
    id_agrupacio SMALLINT UNSIGNED NOT NULL,
    id_formacio  SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_agrupacio, id_formacio),
    CONSTRAINT formacions_agrupacio_ibfk_1
        FOREIGN KEY (id_agrupacio) REFERENCES agrupacions (id_agrupacio),
    CONSTRAINT formacions_agrupacio_ibfk_2
        FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio)
);

CREATE INDEX id_formacio
    ON formacions_agrupacio (id_formacio);

CREATE TABLE IF NOT EXISTS projectes_formacions
(
    id_projecte  SMALLINT UNSIGNED NOT NULL,
    id_formacio SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_projecte, id_formacio),
    CONSTRAINT projectes_formacions_ibfk_1
        FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte),
    CONSTRAINT projectes_formacions_ibfk_2
        FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio)
);

CREATE INDEX id_formacio
    ON projectes_formacions (id_formacio);

CREATE TABLE IF NOT EXISTS tipus_avisos
(
    id_tipus_avis SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom           VARCHAR(100) NOT NULL
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

CREATE TABLE IF NOT EXISTS tipus_establiments
(
    id_tipus_establiment SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    nom                  VARCHAR(100)      NOT NULL
);

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
    dia_inici               DATE                         NOT NULL,
    hora_inici              TIME                         NULL,
    dia_final               DATE                         NULL,
    hora_final              TIME                         NULL,
    es_assaig_ordinari      TINYINT(1)       DEFAULT 0   NOT NULL,
    id_estat_esdeveniment   TINYINT UNSIGNED DEFAULT '2' NOT NULL,
    id_localitzacio         SMALLINT UNSIGNED            NULL,
    id_estat_localitzacio   TINYINT UNSIGNED DEFAULT '2' NULL,
    id_esdeveniment_ajornat SMALLINT UNSIGNED            NULL,
    CONSTRAINT esdeveniments_ibfk_2
        FOREIGN KEY (id_esdeveniment_ajornat) REFERENCES esdeveniments (id_esdeveniment),
    CONSTRAINT esdeveniments_ibfk_3
        FOREIGN KEY (id_estat_esdeveniment) REFERENCES estats_confirmacio (id_estat_confirmacio),
    CONSTRAINT esdeveniments_ibfk_4
        FOREIGN KEY (id_estat_localitzacio) REFERENCES estats_confirmacio (id_estat_confirmacio),
    CONSTRAINT esdeveniments_ibfk_5
        FOREIGN KEY (id_localitzacio) REFERENCES localitzacions (id_localitzacio)
);

CREATE TABLE IF NOT EXISTS assajos
(
    id_assaig  SMALLINT UNSIGNED    NOT NULL
        PRIMARY KEY,
    es_general TINYINT(1) DEFAULT 0 NOT NULL,
    es_extra   TINYINT(1) DEFAULT 0 NOT NULL,
    CONSTRAINT assajos_ibfk_1
        FOREIGN KEY (id_assaig) REFERENCES esdeveniments (id_esdeveniment)
);

CREATE TABLE IF NOT EXISTS assajos_formacions
(
    id_assaig    SMALLINT UNSIGNED NOT NULL,
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

CREATE TABLE IF NOT EXISTS concerts
(
    id_concert  SMALLINT UNSIGNED NOT NULL
        PRIMARY KEY,
    titol       VARCHAR(50)       NOT NULL,
    id_projecte SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT concerts_ibfk_1
        FOREIGN KEY (id_concert) REFERENCES esdeveniments (id_esdeveniment),
    CONSTRAINT concerts_ibfk_2
        FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte)
);

CREATE TABLE IF NOT EXISTS formacions_concerts
(
    id_formacio SMALLINT UNSIGNED NOT NULL,
    id_concert   SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_formacio, id_concert),
    CONSTRAINT formacions_concerts_ibfk_1
        FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio),
    CONSTRAINT formacions_concerts_ibfk_2
        FOREIGN KEY (id_concert) REFERENCES concerts (id_concert)
);

CREATE INDEX id_concert
    ON formacions_concerts (id_concert);

CREATE INDEX id_projecte
    ON concerts (id_projecte);

CREATE INDEX id_esdeveniment_ajornat
    ON esdeveniments (id_esdeveniment_ajornat);

CREATE INDEX id_estat_esdeveniment
    ON esdeveniments (id_estat_esdeveniment);

CREATE INDEX id_estat_localitzacio
    ON esdeveniments (id_estat_localitzacio);

CREATE INDEX id_localitzacio
    ON esdeveniments (id_localitzacio);

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

CREATE INDEX id_ciutat
    ON localitzacions (id_ciutat);

CREATE INDEX id_tipus_via
    ON localitzacions (id_tipus_via);

CREATE TABLE IF NOT EXISTS persones
(
    id_persona              SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    nom                     VARCHAR(50)          NOT NULL,
    cognoms                 VARCHAR(50)          NOT NULL,
    nom_complet             VARCHAR(101) AS (concat(nom, _utf8mb4' ', cognoms)),
    es_dona                 TINYINT(1) DEFAULT 1 NOT NULL,
    naixement               DATE                 NULL,
    id_pais                 CHAR(2)              NULL,
    dni                     VARCHAR(12)          NULL,
    email                   VARCHAR(50)          NULL,
    telefon                 VARCHAR(14)          NULL,
    es_institucio           TINYINT(1) DEFAULT 0 NOT NULL,
    es_anonim               TINYINT(1) DEFAULT 0 NOT NULL,
    id_localitzacio         SMALLINT UNSIGNED    NULL,
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

CREATE TABLE IF NOT EXISTS directors_formacions
(
    id_director  SMALLINT UNSIGNED NOT NULL,
    id_formacio SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_director, id_formacio),
    CONSTRAINT directors_formacions_ibfk_1
        FOREIGN KEY (id_director) REFERENCES directors (id_director),
    CONSTRAINT directors_formacions_ibfk_2
        FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio)
);

CREATE INDEX id_formacio
    ON directors_formacions (id_formacio);

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
    id_esdeveniment SMALLINT UNSIGNED NOT NULL,
    id_soci         SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_esdeveniment, id_soci),
    CONSTRAINT assistents_esdeveniment_ibfk_1
        FOREIGN KEY (id_esdeveniment) REFERENCES esdeveniments (id_esdeveniment),
    CONSTRAINT assistents_esdeveniment_ibfk_2
        FOREIGN KEY (id_soci) REFERENCES socis (id_soci)
);

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
);

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
    id_soci      SMALLINT UNSIGNED NOT NULL,
    id_formacio SMALLINT UNSIGNED NOT NULL,
    id_veu       CHAR              NULL,
    PRIMARY KEY (id_soci, id_formacio),
    CONSTRAINT socis_formacions_ibfk_1
        FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    CONSTRAINT socis_formacions_ibfk_2
        FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio)
);

CREATE INDEX id_formacio
    ON socis_formacions (id_formacio);

CREATE INDEX id_veu
    ON socis_formacions (id_veu);

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
    id_titular SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    titol      VARCHAR(255) NOT NULL,
    imatge     VARCHAR(255) NULL,
    data_inici DATETIME     NULL,
    data_final DATETIME     NULL,
    link       VARCHAR(255) NULL,
    ordre      TINYINT      NULL
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
    id_usuari          SMALLINT UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    username           VARCHAR(20)                         NOT NULL,
    creacio            TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_persona         SMALLINT UNSIGNED                   NOT NULL,
    salt               VARCHAR(255)                        NOT NULL,
    encrypted_password VARCHAR(255)                        NOT NULL,
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
    id_veu      TINYINT(1) AUTO_INCREMENT
        PRIMARY KEY,
    nom         VARCHAR(20) NOT NULL,
    abreviatura VARCHAR(2)  NOT NULL
);

CREATE DEFINER = root@localhost VIEW usuaris AS
SELECT ccsc.usuaris_complet.id_usuari  AS id_usuari,
       ccsc.usuaris_complet.username   AS username,
       ccsc.usuaris_complet.creacio    AS creacio,
       ccsc.usuaris_complet.id_persona AS id_persona
FROM ccsc.usuaris_complet;

CREATE
    DEFINER = root@localhost FUNCTION ordered_uuid(uuid BINARY(36)) RETURNS BINARY(16)
    RETURN UNHEX(CONCAT(
            SUBSTR(uuid, 15, 4),
            SUBSTR(uuid, 10, 4),
            SUBSTR(uuid, 1, 8),
            SUBSTR(uuid, 20, 4),
            SUBSTR(uuid, 25)
        ));
