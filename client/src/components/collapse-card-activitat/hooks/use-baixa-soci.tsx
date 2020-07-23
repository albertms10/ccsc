import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (idSoci: number) => {
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
      title: "Confirmes que vols donar de baixa el soci?",
      icon: <ExclamationCircleOutlined />,
      content: "Aquesta acció no es pot desfer.",
      okText: "Donar de baixa",
      okButtonProps: { danger: true },
      onOk: () => donarBaixaSoci().finally(callback),
      onCancel: () => {},
    });
  };

  return [loading, modalBaixaSoci] as const;
};
