import { PageHeader, Spin, Typography } from "antd";
import React, { createContext, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { useAPI } from "../../helpers";
import { Container } from "../../standalone/container";

const { Title } = Typography;

export const MovimentContext = createContext({});

export default () => {
  const setPageHeader = useContext(SetPageHeaderContext);

  const history = useHistory();
  const { moviment: idMoviment } = useParams();

  const [moviment, loadingMoviment] = useAPI(`/moviments/${idMoviment}`);

  useEffect(() => setPageHeader(moviment.titol_moviment), [
    setPageHeader,
    moviment.titol_moviment,
  ]);

  return (
    <MovimentContext.Provider value={moviment}>
      <>
        <PageHeader
          ghost={false}
          title={moviment.titol_moviment}
          onBack={() => history.goBack()}
        />
        <Spin spinning={loadingMoviment}>
          <Container>
            <Title level={2}>{moviment.titol_moviment}</Title>
            <Title level={4}>{moviment.titol_obra}</Title>
          </Container>
        </Spin>
      </>
    </MovimentContext.Provider>
  );
};
