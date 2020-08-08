import { QuestionCircleOutlined } from "@ant-design/icons";
import { message, Modal, Tooltip, Typography } from "antd";
import { FetchError, ResponseError } from "common";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logoutRemoveUser } from "../store/user/thunks";

const catchError = (e: Error) => {
  message.error(e.toString());
};

export const baseFetchAPI = <T,>(
  url: string,
  callback: (data: ResponseError | T) => void,
  onError: (error: FetchError) => void,
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
        res
          .json()
          .then((data: ResponseError | T) => {
            const error = (data as ResponseError).error;

            if (error && !error.hideMessage) onError(error);
            else callback(data);
          })
          .catch(catchError);
      else if (res.ok) callback({} as T);
      else if (!res.ok) throw Error(`${res.status} (${res.statusText})`);

      return res;
    })
    .catch(catchError);

/**
 * Fetches the API using the appropriate JWT Access Token.
 */
export default () => {
  const { t } = useTranslation("server");

  const dispatch = useDispatch();

  const modalWarn = useCallback(
    (error: FetchError) => {
      Modal.warn({
        title: t(error.message),
        content: (
          <>
            <Typography.Text>
              {t(error.description || "sign in again to check")}
            </Typography.Text>
            {error.status && (
              <Typography.Text type="secondary" style={{ marginLeft: 4 }}>
                <Tooltip
                  placement="right"
                  overlay={t("error code", { status: error.status })}
                >
                  <QuestionCircleOutlined />
                </Tooltip>
              </Typography.Text>
            )}
          </>
        ),
        okText: t(error.okText || "sign in again"),
        cancelText: t("common:go back"),
        okCancel: !error.okOnly,
        onOk: error.noAction
          ? undefined
          : () => {
              dispatch(logoutRemoveUser());
              Modal.destroyAll();
            },
      });
    },
    [dispatch, t]
  );

  return useCallback(
    <T,>(
      url: string,
      callback: (data: ResponseError | T) => void,
      init: RequestInit = {}
    ) => baseFetchAPI(url, callback, modalWarn, init),
    [modalWarn]
  );
};
