import { PageHeader } from "antd";
import React, { useContext, useEffect } from "react";
import { Authorized } from "../../components/authorized";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { Container } from "../../standalone/container";
import { ModalAfegirAssaig } from "./components/modal-afegir-assaig";
import { SearchAssajosTabs } from "./components/search-assajos-tabs";

const Assajos: React.FC = () => {
  const setPageHeader = useContext(SetPageHeaderContext);

  useEffect(() => setPageHeader("Assajos"), [setPageHeader]);

  return (
    <>
      <PageHeader
        className="main-page-header"
        ghost={false}
        title="Assajos"
        extra={
          <Authorized>
            <ModalAfegirAssaig />
          </Authorized>
        }
      />
      <Container>
        <SearchAssajosTabs />
      </Container>
    </>
  );
};

export default Assajos;
