import { LlistaMoviments } from "components/llista-moviments";
import {
  ProjecteContext,
  SetActionContext,
} from "pages/tauler/detall-projecte";
import React, { useContext, useEffect } from "react";
import { Container } from "standalone/container";
import { DropdownAfegirMovimentProjecte } from "../dropdown-afegir-moviment-projecte";

const RepertoriProjecte: React.FC = () => {
  const projecte = useContext(ProjecteContext);
  const setAction = useContext(SetActionContext);

  useEffect(() => {
    setAction(<DropdownAfegirMovimentProjecte projecte={projecte} />);
  }, [setAction, projecte]);

  return (
    <Container>
      <LlistaMoviments idProjecte={projecte.id_projecte} />
    </Container>
  );
};

export default RepertoriProjecte;
