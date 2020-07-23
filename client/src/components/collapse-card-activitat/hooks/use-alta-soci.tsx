import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (idSoci: number) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const donarAltaSoci = () => {
    setLoading(true);
    return fetchAPI(
      `/socis/${idSoci}/alta`,
      () => {
        setLoading(false);
      },
      dispatch,
      { method: "POST" }
    );
  };

  const modalAltaSoci = (callback: () => void) => {
    Modal.confirm({
      title: "Confirmes que vols donar d’alta el soci?",
      icon: <ExclamationCircleOutlined />,
      content: "Aquesta acció no es pot desfer.",
      okText: "Donar d’alta",
      onOk: () => donarAltaSoci().finally(callback),
      onCancel: () => {},
    });
  };

  return [loading, modalAltaSoci] as const;
};
