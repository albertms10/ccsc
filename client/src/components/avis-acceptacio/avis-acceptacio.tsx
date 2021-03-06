import { BooleanMap } from "common";
import { useAPI } from "helpers";
import { Avis } from "model";
import React, { useCallback, useMemo } from "react";
import { CollapseCard } from "standalone/collapse-card";
import { InfoCard } from "standalone/info-card";
import { CheckboxAcceptacioForm } from "./components/checkbox-acceptacio-form";
import { CheckboxAcceptacioIndependent } from "./components/checkbox-acceptacio-independent";
import { SeccioAvis } from "./components/seccio-avis";

interface AvisAcceptacioProps {
  nameAvis: string;
  acceptacionsSoci?: BooleanMap;
  isForm?: boolean;
  collapsible?: boolean;
}

const AvisAcceptacio: React.FC<AvisAcceptacioProps> = ({
  nameAvis,
  acceptacionsSoci = {},
  isForm = false,
  collapsible = false,
}) => {
  const [textAvisAcceptacio, loading] = useAPI<Avis>(
    `/entitats/avisos/${nameAvis}`,
    {} as Avis
  );

  const mapSeccions = useCallback(
    ({ id_seccio_avis, titol, descripcio }) => (
      <SeccioAvis key={id_seccio_avis} titol={titol} descripcio={descripcio} />
    ),
    []
  );

  const mapAcceptacions = useCallback(
    (acceptacio) =>
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
      ),
    [acceptacionsSoci, isForm]
  );

  const content = useMemo(
    () => (
      <>
        <SeccioAvis descripcio={textAvisAcceptacio.descripcio} />
        {textAvisAcceptacio.seccions &&
          textAvisAcceptacio.seccions.map(mapSeccions)}
        <SeccioAvis titol={textAvisAcceptacio.titol_acceptacions}>
          {textAvisAcceptacio.acceptacions &&
            textAvisAcceptacio.acceptacions.map(mapAcceptacions)}
        </SeccioAvis>
      </>
    ),
    [textAvisAcceptacio, mapSeccions, mapAcceptacions]
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

export default AvisAcceptacio;
