import React, { useContext, useEffect } from "react";
import { IconFormacio } from "../../../../assets/icons";
import { Container } from "../../../../standalone/container";
import { ProjecteContext, SetActionContext } from "../../detall-projecte";

export default () => {
  const { formacions } = useContext(ProjecteContext);
  const setAction = useContext(SetActionContext);

  useEffect(() => setAction(null), [setAction]);

  return (
    <Container>
      {formacions &&
        formacions.map((formacio) => (
          <IconFormacio key={formacio.id_formacio} name={formacio.nom_curt} />
        ))}
    </Container>
  );
};
