import React, { useContext, useEffect } from "react";
import { Container } from "../../../../standalone/container";
import { ModalAfegirAssaig } from "../../../assajos/components/modal-afegir-assaig";
import { SearchAssajosTabs } from "../../../assajos/components/search-assajos-tabs";
import { ProjecteContext, SetActionContext } from "../../detall-projecte";

export default () => {
  const { id_projecte } = useContext(ProjecteContext);
  const setAction = useContext(SetActionContext);

  useEffect(() => setAction(<ModalAfegirAssaig />), [setAction]);

  return (
    <Container>
      <SearchAssajosTabs idProjecte={id_projecte} />
    </Container>
  );
};
