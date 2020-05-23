import React from "react";
import { SettingCard } from "../../standalone/setting-card";
import { CheckboxAcceptacio } from "./components/checkbox-acceptacio";
import { SeccioAvis } from "./components/seccio-avis";
import { useAvisAcceptacio } from "./hooks";

export default ({
  idAvis = 1,
  acceptacionsSoci,
  toggleImmediately = false,
}) => {
  const [textAvisAcceptacio, loading] = useAvisAcceptacio(idAvis);

  return (
    <SettingCard title={textAvisAcceptacio.titol} loading={loading}>
      {textAvisAcceptacio.hasOwnProperty("seccions") &&
        textAvisAcceptacio.seccions.map(({ id, titol, descripcio }) => (
          <SeccioAvis key={id} titol={titol} descripcio={descripcio} />
        ))}
      <SeccioAvis titol={textAvisAcceptacio.titol_acceptacions}>
        {textAvisAcceptacio.hasOwnProperty("acceptacions") &&
          textAvisAcceptacio.acceptacions.map((acceptacio) => (
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
