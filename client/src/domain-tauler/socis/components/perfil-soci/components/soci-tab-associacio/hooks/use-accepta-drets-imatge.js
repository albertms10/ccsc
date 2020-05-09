import { message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../../../helpers";

export default (soci) => {
  const dispatch = useDispatch();
  const [acceptaDretsImatge, setAcceptaDretsImatge] = useState(false);

  useEffect(() => {
    setAcceptaDretsImatge(soci.accepta_drets_imatge);
  }, [soci.accepta_drets_imatge]);

  const putAcceptaDretsImatge = (accepta_drets_imatge) => {
    fetchAPI(
      `/api/socis/${soci.id_soci}/accepta-drets-imatge`,
      ({ accepta_drets_imatge }) => {
        setAcceptaDretsImatge(accepta_drets_imatge);
        message.success(
          `S’ha ${
            accepta_drets_imatge ? "" : "des"
          }activat l’acceptació dels drets d’imatge.`
        );
      },
      dispatch,
      {
        method: "PUT",
        body: JSON.stringify({ accepta_drets_imatge }),
      }
    );
  };

  return [acceptaDretsImatge, putAcceptaDretsImatge];
};
