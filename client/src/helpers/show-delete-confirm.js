import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

export default (element, callback) => {
  Modal.confirm({
    title: `Confirmes que vols eliminar ${element} i totes les dades associades?`,
    icon: <ExclamationCircleOutlined />,
    content: "Aquesta acció no es pot desfer.",
    okText: "Elimina",
    okButtonProps: { type: "danger" },
    onOk: callback,
    onCancel: () => {},
  });
};
