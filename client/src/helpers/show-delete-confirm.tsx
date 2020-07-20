import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

type AnyFunction = (...args: any[]) => any;

export default (element: string, onOk: AnyFunction) => {
  Modal.confirm({
    title: `Confirmes que vols eliminar ${element} i totes les dades associades?`,
    icon: <ExclamationCircleOutlined />,
    content: "Aquesta acció no es pot desfer.",
    okText: "Elimina",
    okButtonProps: { danger: true },
    onCancel: () => {},
    onOk,
  });
};
