import { PageHeader } from "antd";
import React from "react";
import { Container } from "../../standalone/container";
import { LlistaProjectes } from "./components/llista-projectes";

export default () => {
  return (
    <>
      <PageHeader
        className="main-page-header"
        ghost={false}
        title="Projectes"
      />
      <Container>
        <LlistaProjectes />
      </Container>
    </>
  );
};
