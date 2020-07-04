import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { useAPI } from "../../helpers";
import { CollapseCard } from "../../standalone/collapse-card";
import { InfoCard } from "../../standalone/info-card";
import { AcceptacionsSociPropTypes } from "../../typedef/prop-types";
import { CheckboxAcceptacioForm } from "./components/checkbox-acceptacio-form";
import { CheckboxAcceptacioIndependent } from "./components/checkbox-acceptacio-independent";
import { SeccioAvis } from "./components/seccio-avis";

const AvisAcceptacio = ({
  nameAvis,
  acceptacionsSoci = {},
  isForm = false,
  collapsible = false,
}) => {
  const [textAvisAcceptacio, loading] = useAPI(
    `/api/agrupacio/avisos/${nameAvis}`
  );

  const content = useMemo(
    () => (
      <>
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
      </>
    ),
    [acceptacionsSoci, isForm, textAvisAcceptacio]
  );

  return collapsible ? (
    <CollapseCard
      title={textAvisAcceptacio.titol}
      loading={loading}
      active={false}
    >
      {content}
    </CollapseCard>
  ) : (
    <InfoCard title={textAvisAcceptacio.titol} loading={loading}>
      {content}
    </InfoCard>
  );
};

AvisAcceptacio.propTypes = {
  nameAvis: PropTypes.string.isRequired,
  acceptacionsSoci: AcceptacionsSociPropTypes,
  isForm: PropTypes.bool,
  collapsible: PropTypes.bool,
};

export default AvisAcceptacio;
