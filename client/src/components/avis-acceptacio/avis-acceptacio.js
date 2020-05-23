import React from "react";
import { SettingCard } from "../../standalone/setting-card";
import { CheckboxAcceptacioForm } from "./components/checkbox-acceptacio-form";
import { CheckboxAcceptacioIndependent } from "./components/checkbox-acceptacio-independent";
import { SeccioAvis } from "./components/seccio-avis";
import { useAvisAcceptacio } from "./hooks";

export default ({ idAvis = 1, acceptacionsSoci, isForm = false }) => {
  const [textAvisAcceptacio, loading] = useAvisAcceptacio(idAvis);

  return (
    <SettingCard title={textAvisAcceptacio.titol} loading={loading}>
      {textAvisAcceptacio.hasOwnProperty("seccions") &&
        textAvisAcceptacio.seccions.map(({ id, titol, descripcio }) => (
          <SeccioAvis key={id} titol={titol} descripcio={descripcio} />
        ))}
      <SeccioAvis titol={textAvisAcceptacio.titol_acceptacions}>
        {textAvisAcceptacio.hasOwnProperty("acceptacions") &&
          textAvisAcceptacio.acceptacions.map((acceptacio) =>
            isForm ? (
              <CheckboxAcceptacioForm
                key={acceptacio.form_name}
                acceptacio={acceptacio}
              />
            ) : (
              <CheckboxAcceptacioIndependent
                key={acceptacio.form_name}
                acceptacio={acceptacio}
                acceptacionsSoci={acceptacionsSoci}
              />
            )
          )}
      </SeccioAvis>
    </SettingCard>
  );
};
