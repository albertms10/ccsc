import React, { useContext, useEffect } from "react";
import { LlistaMoviments } from "../../../../components/llista-moviments";
import { Container } from "../../../../standalone/container";
import { ProjecteContext, SetActionContext } from "../../detall-projecte";
import { DropdownAfegirMovimentProjecte } from "../dropdown-afegir-moviment-projecte";

const RepertoriProjecte: React.FC = () => {
  const projecte = useContext(ProjecteContext);
  const setAction = useContext(SetActionContext);

  useEffect(
    () => setAction(<DropdownAfegirMovimentProjecte projecte={projecte} />),
    [setAction, projecte]
  );

  return (
    <Container>
      <LlistaMoviments idProjecte={projecte.id_projecte} />
    </Container>
  );
};

export default RepertoriProjecte;
