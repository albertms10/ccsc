/*
 Persones
 */

CREATE TABLE IF NOT EXISTS usuaris_complet
(
    id_usuari  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    username   VARCHAR(20)       NOT NULL,
    creacio    TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    hash       VARCHAR(255)      NOT NULL,

    id_persona SMALLINT UNSIGNED NOT NULL,

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
    id_persona      SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom             VARCHAR(50)       NOT NULL,
    cognoms         VARCHAR(50)       NOT NULL,
    nom_complet     VARCHAR(101) /* GENERATED ALWAYS AS (CONCAT(nom, ' ', cognoms)) */,
    es_dona         BOOLEAN           NOT NULL DEFAULT TRUE,
    naixement       DATE,
    id_pais         CHAR(2),
    dni             VARCHAR(12),
    email           VARCHAR(50),
    telefon         VARCHAR(14),
    es_institucio   BOOLEAN           NOT NULL DEFAULT FALSE,
    es_anonim       BOOLEAN           NOT NULL DEFAULT FALSE,

    id_localitzacio SMALLINT UNSIGNED,

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
    id_veu            TINYINT(1) UNSIGNED, /* TODO id_veu a `socis_formacions` -> _veus i _instruments */

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

CREATE TABLE IF NOT EXISTS formacions
(
    id_formacio       SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom               VARCHAR(100)      NOT NULL,
    nom_curt          VARCHAR(50),
    descripcio        VARCHAR(255),
    num_persones      TINYINT(3) UNSIGNED,

    id_tipus_formacio TINYINT UNSIGNED  NOT NULL,

    PRIMARY KEY (id_formacio),
    FOREIGN KEY (id_tipus_formacio) REFERENCES tipus_formacions (id_tipus_formacio),

    UNIQUE (nom_curt)
);

CREATE TABLE IF NOT EXISTS tipus_formacions
(
    id_tipus_formacio TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom               VARCHAR(50)      NOT NULL,

    PRIMARY KEY (id_tipus_formacio)
);

CREATE TABLE IF NOT EXISTS directors_formacions
(
    id_director SMALLINT UNSIGNED NOT NULL,
    id_formacio SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_director, id_formacio),
    FOREIGN KEY (id_director) REFERENCES directors (id_director),
    FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio)
);

CREATE TABLE IF NOT EXISTS socis_formacions
(
    id_soci_formacio SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_soci          SMALLINT UNSIGNED NOT NULL,
    id_formacio      SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_soci_formacio),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio)
);

CREATE TABLE IF NOT EXISTS socis_formacions_veus
(
    id_soci_formacio SMALLINT UNSIGNED   NOT NULL,
    id_veu           TINYINT(1) UNSIGNED NOT NULL,
    data_inici       DATE                NOT NULL,

    data_final       DATE,

    PRIMARY KEY (id_soci_formacio, id_veu, data_inici),
    FOREIGN KEY (id_soci_formacio) REFERENCES socis_formacions (id_soci_formacio),
    FOREIGN KEY (id_veu) REFERENCES veus (id_veu)
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

CREATE TABLE IF NOT EXISTS membres_junta
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
    notes                   TEXT,

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

CREATE TABLE IF NOT EXISTS esdeveniments_musicals
(
    id_esdeveniment_musical SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_esdeveniment_musical),
    FOREIGN KEY (id_esdeveniment_musical) REFERENCES esdeveniments (id_esdeveniment)
);

CREATE TABLE IF NOT EXISTS moviments_esdeveniment_musical
(
    id_moviment_esdeveniment_musical SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    id_moviment                      SMALLINT UNSIGNED NOT NULL,
    id_esdeveniment_musical          SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_moviment_esdeveniment_musical),
    FOREIGN KEY (id_moviment) REFERENCES moviments (id_moviment),
    FOREIGN KEY (id_esdeveniment_musical) REFERENCES esdeveniments_musicals (id_esdeveniment_musical)
);

