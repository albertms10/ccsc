import { Usuari } from "common";
import { NextFunction, Response } from "express";

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

  try {
    const roles: string[] = JSON.parse(user.roles as string);
    const avisos: number[] = JSON.parse(user.avisos as string);

    res.send({
      user: {
        ...user,
        avisos,
        roles,
      },
      accessToken,
    });
  } catch (e) {
    next(e);
    res.status(500).send({
      error: {
        status: 500,
        message: "Hi ha hagut un error en el processament de les dades.",
      },
    });
  }
};
