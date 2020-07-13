/**
 * Parses given properties of a data object
 * or array and sends a JSON response.
 * @param res
 * @param next
 * @param {Object | Array | String} data
 * @param {string[]} [properties = []]
 */
const parseAndSendJSON = (res, next, data, properties = []) => {
  if (!data) return;

  const parseArrayJSON = (properties, element) =>
    properties.forEach(
      (property) => (element[property] = JSON.parse(element[property]))
    );

  const typeOf = (data) => Object.prototype.toString.call(data);

  try {
    if (typeOf(data) === "[object Array]")
      data.forEach((element) => parseArrayJSON(properties, element));
    else if (typeOf(data) === "[object Object]") parseArrayJSON(properties, data)
    else if (typeOf(data) === "[object String]") data = JSON.parse(data);
  } catch (e) {
    next(e);
    return res.end();
  }

  res.json(data);
};

module.exports = parseAndSendJSON;
