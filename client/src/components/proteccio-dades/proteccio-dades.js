import { Checkbox, Form, Typography } from "antd";
import React from "react";
import { SettingCard } from "../../standalone/setting-card";
import { useProteccioDades } from "./hooks";

const { Title, Paragraph } = Typography;

const SeccioAvis = ({ titol, descripcio, children }) => (
  <>
    <Title level={4}>{titol}</Title>
    <Paragraph>
      <div dangerouslySetInnerHTML={{ __html: descripcio }} />
      {children}
    </Paragraph>
  </>
);

export default () => {
  const [avisProteccioDades, loading] = useProteccioDades();

  return (
    <SettingCard title={avisProteccioDades.titol} loading={loading}>
      {avisProteccioDades.hasOwnProperty("seccions") &&
        avisProteccioDades.seccions.map(({ id, titol, descripcio }) => (
          <SeccioAvis key={id} titol={titol} descripcio={descripcio} />
        ))}
      <SeccioAvis titol={avisProteccioDades.titol_acceptacions}>
        {avisProteccioDades.hasOwnProperty("acceptacions") &&
          avisProteccioDades.acceptacions.map((acceptacio) => (
            <Form.Item
              key={acceptacio.form_name}
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
              <Checkbox>
                <div style={{ display: "inline-grid" }}>
                  <Paragraph style={{ marginBottom: 0 }}>
                    {acceptacio.titol}
                  </Paragraph>
                  <Paragraph type="secondary">
                    {acceptacio.descripcio}
                    {acceptacio.requerida ? " — Requerida" : ""}
                  </Paragraph>
                </div>
              </Checkbox>
            </Form.Item>
          ))}
      </SeccioAvis>
    </SettingCard>
  );
};
