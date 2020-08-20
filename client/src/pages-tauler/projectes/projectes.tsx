import { PageHeader } from "antd";
import { Authorized } from "components/authorized";
import { SetPageHeaderContext } from "components/tauler-app/components/site-layout";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "standalone/container";
import { ModalAfegirProjecte } from "./components/modal-afegir-projecte";
import { SearchProjectesTabs } from "./components/search-projectes-tabs";

const Projectes: React.FC = () => {
  const { t } = useTranslation("dashboard");

  const setPageHeader = useContext(SetPageHeaderContext);

  useEffect(() => {
    setPageHeader(t("projects"));
  }, [setPageHeader, t]);

  return (
    <>
      <PageHeader
        className="main-page-header"
        ghost={false}
        title={t("projects")}
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
