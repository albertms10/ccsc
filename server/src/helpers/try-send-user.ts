import { NextFunction, Response } from "express";
import { Usuari } from "model";

export default (
  res: Response,
  next: NextFunction,
  user: Usuari,
  accessToken: string
) => {
  if (!user.es_actiu)
    return res.status(403).send({
      error: {
        status: 403,
        message: "Soci inactiu",
        description:
          "Cal que un membre de la Junta Directiva torni a donar-te dalta.",
        okText: "D’acord",
        okOnly: true,
        noAction: true,
      },
    });

  res.send({
    user,
    accessToken,
  });
};
