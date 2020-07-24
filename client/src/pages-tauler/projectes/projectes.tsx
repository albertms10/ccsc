import { PageHeader } from "antd";
import React, { useContext, useEffect } from "react";
import { Authorized } from "../../components/authorized";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { Container } from "../../standalone/container";
import { ModalAfegirProjecte } from "./components/modal-afegir-projecte";
import { SearchProjectesTabs } from "./components/search-projectes-tabs";

const Projectes: React.FC = () => {
  const setPageHeader = useContext(SetPageHeaderContext);

  useEffect(() => setPageHeader("Projectes"), [setPageHeader]);

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
        <SearchProjectesTabs />
      </Container>
    </>
  );
};

export default Projectes;
