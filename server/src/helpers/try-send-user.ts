import { NextFunction, Response } from "express";
import User from "../typedef/user.interface";

export default (
  res: Response,
  next: NextFunction,
  user: User,
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
