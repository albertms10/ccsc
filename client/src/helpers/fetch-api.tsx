import { QuestionCircleOutlined } from "@ant-design/icons";
import { message, Modal, Tooltip, Typography } from "antd";
import { FetchError } from "common";
import React from "react";
import { AppThunkDispatch } from "../store/types";
import { logoutRemoveUser } from "../store/user/thunks";

const modalWarn = (error: FetchError, dispatch: AppThunkDispatch) => {
  Modal.warn({
    title: error.message,
    content: (
      <>
        <Typography.Text>
          {error.description ||
            "Torna a iniciar sessió per comprovar la teva identitat."}
        </Typography.Text>
        {error.status && (
          <>
            {" "}
            <Tooltip
              placement="right"
              overlay={`Codi d’error: ${error.status}`}
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </>
        )}
      </>
    ),
    okText: error.okText ?? "Torna a iniciar sessió",
    cancelText: "Enrere",
    okCancel: !error.okOnly,
    onOk: error.noAction
      ? undefined
      : () => {
          dispatch(logoutRemoveUser());
          Modal.destroyAll();
        },
  });
};

/**
 * Fetches the API using the appropriate JWT Access Token.
 */
export default (
  url: string,
  callback: Function,
  dispatch: AppThunkDispatch,
  init: RequestInit = {}
) =>
  fetch(`/api${url}`, {
    method: init.method ?? "GET",
    headers: {
      ...init.headers,
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("access-token") || "",
    },
    body: init.body || null,
  })
    .then((res) => {
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1)
        res.json().then((data) => {
          if (data.hasOwnProperty("error") && !data.error.hideMessage)
            modalWarn(data.error, dispatch);
          else callback(data);
        });
      else if (res.ok) callback();
      else if (!res.ok) throw Error(`${res.status} (${res.statusText})`);
      return res;
    })
    .catch((e) => {
      message.error(e.toString());
    });
