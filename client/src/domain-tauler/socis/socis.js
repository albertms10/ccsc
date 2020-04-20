import React from "react";

import { Page } from "../../standalone/page";
import { TaulaSocis } from "../../components/taula-socis";
import { ModalAfegirSoci } from "../../components/modal-afegir-soci";
import { Container } from "../../standalone/container";
import { useSocis } from "./hooks";

export default () => {
  const [socis, loading, getSocis] = useSocis();

  return (
    <Container>
      <Page title="Socis" action={<ModalAfegirSoci getSocis={getSocis} />}>
        <TaulaSocis socis={socis} getSocis={getSocis} loading={loading} />
      </Page>
    </Container>
  );
};
