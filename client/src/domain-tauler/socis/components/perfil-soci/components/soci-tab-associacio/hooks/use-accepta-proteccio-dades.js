import { useEffect, useState } from "react";
import { fetchAPI } from "../../../../../../../helpers";
import { message } from "antd";
import { useDispatch } from "react-redux";

export default (soci) => {
  const dispatch = useDispatch();
  const [acceptaProteccioDades, setAcceptaProteccioDades] = useState(false);

  useEffect(() => {
    setAcceptaProteccioDades(soci.accepta_proteccio_dades);
  }, [soci.accepta_proteccio_dades]);

  const putAcceptaProteccioDades = (accepta_proteccio_dades) => {
    fetchAPI(
      `/api/socis/${soci.id_soci}/accepta-proteccio-dades`,
      ({ accepta_proteccio_dades }) => {
        setAcceptaProteccioDades(accepta_proteccio_dades);
        message.success(
          `S’ha ${
            accepta_proteccio_dades ? "" : "des"
          }activat l’acceptació de la protecció de dades.`
        );
      },
      dispatch,
      {
        method: "PUT",
        body: JSON.stringify({ accepta_proteccio_dades }),
      }
    );
  };

  return [acceptaProteccioDades, putAcceptaProteccioDades];
};
