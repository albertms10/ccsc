import { message, Spin } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { BooleanMap } from "common";
import { AcceptacioAvis } from "model";
import { SociContext } from "pages/tauler/perfil-soci";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePutAvisAcceptacio } from "../../hooks";
import { CheckboxAcceptacioItem } from "../checkbox-acceptacio-item";

interface CheckboxAcceptacioIndependentProps {
  acceptacio: AcceptacioAvis;
  acceptacionsSoci: BooleanMap;
}

const CheckboxAcceptacioIndependent: React.FC<CheckboxAcceptacioIndependentProps> = ({
  acceptacio,
  acceptacionsSoci,
}) => {
  const { t } = useTranslation("validation");

  const soci = useContext(SociContext);

  const [checked, setChecked] = useState(false);

  const [putAvisAcceptacio, loading] = usePutAvisAcceptacio(
    soci.id_soci as number
  );

  const onChange = useCallback(
    (e: CheckboxChangeEvent) => {
      putAvisAcceptacio(
        { [acceptacio.form_name]: e.target.checked },
        (acceptacio: BooleanMap) => {
          const acceptacioKey = Object.keys(acceptacio)[0];

          setChecked(acceptacio[acceptacioKey]);

          message.success(
            t(
              acceptacio[acceptacioKey]
                ? "acceptance checked"
                : "acceptance unchecked"
            )
          );
        }
      );
    },
    [putAvisAcceptacio, setChecked, acceptacio.form_name, t]
  );

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
        onChange={onChange}
      />
    </Spin>
  );
};

export default CheckboxAcceptacioIndependent;
