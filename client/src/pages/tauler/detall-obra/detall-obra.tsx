import { PageHeader, Spin, Typography } from "antd";
import { SetPageHeaderContext } from "components/tauler-app/components/site-layout";
import { useAPI } from "helpers";
import { Obra } from "model";
import React, { createContext, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container } from "standalone/container";
import { ContentListMoviments } from "./components/content-list-moviments";

const { Title } = Typography;

export const ObraContext = createContext<Obra>({} as Obra);

const DetallObra: React.FC = () => {
  const setPageHeader = useContext(SetPageHeaderContext);

  const history = useHistory();
  const { id } = useParams<{ id?: string }>();

  const [obra, loadingObra] = useAPI<Obra>(`/obres/${id}`, {} as Obra);

  useEffect(() => {
    setPageHeader(obra.titol);
  }, [setPageHeader, obra.titol]);

  return (
    <ObraContext.Provider value={obra}>
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
            <ContentListMoviments />
          </Container>
        </Spin>
      </>
    </ObraContext.Provider>
  );
};

export default DetallObra;
