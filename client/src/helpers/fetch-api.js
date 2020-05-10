import { message, Modal } from "antd";
import { logoutRemoveUser } from "../redux";

const modalWarn = (error, dispatch) => {
  Modal.warn({
    title: error.message,
    content: `Torna a iniciar sessió per comprovar la teva identitat.${
      error.status ? ` Codi d’error: ${error.status}` : ""
    }`,
    okText: error.okText ?? "Torna a iniciar sessió",
    cancelText: "Ignora",
    okCancel: true,
    onOk: () => {
      dispatch(logoutRemoveUser());
      Modal.destroyAll();
    },
  });
};

/**
 * Fetches the API using the appropriate JWT Access Token.
 * @param {string} url
 * @param {Function} callback
 * @param {Function} dispatch
 * @param {RequestInit} [init={}]
 */
export default (url, callback, dispatch, init = {}) => {
  fetch(url, {
    method: init.method ?? "GET",
    headers: {
      ...init.headers,
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-access-token": localStorage.getItem("access-token"),
    },
    body: init.body ?? null,
  })
    .then((res) => {
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1)
        res.json().then((data) => {
          if (data.hasOwnProperty("error")) modalWarn(data.error, dispatch);
          else callback(data);
        });
      else if (res.ok) callback();
    })
    .catch((e) => {
      message.error(e.toString());
    });
};
