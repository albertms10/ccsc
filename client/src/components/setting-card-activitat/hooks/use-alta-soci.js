import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (soci) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const donarAltaSoci = () => {
    setLoading(true);
    return fetchAPI(
      `/api/socis/${soci.id_soci}/alta`,
      () => {
        setLoading(false);
      },
      dispatch,
      { method: "POST" }
    );
  };

  const modalAltaSoci = (callback) => {
    Modal.confirm({
      title: `Confirmes que vols donar d’alta el soci?`,
      icon: <ExclamationCircleOutlined />,
      content: "Aquesta acció no es pot desfer.",
      okText: "Donar d’alta",
      onOk: () => donarAltaSoci(soci.id_soci).finally(callback),
      onCancel: () => {},
    });
  };

  return [loading, modalAltaSoci];
};
