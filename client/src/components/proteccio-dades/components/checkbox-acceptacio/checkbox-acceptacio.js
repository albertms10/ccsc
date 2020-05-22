import { Checkbox, Form, Typography } from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../helpers";
import { SociContext } from "../../../../pages-tauler/perfil-soci/perfil-soci";
import "./checkbox-acceptacio.css";

const { Paragraph } = Typography;

export default ({ acceptacio, acceptacionsSoci, toggleImmediately }) => {
  const dispatch = useDispatch();
  const soci = useContext(SociContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (toggleImmediately) setChecked(acceptacionsSoci[acceptacio.form_name]);
  }, [toggleImmediately, acceptacionsSoci, acceptacio.form_name]);

  let putAcceptacio;

  if (toggleImmediately)
    putAcceptacio = useCallback(
      (acceptacio) => {
        fetchAPI(
          `/api/socis/${soci.id_soci}/acceptacio`,
          (accepta) => {
            setChecked(accepta);
          },
          dispatch,
          {
            method: "PUT",
            body: JSON.stringify(acceptacio),
          }
        );
      },
      [soci.id_soci, dispatch]
    );

  const checkboxItem = (
    <Checkbox
      checked={checked}
      {...(toggleImmediately && {
        onChange: (e) => {
          putAcceptacio({
            [acceptacio.form_name]: e.target.checked,
          });
        },
        disabled:
          acceptacionsSoci[acceptacio.form_name] && acceptacio.requerida,
      })}
    >
      <div style={{ display: "inline-grid" }}>
        <Paragraph style={{ marginBottom: 0 }}>{acceptacio.titol}</Paragraph>
        <Paragraph type="secondary">
          {acceptacio.descripcio}
          {acceptacio.requerida ? " — Requerida" : ""}
        </Paragraph>
      </div>
    </Checkbox>
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
