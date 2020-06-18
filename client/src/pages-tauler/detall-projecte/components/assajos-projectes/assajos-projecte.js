import React, { useContext } from "react";
import { Container } from "../../../../standalone/container";
import { SearchAssajosTabs } from "../../../assajos/components/search-assajos-tabs";
import { ProjecteContext } from "../../detall-projecte";

export default () => {
  const { id_projecte } = useContext(ProjecteContext);

  return (
    <Container>
      <SearchAssajosTabs idProjecte={id_projecte} />
    </Container>
  );
};
