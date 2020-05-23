import { message, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { SociContext } from "../../../../pages-tauler/perfil-soci/perfil-soci";
import {
  AcceptacionsSociPropTypes,
  AcceptacioPropTypes,
} from "../../../../typedef/prop-types";
import { usePutAvisAcceptacio } from "../../hooks";
import { CheckboxAcceptacioItem } from "../checkbox-acceptacio-item";

const CheckboxAcceptacioIndependent = ({ acceptacio, acceptacionsSoci }) => {
  const soci = useContext(SociContext);
  const [checked, setChecked] = useState(false);
  const [loading, putAvisAcceptacio] = usePutAvisAcceptacio(soci.id_soci);

  useEffect(() => {
    setChecked(acceptacionsSoci[acceptacio.form_name]);
  }, [acceptacionsSoci, acceptacio.form_name]);

  return (
    <Spin spinning={loading}>
      <CheckboxAcceptacioItem
        acceptacio={acceptacio}
        checked={checked}
        disabled={
          acceptacionsSoci[acceptacio.form_name] && acceptacio.requerida
        }
        onChange={({ target }) => {
          putAvisAcceptacio(
            { [acceptacio.form_name]: target.checked },
            (acceptacio) => {
              const acceptacioKey = Object.keys(acceptacio)[0];
              setChecked(acceptacio[acceptacioKey]);
              message.success(
                `S’ha ${
                  acceptacio[acceptacioKey] ? "" : "des"
                }activat l’acceptació.`
              );
            }
          );
        }}
      />
    </Spin>
  );
};

CheckboxAcceptacioIndependent.propTypes = {
  acceptacio: AcceptacioPropTypes.isRequired,
  acceptacionsSoci: AcceptacionsSociPropTypes.isRequired,
};

CheckboxAcceptacioIndependent.defaultTypes = {
  acceptacio: {},
  acceptacionsSoci: {},
};

export default CheckboxAcceptacioIndependent;