CREATE TABLE IF NOT EXISTS fragments_moviment_esdeveniment_musical
(
    id_moviment_esdeveniment_musical SMALLINT UNSIGNED NOT NULL,

    compas_inici                     SMALLINT UNSIGNED NOT NULL DEFAULT 1,
    compas_final                     SMALLINT UNSIGNED,
    pes                              TINYINT UNSIGNED  NOT NULL DEFAULT 1,
    nota                             TEXT,

    PRIMARY KEY (id_moviment_esdeveniment_musical, compas_inici),
    FOREIGN KEY (id_moviment_esdeveniment_musical) REFERENCES moviments_esdeveniment_musical (id_moviment_esdeveniment_musical)
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
    id_esdeveniment      SMALLINT UNSIGNED NOT NULL,
    id_soci              SMALLINT UNSIGNED NOT NULL,

    amb_retard           BOOLEAN           NOT NULL DEFAULT FALSE,

    id_estat_confirmacio TINYINT UNSIGNED  NOT NULL DEFAULT 2,

    PRIMARY KEY (id_esdeveniment, id_soci),
    FOREIGN KEY (id_esdeveniment) REFERENCES esdeveniments (id_esdeveniment),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    FOREIGN KEY (id_estat_confirmacio) REFERENCES estats_confirmacio (id_estat_confirmacio)
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
    subtitol    VARCHAR(200),
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
    titol       VARCHAR(100),
    durada      TIME,
    tonalitat   VARCHAR(10),
    compassos   SMALLINT UNSIGNED,

    id_obra     SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_moviment),
    FOREIGN KEY (id_obra) REFERENCES obres (id_obra)
);

CREATE TABLE IF NOT EXISTS parts_moviment
(
    id_part_moviment SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_moviment      SMALLINT UNSIGNED NOT NULL,

    compas_inici     SMALLINT UNSIGNED NOT NULL DEFAULT 1,
    compas_final     SMALLINT UNSIGNED,

    PRIMARY KEY (id_part_moviment),
    FOREIGN KEY (id_moviment) REFERENCES moviments (id_moviment)
);

CREATE TABLE IF NOT EXISTS parts_destacades_moviment
(
    id_part_destacada_moviment SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_moviment                SMALLINT UNSIGNED NOT NULL,

    compas_inici               SMALLINT UNSIGNED NOT NULL DEFAULT 1,
    compas_final               SMALLINT UNSIGNED,

    PRIMARY KEY (id_part_destacada_moviment),
    FOREIGN KEY (id_moviment) REFERENCES moviments (id_moviment)
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
    id_veu      TINYINT(1) UNSIGNED NOT NULL AUTO_INCREMENT,
    nom         VARCHAR(20)         NOT NULL,
    abreviatura VARCHAR(2)          NOT NULL,

    PRIMARY KEY (id_veu)
);

CREATE TABLE IF NOT EXISTS socis_projectes_veu
(
    id_soci     SMALLINT UNSIGNED   NOT NULL,
    id_projecte SMALLINT UNSIGNED   NOT NULL,

    id_veu      TINYINT(1) UNSIGNED NOT NULL,

    PRIMARY KEY (id_soci, id_projecte),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte),
    FOREIGN KEY (id_veu) REFERENCES veus (id_veu)
);

CREATE TABLE IF NOT EXISTS veus_moviments
(
    id_veu_moviment SMALLINT UNSIGNED   NOT NULL AUTO_INCREMENT,

    divisi          TINYINT(1) UNSIGNED,

    id_veu          TINYINT(1) UNSIGNED NOT NULL,
    id_moviment     SMALLINT UNSIGNED   NOT NULL,

    PRIMARY KEY (id_veu_moviment),
    FOREIGN KEY (id_veu) REFERENCES veus (id_veu),
    FOREIGN KEY (id_moviment) REFERENCES moviments (id_moviment)
);

CREATE TABLE IF NOT EXISTS socis_veu_moviment_projectes
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
    id_curs VARCHAR(5) NOT NULL,

    inici   DATE       NOT NULL,
    final   DATE,

    PRIMARY KEY (id_curs)
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

CREATE TABLE IF NOT EXISTS projectes_formacions
(
    id_projecte SMALLINT UNSIGNED NOT NULL,
    id_formacio SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_projecte, id_formacio),
    FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte),
    FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio)
);

CREATE TABLE IF NOT EXISTS directors_projectes
(
    id_projecte SMALLINT UNSIGNED NOT NULL,
    id_director SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_projecte, id_director),
    FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte),
    FOREIGN KEY (id_director) REFERENCES directors (id_director)
);

CREATE TABLE IF NOT EXISTS moviments_projectes
(
    id_moviment SMALLINT UNSIGNED NOT NULL,
    id_projecte SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_moviment, id_projecte),
    FOREIGN KEY (id_moviment) REFERENCES moviments (id_moviment),
    FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte)
);

CREATE TABLE IF NOT EXISTS concerts
(
    id_concert  SMALLINT UNSIGNED NOT NULL,

    titol       VARCHAR(50)       NOT NULL,

    id_projecte SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_concert),
    FOREIGN KEY (id_concert) REFERENCES esdeveniments_musicals (id_esdeveniment_musical),
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

