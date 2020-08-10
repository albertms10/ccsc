import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetchAPI } from "../../../helpers";

export default (idSoci: number) => {
  const { t } = useTranslation("modals");

  const fetchAPI = useFetchAPI();

  const [loading, setLoading] = useState(false);

  const donarAltaSoci = useCallback(() => {
    setLoading(true);

    return fetchAPI(
      `/socis/${idSoci}/alta`,
      () => {
        setLoading(false);
      },
      { method: "POST" }
    );
  }, [fetchAPI, idSoci]);

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
