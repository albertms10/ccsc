import { PageHeader } from "antd";
import React, { useContext, useEffect } from "react";
import { Authorized } from "../../components/authorized";
import { TaulaSocis } from "../../components/taula-socis";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { Container } from "../../standalone/container";
import { ModalAfegirSoci } from "./components/modal-afegir-soci";
import { useSocis } from "./hooks";

const Socis: React.FC = () => {
  const setPageHeader = useContext(SetPageHeaderContext);

  const [socis, loading] = useSocis();

  useEffect(() => setPageHeader("Socis"), [setPageHeader]);

  return (
    <>
      <PageHeader
        className="main-page-header"
        ghost={false}
        title="Socis"
        extra={
          <Authorized>
            <ModalAfegirSoci />
          </Authorized>
        }
      />
      <Container>
        <TaulaSocis socis={socis} loading={loading} />
      </Container>
    </>
  );
};

export default Socis;
