import { ModalSeleccionarMoviment } from "components/modal-seleccionar-moviment";
import { usePostAPI } from "helpers";
import { Projecte } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ActionButton } from "standalone/action-button";
import { fetchMoviments } from "store/moviments/thunks";

interface DropdownAfegirMovimentProjecteProps {
  projecte: Projecte;
}

const DropdownAfegirMovimentProjecte: React.FC<DropdownAfegirMovimentProjecteProps> = ({
  projecte,
}) => {
  const { t } = useTranslation("actions");

  const dispatch = useDispatch();

  const [loadingPostMoviment, postMoviment] = usePostAPI<{
    id_moviment: number;
  }>(`/projectes/${projecte.id_projecte}/moviments`);

  return (
    <ModalSeleccionarMoviment
      button={<ActionButton mainAction={t("select movement")} />}
      loading={loadingPostMoviment}
      dataFilter={(moviment) =>
        !moviment.projectes.find(
          (projecteMoviment) =>
            projecteMoviment.id_projecte === projecte.id_projecte
        )
      }
      onItemClick={({ id_moviment }) => postMoviment({ id_moviment })}
      thenAction={() => dispatch(fetchMoviments())}
    />
  );
};

export default DropdownAfegirMovimentProjecte;
