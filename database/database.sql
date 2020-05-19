/*
 Persones
 */

CREATE TABLE IF NOT EXISTS usuaris_complet
(
    id_usuari          SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    username           VARCHAR(20)       NOT NULL,
    creacio            TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,

    id_persona         SMALLINT UNSIGNED NOT NULL,

    salt               VARCHAR(255)      NOT NULL,
    encrypted_password VARCHAR(255)      NOT NULL,

    PRIMARY KEY (id_usuari),
    FOREIGN KEY (id_persona) REFERENCES persones (id_persona),
    UNIQUE (id_persona)
);

CREATE TABLE IF NOT EXISTS emails_espera
(
    email VARCHAR(255) NOT NULL,

    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS persones
(
    id_persona              SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom                     VARCHAR(50)       NOT NULL,
    cognoms                 VARCHAR(50)       NOT NULL,
    nom_complet             VARCHAR(101) /* GENERATED ALWAYS AS (CONCAT(nom, ' ', cognoms)) */,
    es_dona                 BOOLEAN           NOT NULL DEFAULT TRUE,
    naixement               DATE,
    id_pais                 CHAR(2),
    dni                     VARCHAR(12),
    email                   VARCHAR(50),
    telefon                 VARCHAR(14),
    es_institucio           BOOLEAN           NOT NULL DEFAULT FALSE,
    accepta_proteccio_dades BOOLEAN           NOT NULL DEFAULT FALSE,
    accepta_drets_imatge    BOOLEAN           NOT NULL DEFAULT FALSE,
    es_anonim               BOOLEAN           NOT NULL DEFAULT FALSE, /* TODO Cal afegir algun CHECK? */

    id_localitzacio         SMALLINT UNSIGNED,

    PRIMARY KEY (id_persona),
    FOREIGN KEY (id_pais) REFERENCES paisos (id_pais),
    FOREIGN KEY (id_localitzacio) REFERENCES localitzacions (id_localitzacio),
    UNIQUE (dni),
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS socis
(
    id_soci           SMALLINT UNSIGNED NOT NULL,

    experiencia_coral TEXT,
    estudis_musicals  TEXT,
    id_veu            CHAR(1), /* TODO id_veu a `socis_agrpuacions` -> _veus i _instruments */

    PRIMARY KEY (id_soci),
    FOREIGN KEY (id_soci) REFERENCES persones (id_persona),
    FOREIGN KEY (id_veu) REFERENCES veus (id_veu)
);

CREATE TABLE IF NOT EXISTS roles
(
    id_role TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,

    role    VARCHAR(50)      NOT NULL,

    PRIMARY KEY (id_role)
);

CREATE TABLE IF NOT EXISTS roles_usuaris
(
    id_usuari SMALLINT UNSIGNED NOT NULL,
    id_role   TINYINT UNSIGNED  NOT NULL,

    PRIMARY KEY (id_usuari, id_role),
    FOREIGN KEY (id_usuari) REFERENCES usuaris_complet (id_usuari),
    FOREIGN KEY (id_role) REFERENCES roles (id_role)
);

CREATE TABLE IF NOT EXISTS historial_socis
(
    id_historial_soci SMALLINT UNSIGNED NOT NULL,
    data_alta         DATE              NOT NULL,

    data_baixa        DATE,

    PRIMARY KEY (id_historial_soci, data_alta),
    FOREIGN KEY (id_historial_soci) REFERENCES socis (id_soci)
);

CREATE TABLE IF NOT EXISTS solistes
(
    id_solista SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_solista),
    FOREIGN KEY (id_solista) REFERENCES persones (id_persona)
);

CREATE TABLE IF NOT EXISTS directors
(
    id_director SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_director),
    FOREIGN KEY (id_director) REFERENCES persones (id_persona)
);

CREATE TABLE IF NOT EXISTS agrupacions
(
    id_agrupacio       SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom                VARCHAR(100)      NOT NULL,
    nom_curt           VARCHAR(50),
    descripcio         VARCHAR(255),
    num_persones       TINYINT(3) UNSIGNED,

    id_tipus_agrupacio TINYINT UNSIGNED  NOT NULL,

    PRIMARY KEY (id_agrupacio),
    FOREIGN KEY (id_tipus_agrupacio) REFERENCES tipus_agrupacions (id_tipus_agrupacio)
);

CREATE TABLE IF NOT EXISTS tipus_agrupacions
(
    id_tipus_agrupacio TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom                VARCHAR(50)      NOT NULL,

    PRIMARY KEY (id_tipus_agrupacio)
);

CREATE TABLE IF NOT EXISTS directors_agrupacions
(
    id_director  SMALLINT UNSIGNED NOT NULL,
    id_agrupacio SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_director, id_agrupacio),
    FOREIGN KEY (id_director) REFERENCES directors (id_director),
    FOREIGN KEY (id_agrupacio) REFERENCES agrupacions (id_agrupacio)
);

CREATE TABLE IF NOT EXISTS socis_agrupacions
(
    id_soci      SMALLINT UNSIGNED NOT NULL,
    id_agrupacio SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_soci, id_agrupacio),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    FOREIGN KEY (id_agrupacio) REFERENCES agrupacions (id_agrupacio)
);

