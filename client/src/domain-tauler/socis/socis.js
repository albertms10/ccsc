import React from "react";
import { TaulaSocis } from "../../components/taula-socis";
import { ModalAfegirSoci } from "../../components/modal-afegir-soci";
import { useSocis } from "./hooks";
import { PageHeader } from "antd";
import { Container } from "../../standalone/container";

export default () => {
  const [socis, loading, getSocis] = useSocis();

  return (
    <>
      <PageHeader
        className="main-page-header"
        ghost={false}
        title="Socis"
        extra={<ModalAfegirSoci getSocis={getSocis} />}
      />
      <Container>
        <TaulaSocis socis={socis} getSocis={getSocis} loading={loading} />
      </Container>
    </>
  );
};
