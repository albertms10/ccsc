import { ModalButtonBaseProps } from "components/modal-button";
import { ModalSeleccionarMoviment } from "components/modal-seleccionar-moviment";
import { usePostAPI } from "helpers";
import { Moviment } from "model";
import { AssaigContext } from "pages-tauler/detall-assaig";
import React, { useContext } from "react";

interface ModalListMovimentsAssaigProps extends ModalButtonBaseProps {
  movimentsAssaig: Moviment[];
  getMovimentsAssaig: () => void;
}

const ModalListMovimentsAssaig: React.FC<ModalListMovimentsAssaigProps> = ({
  movimentsAssaig,
  getMovimentsAssaig,
  ...rest
}) => {
  const { id_assaig } = useContext(AssaigContext);

  const [loadingPostMoviment, postMoviment] = usePostAPI<{
    id_moviment: number;
  }>(`/assajos/${id_assaig}/moviments`);

  return (
    <ModalSeleccionarMoviment
      dataFilter={(moviment) =>
        !movimentsAssaig.find(
          (movimentAssaig) =>
            movimentAssaig.id_moviment === moviment.id_moviment
        )
      }
      loading={loadingPostMoviment}
      onItemClick={({ id_moviment }) => postMoviment({ id_moviment })}
      thenAction={getMovimentsAssaig}
      {...rest}
    />
  );
};

export default ModalListMovimentsAssaig;