CREATE TABLE IF NOT EXISTS insignies
(
    id_insignia SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom         VARCHAR(100)      NOT NULL,
    descripcio  VARCHAR(255)      NOT NULL,

    PRIMARY KEY (id_insignia)
);

CREATE TABLE IF NOT EXISTS insignies_socis_curs
(
    id_insignia SMALLINT UNSIGNED NOT NULL,
    id_soci     SMALLINT UNSIGNED NOT NULL,
    id_curs     VARCHAR(5)        NOT NULL,

    PRIMARY KEY (id_insignia, id_soci, id_curs),
    FOREIGN KEY (id_insignia) REFERENCES insignies (id_insignia),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    FOREIGN KEY (id_curs) REFERENCES cursos (id_curs)
);


/*
 Localitzacions
 */

CREATE TABLE IF NOT EXISTS paisos
(
    id_pais CHAR(2)     NOT NULL,

    nom     VARCHAR(50) NOT NULL,

    PRIMARY KEY (id_pais)
);

CREATE TABLE IF NOT EXISTS provincies
(
    id_provincia SMALLINT UNSIGNED NOT NULL,

    id_pais      CHAR(2)           NOT NULL,

    PRIMARY KEY (id_provincia),
    FOREIGN KEY (id_provincia) REFERENCES ciutats (id_ciutat),
    FOREIGN KEY (id_pais) REFERENCES paisos (id_pais)
);

CREATE TABLE IF NOT EXISTS ciutats
(
    id_ciutat    SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom          VARCHAR(50)       NOT NULL,

    id_provincia SMALLINT UNSIGNED,

    PRIMARY KEY (id_ciutat),
    FOREIGN KEY (id_provincia) REFERENCES provincies (id_provincia)
);

CREATE TABLE IF NOT EXISTS localitzacions
(
    id_localitzacio SMALLINT UNSIGNED                NOT NULL AUTO_INCREMENT,

    id_tipus_via    TINYINT UNSIGNED                 NOT NULL,
    carrer          VARCHAR(100)                     NOT NULL,
    numero          SMALLINT UNSIGNED,
    fins_numero     SMALLINT UNSIGNED,
    codi_postal     SMALLINT UNSIGNED /* ZEROFILL */ NOT NULL,
    gmaps           VARCHAR(512),

    id_ciutat       SMALLINT UNSIGNED,

    PRIMARY KEY (id_localitzacio),
    FOREIGN KEY (id_tipus_via) REFERENCES tipus_vies (id_tipus_via),
    FOREIGN KEY (id_ciutat) REFERENCES ciutats (id_ciutat)
);

CREATE TABLE IF NOT EXISTS tipus_vies
(
    id_tipus_via TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom          VARCHAR(100)     NOT NULL,
    abreviatura  VARCHAR(10),

    PRIMARY KEY (id_tipus_via)
);

CREATE TABLE IF NOT EXISTS establiments
(
    id_establiment       SMALLINT UNSIGNED NOT NULL,

    nom                  VARCHAR(100)      NOT NULL,
    descripcio           TEXT,
    lloc_web             VARCHAR(255),

    id_tipus_establiment SMALLINT UNSIGNED,

    PRIMARY KEY (id_establiment),
    FOREIGN KEY (id_establiment) REFERENCES localitzacions (id_localitzacio),
    FOREIGN KEY (id_tipus_establiment) REFERENCES tipus_establiments (id_tipus_establiment)
);

CREATE TABLE IF NOT EXISTS tipus_establiments
(
    id_tipus_establiment SMALLINT UNSIGNED NOT NULL,

    nom                  VARCHAR(100)      NOT NULL,

    PRIMARY KEY (id_tipus_establiment)
);


/*
 Junta
 */

CREATE TABLE IF NOT EXISTS carrecs_junta
(
    id_carrec_junta TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,

    carrec          VARCHAR(20)      NOT NULL,

    PRIMARY KEY (id_carrec_junta)
);

CREATE TABLE IF NOT EXISTS integrants_junta
(
    id_soci         SMALLINT UNSIGNED NOT NULL,
    id_carrec_junta TINYINT UNSIGNED  NOT NULL,
    data_inici      DATE              NOT NULL,

    data_final      DATE,

    PRIMARY KEY (id_soci, id_carrec_junta, data_inici),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    FOREIGN KEY (id_carrec_junta) REFERENCES carrecs_junta (id_carrec_junta)
);

CREATE TABLE IF NOT EXISTS equips
(
    id_equip   SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nom        VARCHAR(100)      NOT NULL,
    descripcio TEXT,

    PRIMARY KEY (id_equip)
);

CREATE TABLE IF NOT EXISTS responsables_equips
(
    id_soci    SMALLINT UNSIGNED NOT NULL,
    id_equip   SMALLINT UNSIGNED NOT NULL,
    data_inici DATE              NOT NULL,

    data_final DATE,

    PRIMARY KEY (id_soci, id_equip, data_inici),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    FOREIGN KEY (id_equip) REFERENCES equips (id_equip)
);

CREATE TABLE IF NOT EXISTS feines_equips
(
    id_feina_equip SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nom            VARCHAR(100)      NOT NULL,
    descripcio     TEXT,

    id_equip       SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_feina_equip),
    FOREIGN KEY (id_equip) REFERENCES equips (id_equip)
);

