import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useFetchAPI } from "helpers";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export default (idSoci: number) => {
  const { t } = useTranslation("modals");

  const fetchAPI = useFetchAPI();

  const [loading, setLoading] = useState(false);

  const donarBaixaSoci = useCallback(() => {
    setLoading(true);

    return fetchAPI(`/socis/${idSoci}/baixa`, null, {
      method: "PUT",
    }).finally(() => setLoading(false));
  }, [fetchAPI, idSoci]);

  const modalBaixaSoci = useCallback(
    (callback: () => void) => {
      Modal.confirm({
        title: t("confirm unsubscription"),
        icon: <ExclamationCircleOutlined />,
        content: t("action undone"),
        okText: t("unsubscription action"),
        okButtonProps: { danger: true },
        onOk: () => donarBaixaSoci().finally(callback),
      });
    },
    [donarBaixaSoci, t]
  );

  return [loading, modalBaixaSoci] as const;
};
