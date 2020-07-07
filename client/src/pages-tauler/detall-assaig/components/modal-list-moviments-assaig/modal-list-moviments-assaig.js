import PropTypes from "prop-types";
import React, { useContext } from "react";
import { ModalSeleccionarMoviment } from "../../../../components/modal-seleccionar-moviment";
import { usePostAPI } from "../../../../helpers";
import { AssaigContext } from "../../detall-assaig";

const ModalListMovimentsAssaig = ({
  movimentsAssaig,
  getMovimentsAssaig,
  ...rest
}) => {
  const { id_assaig } = useContext(AssaigContext);

  const [loadingPostMoviment, postMoviment] = usePostAPI(
    `/assajos/${id_assaig}/moviments`
  );

  return (
    <ModalSeleccionarMoviment
      dataFilter={(moviment) =>
        !movimentsAssaig
          .map((moviment) => moviment.id_moviment)
          .includes(moviment.id_moviment)
      }
      loading={loadingPostMoviment}
      onItemClick={postMoviment}
      thenAction={getMovimentsAssaig}
      {...rest}
    />
  );
};

ModalListMovimentsAssaig.propTypes = {
  movimentsAssaig: PropTypes.array,
  getMovimentsAssaig: PropTypes.func,
};

export default ModalListMovimentsAssaig;
