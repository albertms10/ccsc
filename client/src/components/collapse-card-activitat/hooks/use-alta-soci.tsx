import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetchAPI } from "../../../helpers";

export default (idSoci: number) => {
  const { t } = useTranslation("modals");

  const fetchAPI = useFetchAPI();

  const [loading, setLoading] = useState(false);

  const donarAltaSoci = () => {
    setLoading(true);
    return fetchAPI(
      `/socis/${idSoci}/alta`,
      () => {
        setLoading(false);
      },
      { method: "POST" }
    );
  };

  const modalAltaSoci = (callback: () => void) => {
    Modal.confirm({
      title: t("confirm subscription"),
      icon: <ExclamationCircleOutlined />,
      content: t("action undone"),
      okText: t("subscription action"),
      onOk: () => donarAltaSoci().finally(callback),
      onCancel: () => {},
    });
  };

  return [loading, modalAltaSoci] as const;
};
