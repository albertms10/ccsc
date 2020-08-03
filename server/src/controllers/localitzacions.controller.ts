import { Ciutat, Localitzacio, Pais, Provincia, TipusVia } from "model";
import { OkPacket, Pool, RowDataPacket } from "mysql2/promise";
import { ControllerRequestHandler } from "raw-model";
import { queryFile } from "../helpers";

export const localitzacions_post: ControllerRequestHandler<
  null,
  Localitzacio
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const localitzacio = req.body;

  pool
    .query<OkPacket>(queryFile("localitzacions/insert__localitzacions"), [
      [
        [
          localitzacio.tipus_via,
          localitzacio.carrer,
          localitzacio.numero,
          localitzacio.fins_numero,
          localitzacio.codi_postal,
          localitzacio.gmaps,
          localitzacio.id_ciutat,
        ],
      ],
    ])
    .then(() => res.status(204).send())
    .catch(next);
};

export const localitzacions_tipusvies_get: ControllerRequestHandler<
  TipusVia[]
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(TipusVia & RowDataPacket)[]>(
      queryFile("localitzacions/select__tipus_vies")
    )
    .then(([tipus_vies]) => res.json(tipus_vies))
    .catch(next);
};

export const localitzacions_detall: ControllerRequestHandler<Localitzacio> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Localitzacio & RowDataPacket)[]>(
      queryFile("localitzacions/select__localitzacio"),
      [id]
    )
    .then(([[localitzacio]]) => res.json(localitzacio))
    .catch(next);
};

export const localitzacions_ciutats_get: ControllerRequestHandler<Ciutat[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(Ciutat & RowDataPacket)[]>(
      queryFile("localitzacions/select__ciutats")
    )
    .then(([ciutats]) => res.json(ciutats))
    .catch(next);
};

export const localitzacions_provincies_get: ControllerRequestHandler<
  Provincia[]
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(Provincia & RowDataPacket)[]>(
      queryFile("localitzacions/select__provincies")
    )
    .then(([provincies]) => res.json(provincies))
    .catch(next);
};

export const localitzacions_paisos_get: ControllerRequestHandler<Pais[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(Pais & RowDataPacket)[]>(queryFile("localitzacions/select__paisos"))
    .then(([paisos]) => res.json(paisos))
    .catch(next);
};
