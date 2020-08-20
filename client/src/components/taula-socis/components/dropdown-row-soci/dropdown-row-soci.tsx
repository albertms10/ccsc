import { Usuari } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownBorderlessButton } from "standalone/dropdown-borderless-button";
import { RootState } from "store/types";
import { linkText } from "utils";

interface DropdownRowSociProps {
  idPersona: number;
  showDeleteConfirm: (idPersona: number) => void;
}

const DropdownRowSoci: React.FC<DropdownRowSociProps> = ({
  idPersona,
  showDeleteConfirm,
}) => {
  const { t } = useTranslation("dashboard");

  const currentUser = useSelector(
    ({ user }: RootState) => user.currentUser
  ) as Usuari;

  return (
    <DropdownBorderlessButton
      items={[
        {
          key: t("common:details"),
          action: (
            <Link to={`/${linkText(t("partners"))}/${idPersona}`}>
              {t("common:details")}
            </Link>
          ),
        },
        ...(currentUser.id_persona !== idPersona
          ? [
              {
                key: t("common:delete"),
                action: t("common:delete"),
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
