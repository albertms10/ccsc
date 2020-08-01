import { NextFunction, Response } from "express";

const parseArrayJSON = <T>(properties: (keyof T)[], element: T) => {
  properties.forEach(
    (property) => (element[property] = JSON.parse(element[property as string]))
  );
};

const typeOf = <T>(data: T): string => Object.prototype.toString.call(data);

type ArrayElement<T> = T extends Array<infer U> ? U : T;

/**
 * Parses given properties of a data object
 * or array and sends a JSON response.
 */
export default <T, R extends string | Object | Array<any>>(
  res: Response<T>,
  next: NextFunction,
  data: R,
  properties: (keyof (R extends Array<any> ? ArrayElement<R> : R))[] = []
) => {
  if (!data) return;

  try {
    const dataType = typeOf(data);

    if (dataType === "[object Array]")
      (data as Array<any>).forEach((element) =>
        parseArrayJSON(properties, element)
      );
    else if (dataType === "[object Object]")
      parseArrayJSON(properties, data as any);
    else if (dataType === "[object String]") data = JSON.parse(data as string);
  } catch (e) {
    next(e);
    return res.end();
  }

  res.json(data as any);
};
