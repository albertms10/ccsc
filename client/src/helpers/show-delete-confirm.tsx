import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export default (element: string, onOk: (...args: any[]) => any) => {
  const { t } = useTranslation("modals");

  Modal.confirm({
    title: t("confirm delete action", { element }),
    icon: <ExclamationCircleOutlined />,
    content: t("action undone"),
    okText: t("delete"),
    okButtonProps: { danger: true },
    onCancel: () => {},
    onOk,
  });
};
