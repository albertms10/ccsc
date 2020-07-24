import { PageHeader } from "antd";
import React, { useContext, useEffect } from "react";
import { Authorized } from "../../components/authorized";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { Container } from "../../standalone/container";
import { LlistaObres } from "./components/llista-obres";
import { ModalAfegirObra } from "./components/modal-afegir-obra";

const Obres: React.FC = () => {
  const setPageHeader = useContext(SetPageHeaderContext);

  useEffect(() => setPageHeader("Obres"), [setPageHeader]);

  return (
    <>
      <PageHeader
        className="main-page-header"
        ghost={false}
        title="Obres"
        extra={
          <Authorized>
            <ModalAfegirObra />
          </Authorized>
        }
      />
      <Container>
        <LlistaObres />
      </Container>
    </>
  );
};

export default Obres;
