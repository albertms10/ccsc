import { PageHeader, Spin, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { Container } from "../../standalone/container";
import { useObra } from "./hooks";

const { Title } = Typography;

export default () => {
  const setPageHeader = useContext(SetPageHeaderContext);
  const history = useHistory();
  const { id } = useParams();
  const [obra, loadingObra] = useObra(id);

  useEffect(() => setPageHeader(obra.titol), [setPageHeader, obra.titol]);

  return (
    <>
      <PageHeader
        ghost={false}
        title={obra.titol}
        onBack={() => history.goBack()}
      />
      <Spin spinning={loadingObra}>
        <Container>
          <Title level={2}>{obra.titol}</Title>
          <Title level={4}>{obra.subtitol}</Title>
        </Container>
      </Spin>
    </>
  );
};
