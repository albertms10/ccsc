import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (callback) => {
  const dispatch = useDispatch();

  const handleEliminar = (id) => {
    fetchAPI(
      `/api/socis/${id}`,
      () => {
        if (typeof callback === "function") callback();
      },
      dispatch,
      { method: "DELETE" }
    );
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title:
        "Confirmes que vols eliminar el soci i totes les dades associades?",
      icon: <ExclamationCircleOutlined />,
      content: "Aquesta acció no es pot desfer.",
      okText: "Elimina",
      okButtonProps: { type: "danger" },
      onOk: () => handleEliminar(id),
      onCancel: () => {},
    });
  };

  return [showDeleteConfirm];
};
