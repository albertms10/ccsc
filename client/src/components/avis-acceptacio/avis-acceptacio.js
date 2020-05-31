import PropTypes from "prop-types";
import React from "react";
import { SettingCard } from "../../standalone/setting-card";
import { AcceptacionsSociPropTypes } from "../../typedef/prop-types";
import { CheckboxAcceptacioForm } from "./components/checkbox-acceptacio-form";
import { CheckboxAcceptacioIndependent } from "./components/checkbox-acceptacio-independent";
import { SeccioAvis } from "./components/seccio-avis";
import { useAvisAcceptacio } from "./hooks";

const AvisAcceptacio = ({ nameAvis, acceptacionsSoci, isForm }) => {
  const [textAvisAcceptacio, loading] = useAvisAcceptacio(nameAvis);

  return (
    <SettingCard title={textAvisAcceptacio.titol} loading={loading}>
      <SeccioAvis descripcio={textAvisAcceptacio.descripcio} />
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

AvisAcceptacio.propTypes = {
  nameAvis: PropTypes.string.isRequired,
  acceptacionsSoci: AcceptacionsSociPropTypes,
  isForm: PropTypes.bool,
};

AvisAcceptacio.defaultProps = {
  acceptacionsSoci: {},
  isForm: false,
};

export default AvisAcceptacio;
