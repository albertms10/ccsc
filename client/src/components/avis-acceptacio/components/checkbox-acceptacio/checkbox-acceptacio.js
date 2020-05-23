import { Checkbox, Form, message, Spin, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { SociContext } from "../../../../pages-tauler/perfil-soci/perfil-soci";
import { usePutAvisAcceptacio } from "../../hooks";
import "./checkbox-acceptacio.css";

const { Paragraph } = Typography;

export default ({ acceptacio, acceptacionsSoci, toggleImmediately }) => {
  const soci = useContext(SociContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (toggleImmediately) setChecked(acceptacionsSoci[acceptacio.form_name]);
  }, [toggleImmediately, acceptacionsSoci, acceptacio.form_name]);

  let loading = false,
    putAvisAcceptacio;

  if (toggleImmediately)
    [loading, putAvisAcceptacio] = usePutAvisAcceptacio(soci.id_soci);

  const checkboxItem = (
    <Spin spinning={loading}>
      <Checkbox
        {...(toggleImmediately && {
          onChange: (e) => {
            putAvisAcceptacio(
              { [acceptacio.form_name]: e.target.checked },
              (acceptacio) => {
                const acceptacioKey = Object.keys(acceptacio)[0];
                setChecked(acceptacio[acceptacioKey]);
                message.success(
                  `S’ha ${acceptacio[acceptacioKey] ? "" : "des"}activat l’acceptació.`
                );
              }
            );
          },
          disabled:
            acceptacionsSoci[acceptacio.form_name] && acceptacio.requerida,
          checked,
        })}
      >
        <div style={{ display: "inline-grid" }}>
          <Paragraph style={{ marginBottom: 0 }}>{acceptacio.titol}</Paragraph>
          <Paragraph type="secondary">
            {acceptacio.descripcio}
            {acceptacio.requerida ? " —\u00a0Requerida" : ""}
          </Paragraph>
        </div>
      </Checkbox>
    </Spin>
  );

  return toggleImmediately ? (
    checkboxItem
  ) : (
    <Form.Item
      name={["acceptacions", acceptacio.form_name]}
      valuePropName="checked"
      rules={
        acceptacio.requerida
          ? [
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Has de marcar la casella"),
              },
            ]
          : []
      }
      style={{ marginBottom: ".5rem" }}
    >
      {checkboxItem}
    </Form.Item>
  );
};