CREATE TABLE IF NOT EXISTS responsables_feines_equips
(
    id_soci        SMALLINT UNSIGNED NOT NULL,
    id_feina_equip SMALLINT UNSIGNED NOT NULL,
    data_inici     DATE              NOT NULL,

    data_final     DATE,

    PRIMARY KEY (id_soci, id_feina_equip, data_inici),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    FOREIGN KEY (id_feina_equip) REFERENCES feines_equips (id_feina_equip)
);

CREATE TABLE IF NOT EXISTS activitats
(
    id_activitat SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom          VARCHAR(50)       NOT NULL,
    descripcio   TEXT              NOT NULL,

    PRIMARY KEY (id_activitat)
);

CREATE TABLE IF NOT EXISTS responsables_activitats
(
    id_activitat SMALLINT UNSIGNED NOT NULL,
    id_soci      SMALLINT UNSIGNED NOT NULL,
    data_inici   DATE              NOT NULL,

    data_final   DATE,

    PRIMARY KEY (id_activitat, id_soci, data_inici),
    FOREIGN KEY (id_activitat) REFERENCES activitats (id_activitat),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci)
);

CREATE TABLE IF NOT EXISTS socis_activitats
(
    id_soci      SMALLINT UNSIGNED NOT NULL,
    id_activitat SMALLINT UNSIGNED NOT NULL,
    data_inici   DATE              NOT NULL,

    data_final   DATE,

    PRIMARY KEY (id_soci, id_activitat, data_inici),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    FOREIGN KEY (id_activitat) REFERENCES activitats (id_activitat)
);


/*
 Esdeveniments
 */

CREATE TABLE IF NOT EXISTS esdeveniments
(
    id_esdeveniment         SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    dia_inici               DATE              NOT NULL,
    hora_inici              TIME,
    dia_final               DATE,
    hora_final              TIME,
    es_assaig_ordinari      BOOLEAN           NOT NULL DEFAULT FALSE,

    id_estat_esdeveniment   TINYINT UNSIGNED  NOT NULL DEFAULT 1,
    id_localitzacio         SMALLINT UNSIGNED NOT NULL,
    id_estat_localitzacio   TINYINT UNSIGNED  NOT NULL DEFAULT 1,
    id_esdeveniment_ajornat SMALLINT UNSIGNED,

    PRIMARY KEY (id_esdeveniment),
    FOREIGN KEY (id_localitzacio) REFERENCES localitzacions (id_localitzacio),
    FOREIGN KEY (id_estat_esdeveniment) REFERENCES estats_confirmacio (id_estat_confirmacio),
    FOREIGN KEY (id_estat_localitzacio) REFERENCES estats_confirmacio (id_estat_confirmacio),
    FOREIGN KEY (id_esdeveniment_ajornat) REFERENCES esdeveniments (id_esdeveniment)
);

CREATE TABLE IF NOT EXISTS horaris_curs
(
    id_curs       VARCHAR(5) NOT NULL,

    periode_inici DATE       NOT NULL,
    periode_final DATE,

    hora_inici    TIME       NOT NULL,
    hora_final    TIME       NOT NULL,

    PRIMARY KEY (id_curs, periode_inici),
    FOREIGN KEY (id_curs) REFERENCES cursos (id_curs)
);

CREATE TABLE IF NOT EXISTS estats_confirmacio
(
    id_estat_confirmacio TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    estat                VARCHAR(50)      NOT NULL,

    PRIMARY KEY (id_estat_confirmacio)
);

CREATE TABLE IF NOT EXISTS assistents_esdeveniment
(
    id_esdeveniment SMALLINT UNSIGNED NOT NULL,
    id_soci         SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_esdeveniment, id_soci),
    FOREIGN KEY (id_esdeveniment) REFERENCES esdeveniments (id_esdeveniment),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci)
);

CREATE TABLE IF NOT EXISTS reunions
(
    id_reunio SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_reunio),
    FOREIGN KEY (id_reunio) REFERENCES esdeveniments (id_esdeveniment)
);

CREATE TABLE IF NOT EXISTS punts_reunio
(
    id_punt_reunio SMALLINT UNSIGNED   NOT NULL AUTO_INCREMENT,

    ordre          TINYINT(2) UNSIGNED NOT NULL,
    titol          VARCHAR(255)        NOT NULL,
    descripcio     TEXT,

    id_reunio      SMALLINT UNSIGNED   NOT NULL,

    PRIMARY KEY (id_punt_reunio),
    FOREIGN KEY (id_reunio) REFERENCES reunions (id_reunio)
);

CREATE TABLE IF NOT EXISTS assemblees
(
    id_assemblea      SMALLINT UNSIGNED NOT NULL,

    es_extraordinaria BOOLEAN           NOT NULL DEFAULT FALSE,

    PRIMARY KEY (id_assemblea),
    FOREIGN KEY (id_assemblea) REFERENCES reunions (id_reunio)
);

