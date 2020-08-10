import { Convocatoria, Esdeveniment, EstatConfirmacio, Persona } from "model";
import { OkPacket, Pool, RowDataPacket } from "mysql2/promise";
import { ControllerRequestHandler } from "server-model";
import { queryFile } from "../helpers";

export const esdeveniments_get: ControllerRequestHandler<Esdeveniment[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(Esdeveniment & RowDataPacket)[]>(
      queryFile("esdeveniments/select__esdeveniments")
    )
    .then(([esdeveniments]) => res.json(esdeveniments))
    .catch(next);
};

export const esdeveniments_estatsconfirmacio: ControllerRequestHandler<
  EstatConfirmacio[]
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(EstatConfirmacio & RowDataPacket)[]>(
      queryFile("esdeveniments/select__estats_confirmacio")
    )
    .then(([estats]) => res.json(estats))
    .catch(next);
};

export const esdeveniments_detall_assistents_get: ControllerRequestHandler<
  Persona[]
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query<(Persona & RowDataPacket)[]>(
      queryFile("esdeveniments/select__assistents_esdeveniment"),
      [id]
    )
    .then(([assistents]) => res.json(assistents))
    .catch(next);
};

export const esdeveniments_detall_assistents_put: ControllerRequestHandler<
  null,
  Convocatoria
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { id: id_esdeveniment } = req.params;
  const { id_persona, id_estat_confirmacio, amb_retard } = req.body;

  pool
    .query<OkPacket>(
      queryFile("esdeveniments/insert__assistents_esdeveniments"),
      [[[id_esdeveniment, id_persona, id_estat_confirmacio, amb_retard]]]
    )
    .then(() => res.status(204).send())
    .catch(next);
};
