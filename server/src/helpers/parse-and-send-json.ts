import { NextFunction, Response } from "express";

/**
 * Parses given properties of a data object
 * or array and sends a JSON response.
 */
export default (
  res: Response,
  next: NextFunction,
  data: any,
  properties: string[] = []
) => {
  if (!data) return;

  const parseArrayJSON = (properties: string[], element: Object) =>
    properties.forEach(
      (property) => (element[property] = JSON.parse(element[property]))
    );

  const typeOf = (data: any) => Object.prototype.toString.call(data);

  try {
    if (typeOf(data) === "[object Array]")
      data.forEach((element) => parseArrayJSON(properties, element));
    else if (typeOf(data) === "[object Object]")
      parseArrayJSON(properties, data);
    else if (typeOf(data) === "[object String]") data = JSON.parse(data);
  } catch (e) {
    next(e);
    return res.end();
  }

  res.json(data);
};