CREATE TABLE IF NOT EXISTS delegacionsvot_assemblea
(
    id_soci_delegant SMALLINT UNSIGNED NOT NULL,
    id_soci_delegat  SMALLINT UNSIGNED NOT NULL,

    id_assemblea     SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_soci_delegant, id_soci_delegat),
    FOREIGN KEY (id_soci_delegant) REFERENCES socis (id_soci),
    FOREIGN KEY (id_soci_delegat) REFERENCES socis (id_soci),
    FOREIGN KEY (id_assemblea) REFERENCES assemblees (id_assemblea)
);

CREATE TABLE IF NOT EXISTS classes_activitat
(
    id_classe_activitat SMALLINT UNSIGNED NOT NULL,

    id_activitat        SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_classe_activitat),
    FOREIGN KEY (id_classe_activitat) REFERENCES esdeveniments (id_esdeveniment),
    FOREIGN KEY (id_activitat) REFERENCES activitats (id_activitat)
);


/*
 Obres
 */

CREATE TABLE IF NOT EXISTS autors
(
    id_autor SMALLINT UNSIGNED NOT NULL,

    defuncio DATE,
    cataleg  VARCHAR(10),

    PRIMARY KEY (id_autor),
    FOREIGN KEY (id_autor) REFERENCES persones (id_persona)
);

CREATE TABLE IF NOT EXISTS obres
(
    id_obra     SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    titol       VARCHAR(100)      NOT NULL,
    subtitol    VARCHAR(200)      NOT NULL,
    num_cataleg SMALLINT UNSIGNED,
    any_inici   SMALLINT(4) UNSIGNED,
    any_final   SMALLINT(4) UNSIGNED,

    id_idioma   CHAR(2),

    PRIMARY KEY (id_obra),
    FOREIGN KEY (id_idioma) REFERENCES idiomes (id_idioma)
);

CREATE TABLE IF NOT EXISTS tipus_autoria
(
    id_tipus_autoria TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,

    tipus_autoria    VARCHAR(50)      NOT NULL,

    PRIMARY KEY (id_tipus_autoria)
);

CREATE TABLE IF NOT EXISTS obres_tipus_autories
(
    id_obra          SMALLINT UNSIGNED NOT NULL,
    id_tipus_autoria TINYINT UNSIGNED  NOT NULL,
    id_autoria       SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_obra, id_tipus_autoria, id_autoria),
    FOREIGN KEY (id_obra) REFERENCES obres (id_obra),
    FOREIGN KEY (id_tipus_autoria) REFERENCES tipus_autoria (id_tipus_autoria),
    FOREIGN KEY (id_autoria) REFERENCES autors (id_autor)
);

CREATE TABLE IF NOT EXISTS moviments
(
    id_moviment SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    ordre       SMALLINT UNSIGNED NOT NULL,
    titol       VARCHAR(100)      NOT NULL,
    durada      TIME,
    tonalitat   VARCHAR(10),

    id_obra     SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_moviment),
    FOREIGN KEY (id_obra) REFERENCES obres (id_obra)
);

CREATE TABLE IF NOT EXISTS llibrets_moviments
(
    id_llibret_moviment SMALLINT UNSIGNED    NOT NULL,

    text                TEXT                 NOT NULL,
    any                 SMALLINT(4) UNSIGNED NOT NULL,

    id_idioma           CHAR(2),
    id_font_traduccio   SMALLINT UNSIGNED    NOT NULL,

    PRIMARY KEY (id_llibret_moviment),
    FOREIGN KEY (id_llibret_moviment) REFERENCES moviments (id_moviment),
    FOREIGN KEY (id_idioma) REFERENCES idiomes (id_idioma),
    FOREIGN KEY (id_font_traduccio) REFERENCES fonts_traduccions (id_font_traduccio)
);

CREATE TABLE IF NOT EXISTS idiomes
(
    id_idioma CHAR(2)     NOT NULL,

    nom       VARCHAR(50) NOT NULL,

    PRIMARY KEY (id_idioma)
);

CREATE TABLE IF NOT EXISTS fonts_traduccions
(
    id_font_traduccio SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom               VARCHAR(100)      NOT NULL,
    descripcio        TEXT,

    PRIMARY KEY (id_font_traduccio)
);

CREATE TABLE IF NOT EXISTS veus
(
    id_veu CHAR(1)     NOT NULL, /* e.g. s */

    nom    VARCHAR(20) NOT NULL, /* e.g. soprano */

    PRIMARY KEY (id_veu)
);

CREATE TABLE IF NOT EXISTS veus_moviments
(
    id_veu_moviment SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    id_veu          CHAR(1)           NOT NULL,
    divisi          TINYINT(1)        NOT NULL,
    id_moviment     SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_veu_moviment),
    FOREIGN KEY (id_veu) REFERENCES veus (id_veu),
    FOREIGN KEY (id_moviment) REFERENCES moviments (id_moviment)
);

CREATE TABLE IF NOT EXISTS socis_veus_projectes
(
    id_soci         SMALLINT UNSIGNED NOT NULL,
    id_veu_moviment SMALLINT UNSIGNED NOT NULL,
    id_projecte     SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_soci, id_veu_moviment, id_projecte),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    FOREIGN KEY (id_veu_moviment) REFERENCES veus_moviments (id_veu_moviment),
    FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte)
);


/*
 Projectes
 */

