import { PageHeader } from "antd";
import React from "react";
import { Authorized } from "../../components/authorized";
import { Container } from "../../standalone/container";
import { LlistaProjectes } from "./components/llista-projectes";
import { ModalAfegirProjecte } from "./components/modal-afegir-projecte";

export default () => {
  return (
    <>
      <PageHeader
        className="main-page-header"
        ghost={false}
        title="Projectes"
        extra={
          <Authorized>
            <ModalAfegirProjecte />
          </Authorized>
        }
      />
      <Container>
        <LlistaProjectes />
      </Container>
    </>
  );
};
