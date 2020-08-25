import { IconFormacio } from "assets/icons";
import {
  ProjecteContext,
  SetActionContext,
} from "pages/tauler/detall-projecte";
import React, { useContext, useEffect } from "react";
import { Container } from "standalone/container";

const ResumProjecte: React.FC = () => {
  const { formacions } = useContext(ProjecteContext);
  const setAction = useContext(SetActionContext);

  useEffect(() => {
    setAction(<></>);
  }, [setAction]);

  return (
    <Container>
      {formacions &&
        formacions.map((formacio) => (
          <IconFormacio key={formacio.id_formacio} name={formacio.nom_curt} />
        ))}
    </Container>
  );
};

export default ResumProjecte;
