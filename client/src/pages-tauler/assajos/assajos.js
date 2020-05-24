import { PageHeader } from "antd";
import React from "react";
import { Container } from "../../standalone/container";
import { LlistaAssajos } from "./components/llista-assajos";
import { ModalAfegirAssaig } from "./components/modal-afegir-assaig";

export default () => {
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
