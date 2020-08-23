import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation("modals");

  return useCallback(
    (element: string, onOk: (...args: unknown[]) => unknown) => {
      Modal.confirm({
        title: t("confirm delete action", { element }),
        icon: <ExclamationCircleOutlined />,
        content: t("action undone"),
        okText: t("common:delete"),
        okButtonProps: { danger: true },
        onOk,
      });
    },
    [t]
  );
};
