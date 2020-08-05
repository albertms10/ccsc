import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (idSoci: number) => {
  const { t } = useTranslation("modals");

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const donarBaixaSoci = () => {
    setLoading(true);
    return fetchAPI(
      `/socis/${idSoci}/baixa`,
      () => {
        setLoading(false);
      },
      dispatch,
      { method: "PUT" }
    );
  };

  const modalBaixaSoci = (callback: () => void) => {
    Modal.confirm({
      title: t("confirm unsubscription"),
      icon: <ExclamationCircleOutlined />,
      content: t("action undone"),
      okText: t("unsubscription action"),
      okButtonProps: { danger: true },
      onOk: () => donarBaixaSoci().finally(callback),
      onCancel: () => {},
    });
  };

  return [loading, modalBaixaSoci] as const;
};
