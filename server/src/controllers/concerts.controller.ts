import { ItemGrafica } from "model";
import { Pool, RowDataPacket } from "mysql2/promise";
import { ControllerRequestHandler, Count } from "server-model";
import { queryFile } from "../helpers";

export const concerts_count: ControllerRequestHandler<number> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(Count & RowDataPacket)[]>(
      queryFile("concerts/select__count_concerts")
    )
    .then(([[{ count }]]) => res.json(count))
    .catch(next);
};

export const concerts_historial: ControllerRequestHandler<ItemGrafica[]> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");

  pool
    .query<(ItemGrafica & RowDataPacket)[]>(
      queryFile("concerts/select__historial_concerts")
    )
    .then(([historial]) => res.json(historial))
    .catch(next);
};
