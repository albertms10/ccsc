import { PageHeader, Spin, Typography } from "antd";
import React, { createContext, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { Container } from "../../standalone/container";
import { ContentListConvocatsAssaig } from "./components/content-list-convocats-assaig";
import { useAssaig } from "./hooks";

const { Title } = Typography;

export const AssaigContext = createContext({});

export default () => {
  const setPageHeader = useContext(SetPageHeaderContext);
  const history = useHistory();
  const { id } = useParams();

  const [assaig, loadingAssaig] = useAssaig(id);

  useEffect(() => setPageHeader(assaig.titol), [setPageHeader, assaig.titol]);

  return (
    <AssaigContext.Provider value={assaig}>
      <PageHeader
        ghost={false}
        title={assaig.titol}
        onBack={() => history.goBack()}
      />
      <Spin spinning={loadingAssaig}>
        <Container>
          <Title level={2}>{assaig.titol}</Title>
          <ContentListConvocatsAssaig />
        </Container>
      </Spin>
    </AssaigContext.Provider>
  );
};
