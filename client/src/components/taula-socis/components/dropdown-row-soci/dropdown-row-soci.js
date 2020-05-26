import { Typography } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { DropdownBorderlessButton } from "../../../../standalone/dropdown-borderless-button";
import { useEliminarSoci } from "../../hooks";

const { Text } = Typography;

const DropdownRowSoci = ({ idPersona, getSocis }) => {
  const [showDeleteConfirm] = useEliminarSoci(getSocis);

  return (
    <DropdownBorderlessButton
      items={[
        {
          key: "detalls",
          action: <Link to={`/socis/${idPersona}`}>Detalls</Link>,
        },
        {
          key: "eliminar",
          action: <Text type="danger">Eliminar</Text>,
          onClick: () => showDeleteConfirm(idPersona),
        },
      ]}
    />
  );
};

DropdownRowSoci.propTypes = {
  idPersona: PropTypes.number,
  getSocis: PropTypes.func,
};

export default DropdownRowSoci;
