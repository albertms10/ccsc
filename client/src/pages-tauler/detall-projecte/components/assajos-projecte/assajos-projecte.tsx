import React, { useContext, useEffect } from "react";
import { Container } from "../../../../standalone/container";
import { SearchAssajosTabs } from "../../../assajos/components/search-assajos-tabs";
import { ProjecteContext, SetActionContext } from "../../detall-projecte";
import { DropdownAfegirAssaigProjecte } from "../dropdown-afegir-assaig-projecte";

const AssajosProjecte:React.FC = () => {
  const projecte = useContext(ProjecteContext);
  const setAction = useContext(SetActionContext);

  useEffect(
    () => setAction(<DropdownAfegirAssaigProjecte projecte={projecte} />),
    [setAction, projecte]
  );

  return (
    <Container>
      <SearchAssajosTabs idProjecte={projecte.id_projecte} />
    </Container>
  );
};

export default AssajosProjecte
