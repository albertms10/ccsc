import { PageHeader } from "antd";
import React, { useContext, useEffect } from "react";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { Container } from "../../standalone/container";
import { LlistaAssajos } from "./components/llista-assajos";
import { ModalAfegirAssaig } from "./components/modal-afegir-assaig";

export default () => {
  const setPageHeader = useContext(SetPageHeaderContext);

  useEffect(() => setPageHeader("Assajos"), [setPageHeader]);

  return (
    <>
      <PageHeader
        className="main-page-header"
        ghost={false}
        title="Assajos"
        extra={<ModalAfegirAssaig />}
      />
      <Container>
        <LlistaAssajos />
      </Container>
    </>
  );
};
