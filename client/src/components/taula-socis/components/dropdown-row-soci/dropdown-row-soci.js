import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownBorderlessButton } from "../../../../standalone/dropdown-borderless-button";

const DropdownRowSoci = ({ idPersona, showDeleteConfirm }) => {
  const { currentUser } = useSelector(({ user }) => user);

  return (
    <DropdownBorderlessButton
      items={[
        {
          key: "detalls",
          action: <Link to={`/socis/${idPersona}`}>Detalls</Link>,
        },
        ...(currentUser.id_persona !== idPersona
          ? [
              {
                key: "eliminar",
                action: "Eliminar",
                danger: true,
                onClick: () => showDeleteConfirm(idPersona),
              },
            ]
          : []),
      ]}
    />
  );
};

DropdownRowSoci.propTypes = {
  idPersona: PropTypes.number,
  showDeleteConfirm: PropTypes.func,
};

export default DropdownRowSoci;