CREATE TABLE IF NOT EXISTS cursos
(
    id_curs       VARCHAR(5)        NOT NULL,

    inici         DATE              NOT NULL,
    final         DATE,

    id_associacio SMALLINT UNSIGNED NOT NULL DEFAULT 1,

    PRIMARY KEY (id_curs),
    FOREIGN KEY (id_associacio) REFERENCES associacio (id_associacio)
);

CREATE TABLE IF NOT EXISTS projectes
(
    id_projecte SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    titol       VARCHAR(50)       NOT NULL,
    descripcio  TEXT,
    inicials    VARCHAR(3)        NOT NULL,
    color       CHAR(6),

    data_inici  DATE,
    data_final  DATE,

    id_curs     VARCHAR(5)        NOT NULL,

    PRIMARY KEY (id_projecte),
    FOREIGN KEY (id_curs) REFERENCES cursos (id_curs)
);

CREATE TABLE IF NOT EXISTS projectes_agrupacions
(
    id_projecte  SMALLINT UNSIGNED NOT NULL,
    id_agrupacio SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_projecte, id_agrupacio),
    FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte),
    FOREIGN KEY (id_agrupacio) REFERENCES agrupacions (id_agrupacio)
);

CREATE TABLE IF NOT EXISTS directors_projectes
(
    id_projecte SMALLINT UNSIGNED NOT NULL,
    id_director SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_projecte, id_director),
    FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte),
    FOREIGN KEY (id_director) REFERENCES directors (id_director)
);

CREATE TABLE IF NOT EXISTS concerts
(
    id_concert  SMALLINT UNSIGNED NOT NULL,

    titol       VARCHAR(50)       NOT NULL,

    id_projecte SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_concert),
    FOREIGN KEY (id_concert) REFERENCES esdeveniments (id_esdeveniment),
    FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte)
);

CREATE TABLE IF NOT EXISTS directors_concerts
(
    id_director SMALLINT UNSIGNED NOT NULL,
    id_concert  SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_director, id_concert),
    FOREIGN KEY (id_director) REFERENCES directors (id_director),
    FOREIGN KEY (id_concert) REFERENCES concerts (id_concert)
);

CREATE TABLE IF NOT EXISTS solistes_concerts
(
    id_solista SMALLINT UNSIGNED NOT NULL,
    id_concert SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_solista, id_concert),
    FOREIGN KEY (id_solista) REFERENCES solistes (id_solista),
    FOREIGN KEY (id_concert) REFERENCES concerts (id_concert)
);

CREATE TABLE IF NOT EXISTS agrupacions_concerts
(
    id_agrupacio SMALLINT UNSIGNED NOT NULL,
    id_concert   SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_agrupacio, id_concert),
    FOREIGN KEY (id_agrupacio) REFERENCES agrupacions (id_agrupacio),
    FOREIGN KEY (id_concert) REFERENCES concerts (id_concert)
);

CREATE TABLE IF NOT EXISTS parts_concert
(
    id_part_concert SMALLINT UNSIGNED   NOT NULL AUTO_INCREMENT,
    id_concert      SMALLINT UNSIGNED   NOT NULL,

    part            TINYINT(1) UNSIGNED NOT NULL,

    PRIMARY KEY (id_part_concert),
    FOREIGN KEY (id_concert) REFERENCES concerts (id_concert)
);

CREATE TABLE IF NOT EXISTS moviments_parts
(
    id_moviment_part SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_moviment      SMALLINT UNSIGNED NOT NULL,
    id_part          SMALLINT UNSIGNED NOT NULL,

    es_bis           BOOLEAN           NOT NULL DEFAULT FALSE,

    PRIMARY KEY (id_moviment_part),
    FOREIGN KEY (id_moviment) REFERENCES moviments (id_moviment),
    FOREIGN KEY (id_part) REFERENCES parts_concert (id_part_concert)
);

CREATE TABLE IF NOT EXISTS instruments
(
    id_instrument SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom           VARCHAR(100)      NOT NULL,

    PRIMARY KEY (id_instrument)
);

CREATE TABLE IF NOT EXISTS instruments_interpretacio
(
    id_moviment_part SMALLINT UNSIGNED NOT NULL,
    id_instrument    SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_moviment_part, id_instrument),
    FOREIGN KEY (id_moviment_part) REFERENCES moviments_parts (id_moviment_part),
    FOREIGN KEY (id_instrument) REFERENCES instruments (id_instrument)
);


/*
 Valoracions
 */

CREATE TABLE IF NOT EXISTS valoracions
(
    id_valoracio SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    valoracio    TINYINT(1)        NOT NULL,
    opinio       TEXT,

    PRIMARY KEY (id_valoracio)
);

CREATE TABLE IF NOT EXISTS valoracions_socis_concerts
(
    id_concert   SMALLINT UNSIGNED NOT NULL,
    id_soci      SMALLINT UNSIGNED NOT NULL,

    id_valoracio SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_concert, id_soci),
    FOREIGN KEY (id_concert) REFERENCES concerts (id_concert),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    FOREIGN KEY (id_valoracio) REFERENCES valoracions (id_valoracio),
    UNIQUE (id_valoracio)
);

CREATE TABLE IF NOT EXISTS valoracions_socis_projectes
(
    id_projecte  SMALLINT UNSIGNED NOT NULL,
    id_soci      SMALLINT UNSIGNED NOT NULL,

    id_valoracio SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_projecte, id_soci),
    FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    FOREIGN KEY (id_valoracio) REFERENCES valoracions (id_valoracio),
    UNIQUE (id_valoracio)
);

