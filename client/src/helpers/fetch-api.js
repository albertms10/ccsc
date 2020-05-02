/**
 * Fetches the API using the appropriate JWT Access Token.
 * @param {string} url
 * @param {Function} callback
 * @param {RequestInit} init
 */
export default (url, callback, init = {}) => {
  fetch(url, {
    method: init.method ?? "GET",
    headers: {
      ...init.headers,
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-access-token": localStorage.getItem("access-token"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.hasOwnProperty("error")) {
        /* TODO: Dispatch `signinUserFailure`
            Show alert modal or redirect? */
        // dispatch(signinUserFailure(data.error));
        localStorage.removeItem("access-token");
      } else {
        callback(data);
      }
    });
};
