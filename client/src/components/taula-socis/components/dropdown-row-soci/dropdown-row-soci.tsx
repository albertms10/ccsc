import { Usuari } from "model";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownBorderlessButton } from "../../../../standalone/dropdown-borderless-button";
import { RootState } from "../../../../store/types";

interface DropdownRowSociProps {
  idPersona: number;
  showDeleteConfirm: (idPersona: number) => void;
}

const DropdownRowSoci: React.FC<DropdownRowSociProps> = ({
  idPersona,
  showDeleteConfirm,
}) => {
  const currentUser = useSelector(
    ({ user }: RootState) => user.currentUser
  ) as Usuari;

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

export default DropdownRowSoci;
