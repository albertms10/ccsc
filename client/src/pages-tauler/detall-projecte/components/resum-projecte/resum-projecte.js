import React, { useContext } from "react";
import { IconFormacio } from "../../../../assets/icons";
import { Container } from "../../../../standalone/container";
import { ProjecteContext } from "../../detall-projecte";

export default () => {
  const { formacions } = useContext(ProjecteContext);

  return (
    <Container>
      {formacions &&
        formacions.map((formacio) => (
          <IconFormacio key={formacio.id_formacio} name={formacio.nom_curt} />
        ))}
    </Container>
  );
};