/*
 Pagaments
 */

CREATE TABLE IF NOT EXISTS trimestres
(
    id_trimestre SMALLINT UNSIGNED   NOT NULL AUTO_INCREMENT,

    num          TINYINT(1) UNSIGNED NOT NULL,
    id_curs      VARCHAR(5)          NOT NULL,

    PRIMARY KEY (id_trimestre),
    FOREIGN KEY (id_curs) REFERENCES cursos (id_curs)
);

CREATE TABLE IF NOT EXISTS quotes
(
    id_quota     SMALLINT UNSIGNED       NOT NULL AUTO_INCREMENT,

    import       DECIMAL(15, 2) UNSIGNED NOT NULL,

    id_trimestre SMALLINT UNSIGNED       NOT NULL,

    PRIMARY KEY (id_quota),
    FOREIGN KEY (id_trimestre) REFERENCES trimestres (id_trimestre)
);

CREATE TABLE IF NOT EXISTS socis_quotes
(
    id_soci  SMALLINT UNSIGNED NOT NULL,
    id_quota SMALLINT UNSIGNED NOT NULL,

    data     DATE              NOT NULL,

    PRIMARY KEY (id_quota, id_soci),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    FOREIGN KEY (id_quota) REFERENCES quotes (id_quota)
);


/*
 Assajos
 */

CREATE TABLE IF NOT EXISTS assajos
(
    id_assaig  SMALLINT UNSIGNED NOT NULL,

    es_general BOOLEAN           NOT NULL DEFAULT FALSE,
    es_extra   BOOLEAN           NOT NULL DEFAULT FALSE,

    PRIMARY KEY (id_assaig),
    FOREIGN KEY (id_assaig) REFERENCES esdeveniments (id_esdeveniment)
);

/* TODO Tots els assajos *poden* estar assignats a un projecte.
   Per tant, cal que estiguin assignats a una agrupació. */
CREATE TABLE IF NOT EXISTS assajos_projectes
(
    id_assaig   SMALLINT UNSIGNED NOT NULL,
    id_projecte SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_assaig, id_projecte),
    FOREIGN KEY (id_assaig) REFERENCES assajos (id_assaig),
    FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte)
);

CREATE TABLE IF NOT EXISTS assajos_agrupacions
(
    id_assaig    SMALLINT UNSIGNED NOT NULL,
    id_agrupacio SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_assaig, id_agrupacio),
    FOREIGN KEY (id_assaig) REFERENCES assajos (id_assaig),
    FOREIGN KEY (id_agrupacio) REFERENCES agrupacions (id_agrupacio)
);

CREATE TABLE IF NOT EXISTS moviments_assajos
(
    id_moviment SMALLINT UNSIGNED NOT NULL,
    id_assaig   SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_moviment, id_assaig),
    FOREIGN KEY (id_moviment) REFERENCES moviments (id_moviment),
    FOREIGN KEY (id_assaig) REFERENCES assajos (id_assaig)
);


/*
 Associació
 */

CREATE TABLE IF NOT EXISTS associacio
(
    id_associacio SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom           VARCHAR(100)      NOT NULL,
    nif           VARCHAR(12)       NOT NULL,

    PRIMARY KEY (id_associacio)
);

CREATE TABLE IF NOT EXISTS agrupacions_associacio
(
    id_associacio SMALLINT UNSIGNED NOT NULL,
    id_agrupacio  SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_associacio, id_agrupacio),
    FOREIGN KEY (id_associacio) REFERENCES associacio (id_associacio),
    FOREIGN KEY (id_agrupacio) REFERENCES agrupacions (id_agrupacio)
);

CREATE TABLE IF NOT EXISTS direccions_fiscals_associacio
(
    id_direccio_fiscal_associacio SMALLINT UNSIGNED NOT NULL,
    id_localitzacio               SMALLINT UNSIGNED NOT NULL,
    data_inici                    DATE              NOT NULL,

    PRIMARY KEY (id_direccio_fiscal_associacio, id_localitzacio, data_inici),
    FOREIGN KEY (id_direccio_fiscal_associacio) REFERENCES associacio (id_associacio),
    FOREIGN KEY (id_localitzacio) REFERENCES localitzacions (id_localitzacio)
);

CREATE TABLE IF NOT EXISTS direccions_socials_associacio
(
    id_direccio_social_associacio SMALLINT UNSIGNED NOT NULL,
    id_localitzacio               SMALLINT UNSIGNED NOT NULL,
    data_inici                    DATE              NOT NULL,

    PRIMARY KEY (id_direccio_social_associacio, id_localitzacio, data_inici),
    FOREIGN KEY (id_direccio_social_associacio) REFERENCES associacio (id_associacio),
    FOREIGN KEY (id_localitzacio) REFERENCES localitzacions (id_localitzacio)
);

CREATE TABLE IF NOT EXISTS adreces_electroniques_associacio
(
    id_adreca_electronica_associacio SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    direccio                         VARCHAR(50)       NOT NULL,

    descripcio                       VARCHAR(50)       NOT NULL,
    id_associacio                    SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_adreca_electronica_associacio),
    FOREIGN KEY (id_associacio) REFERENCES associacio (id_associacio),
    UNIQUE (direccio)
);

