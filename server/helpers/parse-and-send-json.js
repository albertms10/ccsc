const parseAndSendJSON = (array, properties, res, next) => {
  try {
    array.forEach((element) =>
      properties.forEach(
        (property) => (element[property] = JSON.parse(element[property]))
      )
    );
  } catch (e) {
    next(e);
    return res.end();
  }

  res.json(array);
};

module.exports = parseAndSendJSON;
