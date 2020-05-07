import React, { useContext, useEffect } from "react";
import { TaulaSocis } from "../../components/taula-socis";
import { ModalAfegirSoci } from "../../components/modal-afegir-soci";
import { useSocis } from "./hooks";
import { PageHeader } from "antd";
import { Container } from "../../standalone/container";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";

export default () => {
  const setPageHeader = useContext(SetPageHeaderContext);
  const [socis, loading, getSocis] = useSocis();

  useEffect(() => setPageHeader("Socis"), [setPageHeader]);

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
