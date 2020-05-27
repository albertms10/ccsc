/**
 * Parses given properties of a data object
 * or array and sends a JSON response.
 * @param {Object | Array} data
 * @param {string[]} properties
 * @param res
 * @param next
 */
const parseAndSendJSON = (data, properties, res, next) => {
  const parseJSON = (properties, element) =>
    properties.forEach(
      (property) => (element[property] = JSON.parse(element[property]))
    );

  const typeOf = (data) => Object.prototype.toString.call(data);

  try {
    if (typeOf(data) === "[object Array]")
      data.forEach((element) => parseJSON(properties, element));
    else if (typeOf(data) === "[object Object]") parseJSON(properties, data);
  } catch (e) {
    next(e);
    return res.end();
  }

  res.json(data);
};

module.exports = parseAndSendJSON;