CREATE TABLE IF NOT EXISTS encarregats_adreces_associacio
(
    id_adreca_electronica_associacio SMALLINT UNSIGNED NOT NULL,
    id_soci                          SMALLINT UNSIGNED NOT NULL,
    data_inici                       DATE              NOT NULL,

    data_final                       DATE,

    PRIMARY KEY (id_adreca_electronica_associacio, id_soci, data_inici),
    FOREIGN KEY (id_adreca_electronica_associacio)
        REFERENCES adreces_electroniques_associacio (id_adreca_electronica_associacio),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci)
);

CREATE TABLE IF NOT EXISTS documentacions
(
    id_documentacio       SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    data                  DATE              NOT NULL,

    id_tipus_documentacio TINYINT UNSIGNED,

    PRIMARY KEY (id_documentacio),
    FOREIGN KEY (id_tipus_documentacio) REFERENCES tipus_documentacio (id_tipus_documentacio)
);

CREATE TABLE IF NOT EXISTS socis_signants_documentacio
(
    id_documentacio SMALLINT UNSIGNED NOT NULL,
    id_soci         SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_documentacio, id_soci),
    FOREIGN KEY (id_documentacio) REFERENCES documentacions (id_documentacio),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci)
);

CREATE TABLE IF NOT EXISTS actes_reunions
(
    id_documentacio SMALLINT UNSIGNED NOT NULL,
    id_reunio       SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_documentacio),
    FOREIGN KEY (id_reunio) REFERENCES reunions (id_reunio)
);

CREATE TABLE IF NOT EXISTS tipus_documentacio
(
    id_tipus_documentacio TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom                   VARCHAR(100)     NOT NULL,

    PRIMARY KEY (id_tipus_documentacio)
);

CREATE TABLE IF NOT EXISTS capitols_documentacio
(
    id_capitol_documentacio SMALLINT UNSIGNED   NOT NULL AUTO_INCREMENT,

    numero                  TINYINT(2) UNSIGNED NOT NULL,
    titol                   VARCHAR(100)        NOT NULL,

    id_documentacio         SMALLINT UNSIGNED   NOT NULL,

    PRIMARY KEY (id_capitol_documentacio),
    FOREIGN KEY (id_documentacio) REFERENCES documentacions (id_documentacio)
);

CREATE TABLE IF NOT EXISTS articles_documentacio
(
    id_article_documentacio SMALLINT UNSIGNED   NOT NULL AUTO_INCREMENT,

    numero                  TINYINT(2) UNSIGNED NOT NULL,

    id_capitol              SMALLINT UNSIGNED   NOT NULL,

    PRIMARY KEY (id_article_documentacio),
    FOREIGN KEY (id_capitol) REFERENCES capitols_documentacio (id_capitol_documentacio)
);

/* TODO: Implementar paràgrafs i llistes */

CREATE TABLE IF NOT EXISTS tipus_avisos
(
    id_tipus_avis SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom           VARCHAR(100)      NOT NULL,

    PRIMARY KEY (id_tipus_avis)
);

CREATE TABLE IF NOT EXISTS avisos
(
    id_avis            SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    titol              VARCHAR(100),
    descripcio         TEXT,
    titol_acceptacions VARCHAR(100),
    requerit           BOOLEAN           NOT NULL DEFAULT FALSE,
    data_inici         DATE,
    data_final         DATE,

    id_tipus_avis      SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_avis),
    FOREIGN KEY (id_tipus_avis) REFERENCES tipus_avisos (id_tipus_avis)
);

CREATE TABLE IF NOT EXISTS seccions_avis
(
    id_seccio_avis SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    titol          VARCHAR(100)      NOT NULL,
    descripcio     TEXT              NOT NULL,

    id_avis        SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_seccio_avis),
    FOREIGN KEY (id_avis) REFERENCES avisos (id_avis)
);

CREATE TABLE IF NOT EXISTS acceptacions_avis
(
    id_acceptacio_avis SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    titol              VARCHAR(255)      NOT NULL,
    descripcio         TEXT,
    requerida          BOOLEAN           NOT NULL DEFAULT FALSE,

    id_avis            SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_acceptacio_avis),
    FOREIGN KEY (id_avis) REFERENCES avisos (id_avis)
);

/*
 Pàgina principal
 */

CREATE TABLE IF NOT EXISTS titulars
(
    id_titular
               SMALLINT
                   UNSIGNED
                            NOT
                                NULL
        AUTO_INCREMENT,
    titol
               VARCHAR(255) NOT NULL,
    imatge     VARCHAR(255),
    data_inici DATETIME,
    data_final DATETIME,
    link       VARCHAR(255),
    ordre      TINYINT(2),
    PRIMARY KEY
        (
         id_titular
            )
);

CREATE TABLE IF NOT EXISTS entrades
(
    id_entrada SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    titol      VARCHAR(255)      NOT NULL,
    cos        TEXT              NOT NULL,

    PRIMARY KEY (id_entrada)
);

