import { NextFunction, Response } from "express";

const parseArrayJSON = <T>(properties: (keyof T)[], element: T) => {
  properties.forEach(
    (property) => (element[property] = JSON.parse(element[property as string]))
  );
};

const typeOf = <T>(data: T): string => Object.prototype.toString.call(data);

/**
 * Parses given properties of a data object
 * or array and sends a JSON response.
 */
export default <T extends [] | {} | string>(
  res: Response,
  next: NextFunction,
  data: T,
  properties: (keyof T)[] = []
) => {
  if (!data) return;

  try {
    const dataType = typeOf(data);

    if (dataType === "[object Array]")
      (data as []).forEach((element) => parseArrayJSON(properties, element));
    else if (dataType === "[object Object]") parseArrayJSON(properties, data);
    else if (dataType === "[object String]") data = JSON.parse(data as string);
  } catch (e) {
    next(e);
    return res.end();
  }

  res.json(data);
};
