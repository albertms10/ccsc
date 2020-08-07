import { Avatar, Col, PageHeader, Row, Tabs, Typography } from "antd";
import { Soci } from "model";
import React, { createContext, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { useAPI } from "../../helpers";
import { Container } from "../../standalone/container";
import { initials } from "../../utils";
import { SociTabEntitat } from "./components/soci-tab-entitat";
import { SociTabGeneral } from "./components/soci-tab-general";
import { SociTabMusical } from "./components/soci-tab-musical";
import "./perfil-soci.css";

const { Title } = Typography;
const { TabPane } = Tabs;

export const SociContext = createContext<Soci>({} as Soci);

export default () => {
  const setPageHeader = useContext(SetPageHeaderContext);

  const history = useHistory();
  const { id } = useParams();

  const [soci] = useAPI<Soci>(`/socis/${id}`, {} as Soci);

  useEffect(() => {
    setPageHeader(soci.nom_complet);
  }, [setPageHeader, soci.nom_complet]);

  return (
    <SociContext.Provider value={soci}>
      <PageHeader
        ghost={false}
        title={soci.nom_complet}
        onBack={() => history.goBack()}
      />
      <Container>
        <div className="perfil-soci">
          <Row gutter={[41, 41]}>
            <Col xs={24} sm={6} flex={1}>
              <Avatar className="avatar-soci" shape="square">
                {initials(soci.nom_complet || "")}
              </Avatar>
            </Col>
            <Col xs={24} sm={18} flex={1}>
              <Title level={2} style={{ marginBottom: 0 }}>
                {soci.nom_complet}
              </Title>
              <Title level={4} type="secondary" style={{ marginTop: 0 }}>
                {soci.username}
              </Title>
              <Tabs defaultActiveKey="general">
                <TabPane tab="General" key="general">
                  <SociTabGeneral />
                </TabPane>
                <TabPane tab="Entitat" key="entitat">
                  <SociTabEntitat />
                </TabPane>
                <TabPane tab="Musical" key="musical">
                  <SociTabMusical />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </Container>
    </SociContext.Provider>
  );
};