CREATE TABLE IF NOT EXISTS formacions_concerts
(
    id_formacio SMALLINT UNSIGNED NOT NULL,
    id_concert  SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_formacio, id_concert),
    FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio),
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
    FOREIGN KEY (id_assaig) REFERENCES esdeveniments_musicals (id_esdeveniment_musical)
);

CREATE TABLE IF NOT EXISTS veus_convocades_assaig
(
    id_assaig SMALLINT UNSIGNED NOT NULL,
    id_veu    TINYINT(1) UNSIGNED,

    PRIMARY KEY (id_assaig, id_veu),
    FOREIGN KEY (id_assaig) REFERENCES assajos (id_assaig),
    FOREIGN KEY (id_veu) REFERENCES veus (id_veu)
);

CREATE TABLE IF NOT EXISTS assajos_projectes
(
    id_assaig   SMALLINT UNSIGNED NOT NULL,
    id_projecte SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_assaig, id_projecte),
    FOREIGN KEY (id_assaig) REFERENCES assajos (id_assaig),
    FOREIGN KEY (id_projecte) REFERENCES projectes (id_projecte)
);

CREATE TABLE IF NOT EXISTS assajos_formacions
(
    id_assaig   SMALLINT UNSIGNED NOT NULL,
    id_formacio SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_assaig, id_formacio),
    FOREIGN KEY (id_assaig) REFERENCES assajos (id_assaig),
    FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio)
);


/*
 Entitat
 */

CREATE TABLE IF NOT EXISTS entitats
(
    id_entitat       SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom              VARCHAR(100)      NOT NULL,
    nif              VARCHAR(12)       NOT NULL,

    id_tipus_entitat SMALLINT UNSIGNED NOT NULL DEFAULT 1,

    PRIMARY KEY (id_entitat),
    FOREIGN KEY (id_tipus_entitat) REFERENCES tipus_entitats (id_tipus_entitat)
);

CREATE TABLE IF NOT EXISTS tipus_entitats
(
    id_tipus_entitat SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    nom              VARCHAR(50)       NOT NULL,

    PRIMARY KEY (id_tipus_entitat)
);

CREATE TABLE IF NOT EXISTS formacions_entitats
(
    id_formacio SMALLINT UNSIGNED NOT NULL,
    id_entitat  SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_entitat, id_formacio),
    FOREIGN KEY (id_formacio) REFERENCES formacions (id_formacio),
    FOREIGN KEY (id_entitat) REFERENCES entitats (id_entitat)
);

CREATE TABLE IF NOT EXISTS adreces_entitats
(
    id_adreca_entitat SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    data_inici        DATE              NOT NULL,

    id_localitzacio   SMALLINT UNSIGNED NOT NULL,
    id_entitat        SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_adreca_entitat),
    FOREIGN KEY (id_localitzacio) REFERENCES localitzacions (id_localitzacio),
    FOREIGN KEY (id_entitat) REFERENCES entitats (id_entitat)
);

CREATE TABLE IF NOT EXISTS adreces_electroniques_entitats
(
    id_adreca_electronica_entitat SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,

    adreca_electronica            VARCHAR(50)       NOT NULL,
    descripcio                    VARCHAR(50)       NOT NULL,

    id_entitat                    SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_adreca_electronica_entitat),
    FOREIGN KEY (id_entitat) REFERENCES entitats (id_entitat),

    UNIQUE (adreca_electronica)
);

CREATE TABLE IF NOT EXISTS encarregats_adreces_electroniques
(
    id_adreca_electronica_entitat SMALLINT UNSIGNED NOT NULL,
    id_soci                       SMALLINT UNSIGNED NOT NULL,
    data_inici                    DATE              NOT NULL,

    data_final                    DATE,

    PRIMARY KEY (id_adreca_electronica_entitat, id_soci, data_inici),
    FOREIGN KEY (id_adreca_electronica_entitat)
        REFERENCES adreces_electroniques_entitats (id_adreca_electronica_entitat),
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
    form_name          VARCHAR(50)       NOT NULL,

    id_avis            SMALLINT UNSIGNED NOT NULL,

    PRIMARY KEY (id_acceptacio_avis),
    FOREIGN KEY (id_avis) REFERENCES avisos (id_avis)
);

CREATE TABLE IF NOT EXISTS socis_acceptacions
(
    id_soci            SMALLINT UNSIGNED NOT NULL,
    id_acceptacio_avis SMALLINT UNSIGNED NOT NULL,
    accepta            BOOLEAN           NOT NULL DEFAULT FALSE,

    PRIMARY KEY (id_soci, id_acceptacio_avis),
    FOREIGN KEY (id_soci) REFERENCES socis (id_soci),
    FOREIGN KEY (id_acceptacio_avis) REFERENCES acceptacions_avis (id_acceptacio_avis)
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
