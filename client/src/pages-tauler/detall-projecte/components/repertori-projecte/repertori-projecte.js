import React, { useContext, useEffect } from "react";
import { Container } from "../../../../standalone/container";
import { ProjecteContext, SetActionContext } from "../../detall-projecte";

export default () => {
  const { id_projecte } = useContext(ProjecteContext);
  const setAction = useContext(SetActionContext);

  useEffect(() => setAction(<></>), [
    setAction,
    id_projecte
  ]);

  return <Container>

  </Container>;
};
