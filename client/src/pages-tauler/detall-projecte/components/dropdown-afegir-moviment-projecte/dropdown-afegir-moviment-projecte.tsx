import { Projecte } from "model";
import React from "react";
import { useDispatch } from "react-redux";
import { ModalSeleccionarMoviment } from "../../../../components/modal-seleccionar-moviment";
import { usePostAPI } from "../../../../helpers";
import { ActionButton } from "../../../../standalone/action-button";
import { fetchMoviments } from "../../../../store/moviments/thunks";

interface DropdownAfegirMovimentProjecteProps {
  projecte: Projecte;
}

const DropdownAfegirMovimentProjecte: React.FC<DropdownAfegirMovimentProjecteProps> = ({
  projecte,
}) => {
  const dispatch = useDispatch();

  const [loadingPostMoviment, postMoviment] = usePostAPI<{
    id_moviment: number;
  }>(`/projectes/${projecte.id_projecte}/moviments`);

  return (
    <ModalSeleccionarMoviment
      button={<ActionButton mainAction="Seleccionar moviment" />}
      loading={loadingPostMoviment}
      dataFilter={(moviment) =>
        !moviment.projectes.find(
          (projecteMoviment) =>
            projecteMoviment.id_projecte === projecte.id_projecte
        )
      }
      onItemClick={({ id_moviment }) =>
        postMoviment({ id_moviment }).then(() => dispatch(fetchMoviments()))
      }
    />
  );
};

export default DropdownAfegirMovimentProjecte;
