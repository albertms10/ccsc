import { ExclamationCircleOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Modal, Typography } from "antd";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAPI } from "../../../../helpers";
import { BorderlessButton } from "../../../../standalone/borderless-button";

const { Text } = Typography;

const DropdownRowSoci = ({ idPersona, getSocis }) => {
  const dispatch = useDispatch();

  const handleEliminar = useCallback(
    (id) => {
      fetchAPI(`/api/socis/${id}`, getSocis, dispatch, {
        method: "DELETE",
      });
    },
    [getSocis, dispatch]
  );

  const showDeleteConfirm = useCallback(
    (id) => {
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
    },
    [handleEliminar]
  );

  return (
    <Dropdown
      placement="bottomRight"
      trigger="click"
      overlay={
        <Menu>
          <Menu.Item>
            <Link to={`/socis/${idPersona}`}>Detalls</Link>
          </Menu.Item>
          <Menu.Item onClick={() => showDeleteConfirm(idPersona)}>
            <Text type="danger">Eliminar</Text>
          </Menu.Item>
        </Menu>
      }
    >
      <BorderlessButton shape="circle" icon={<MoreOutlined />} />
    </Dropdown>
  );
};

DropdownRowSoci.propTypes = {
  idPersona: PropTypes.number,
  getSocis: PropTypes.func,
};

export default DropdownRowSoci;