CREATE TABLE IF NOT EXISTS concerts_entrades
(
    id_concert SMALLINT UNSIGNED NOT NULL,
    id_entrada SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_concert, id_entrada),
    FOREIGN KEY (id_concert) REFERENCES concerts (id_concert),
    FOREIGN KEY (id_entrada) REFERENCES entrades (id_entrada)
);

CREATE TABLE IF NOT EXISTS retalls
(
    id_retall SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    titol     VARCHAR(255),
    subtitol  TEXT,
    link      VARCHAR(255),

    PRIMARY KEY (id_retall)
);

CREATE TABLE IF NOT EXISTS missatges
(
    id_missatge SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nom         VARCHAR(255)      NOT NULL,
    email       VARCHAR(255)      NOT NULL,
    missatge    TEXT              NOT NULL,
    data        TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id_missatge)
);

/*
 VIEWS
 */
/*
CREATE VIEW usuaris AS
SELECT id_usuari, username, creacio, id_persona
FROM usuaris_complet

 */


/*

 DUBTES

 TODO
 - Quin ús hauria de fer de les VIEWS i les STORED PROCEDURES?
   (Una vista per a cada consulta i un procediment
   per a executar-la amb uns paràmetres concrets?)
   Hauria de generar una API pròpia per accedir als continguts?
   O bé, d'altra banda, hauria de treballar amb un ORM?


 - Com gestionem els usuaris?


 - Crear una taula `dates` amb `dia`, `mes` i `any` nullables?
   (Pel fet de poder desar dates sense tots els camps.)


 - Com gestiono institucions, persones, corals i directors?
   (la nostra coral, el nostre director i la resta)


 - Interpretació d'un moviment en un `esdeveniment->concert` implica:
     - Director (convidat?)
     - Coral col·laboradora
     - Instrumentistes (pianista acompanyant, orquestra, solistes)

   Per tant, hauria de tenir una taula de `col·laboració` per cada
   tipus de persona col·laboradora?

   També podem tenir aquests `col·laboradors` en `esdeveniments->assajos`.

   Podem distingir entre:
     - `esdeveniments` musicals (assajos i concerts)
            -> [Repertori treballat/interpretat, Persones col·laboradores]
     - `esdeveniments` legals (reunions i assemblees)
            -> [Delegar vots, Punts tractats]

   L'arbre quedaria:
     (esdeveniments) : List<Soci> assistents
     │
     ├─ (musicals) : List<Moviment> moviments (treball/programa),
     │  │            List<Persona> col·laboradors,
     │  │            List<Persona> directors
     │  ├─ assajos
     │  └─ concerts
     │
     └─(legals)
       └─ reunions   : List<PuntTractat> ordreDelDia
          └─ assemblees : List<VotDelegat> delegacioVots

   Si a la descripció del punt_tractat es troba un token, s'afegirà la informació relacionada:
    - [[junta]]      -> taula amb la nova junta
    - [[canvijunta]] -> taula amb els canvis de la nova junta
    - [[equips]]     -> taula amb els responsables dels equips de treball


 - Estan ben gestionats els equips, feines i els responsables?
   (Els responsables segueixen la mateixa estructura de dades en junta, equips i feines.)


 TODO
 - Col·laboració en concerts de solistes i corals:
   (múltiples moviments) -> una sola factura per concert/projecte.

 TODO
 - Com gestiono les factures entrants/sortints?


 - En realitzar un pagament de quota (quota -> soci),
   es realitza un rebut (quantitat -> soci).
   Com connectem les dades d'un a l'altre? (Un rebut pot ser
   de moltes altres coses). -> Caldria fer ús del concepte d'interfície?


 - Com gestiono la periodicitat dels esdeveniments?
   (Es creen tots de cop amb un script?)
   Estat de confirmació de la localització (i dia/hora) dels esdeveniments : boolean


 - Veus -> fer una traducció


 ✔ Socis - Veus_moviments - Projectes


 - Gestió d'empresa/projecte (CRM - Gestió de projectes)

 TODO
 - Analitzar i dissenyar nous processos per a l'associació


 - Com he integrat els components del framework
   (+ trossos de codi importants)


 - Feina més descriptiva que de presa de desicions.


 - Valoracions
   -> De projectes
   -> De concerts

 TODO
 - Col·laboracions en esdeveniments
   -> De solistes
   -> De directors
   -> De grups orquestrals
   -> De reforços al nostre cor
      -> Com a coral
      -> Com a cantant

 TODO
 - Com emmagatzemo informació de caràcter estàtic?
   (una sola associació -> una taula amb un únic registre?)
   L'associació té una cor, però en podria tenir més (?)

 TODO
 - Rutes del backend privades.

 */

/*
 FUNCTIONS

DELIMITER //
CREATE
    DEFINER = root@localhost FUNCTION `ordered_uuid`(uuid BINARY(36))
    RETURNS BINARY(16) DETERMINISTIC
    RETURN UNHEX(CONCAT(
            SUBSTR(uuid, 15, 4),
            SUBSTR(uuid, 10, 4),
            SUBSTR(uuid, 1, 8),
            SUBSTR(uuid, 20, 4),
            SUBSTR(uuid, 25)
        ));
//
DELIMITER ;
*/

/*
 DBML

cd database
sql2dbml --mysql database.sql -o database.dbml
dbdocs build database.dbml

 */
