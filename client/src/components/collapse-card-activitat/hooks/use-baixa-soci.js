import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (soci) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const donarBaixaSoci = () => {
    setLoading(true);
    return fetchAPI(
      `/socis/${soci.id_soci}/baixa`,
      () => {
        setLoading(false);
      },
      dispatch,
      { method: "PUT" }
    );
  };

  const modalBaixaSoci = (callback) => {
    Modal.confirm({
      title: "Confirmes que vols donar de baixa el soci?",
      icon: <ExclamationCircleOutlined />,
      content: "Aquesta acció no es pot desfer.",
      okText: "Donar de baixa",
      okButtonProps: { type: "danger" },
      onOk: () => donarBaixaSoci(soci.id_soci).finally(callback),
      onCancel: () => {},
    });
  };

  return [loading, modalBaixaSoci];
};
