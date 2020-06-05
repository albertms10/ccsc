import { PageHeader, Spin, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { Container } from "../../standalone/container";
import { ContentListPersones } from "../agrupacio/components/content-list-persones";
import { useAssaig, useConvocatsAssaig } from "./hooks";

const { Title } = Typography;

export default () => {
  const setPageHeader = useContext(SetPageHeaderContext);
  const history = useHistory();
  const { id } = useParams();
  const [assaig, loadingAssaig] = useAssaig(id);
  const [convocats, loadingConvocats] = useConvocatsAssaig(id);

  useEffect(() => setPageHeader(assaig.titol), [setPageHeader, assaig]);

  return (
    <>
      <PageHeader
        ghost={false}
        title={assaig.titol}
        onBack={() => history.goBack()}
      />
      <Spin spinning={loadingAssaig}>
        <Container>
          <Title level={2}>{assaig.titol}</Title>
          <ContentListPersones
            title="Convocats"
            integrants={convocats}
            loading={loadingConvocats}
          />
        </Container>
      </Spin>
    </>
  );
};
