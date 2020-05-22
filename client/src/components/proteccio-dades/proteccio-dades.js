import { Typography } from "antd";
import React from "react";
import ReactMarkdown from "react-markdown";
import { SettingCard } from "../../standalone/setting-card";
import { CheckboxAcceptacio } from "./components/checkbox-acceptacio";
import { useProteccioDades } from "./hooks";

const { Title, Paragraph } = Typography;

const SeccioAvis = ({ titol, descripcio, children }) => (
  <>
    <Title level={4}>{titol}</Title>
    <Paragraph>
      <ReactMarkdown source={descripcio} />
      {children}
    </Paragraph>
  </>
);

export default ({ acceptacionsSoci, toggleImmediately = false }) => {
  const [textProteccioDades, loading] = useProteccioDades();

  return (
    <SettingCard title={textProteccioDades.titol} loading={loading}>
      {textProteccioDades.hasOwnProperty("seccions") &&
        textProteccioDades.seccions.map(({ id, titol, descripcio }) => (
          <SeccioAvis key={id} titol={titol} descripcio={descripcio} />
        ))}
      <SeccioAvis titol={textProteccioDades.titol_acceptacions}>
        {textProteccioDades.hasOwnProperty("acceptacions") &&
          textProteccioDades.acceptacions.map((acceptacio) => (
            <CheckboxAcceptacio
              key={acceptacio.form_name}
              acceptacio={acceptacio}
              acceptacionsSoci={acceptacionsSoci}
              toggleImmediately={toggleImmediately}
            />
          ))}
      </SeccioAvis>
    </SettingCard>
  );
};
