import { Pool, RowDataPacket } from "mysql2/promise";
import { ControllerRequestHandler } from "server-model";
import { queryFile } from "../helpers";

export const usuaris_detall_firstavailablenum: ControllerRequestHandler<number> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { username } = req.params;

  pool
    .query<({ first_available_num: number } & RowDataPacket)[][]>(
      queryFile("usuaris/select__first_available_num_usuari"),
      [username]
    )
    .then(([[_, [{ first_available_num }]]]) =>
      res.json(
        first_available_num ? parseInt(first_available_num.toString()) : 0
      )
    )
    .catch(next);
};
