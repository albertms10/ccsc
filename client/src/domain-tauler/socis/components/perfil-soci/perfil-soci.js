import React, { createContext, useContext, useEffect } from "react";
import { Avatar, Col, PageHeader, Row, Tabs, Typography } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useSoci } from "./hooks";
import { Container } from "../../../../standalone/container";
import { initials } from "../../../../utils";

import "./perfil-soci.css";
import { SociTabGeneral } from "./components/soci-tab-general";
import { SociTabAssociacio } from "./components/soci-tab-associacio";
import { SetPageHeaderContext } from "../../../../components/tauler-app/components/site-layout/site-layout";

const { Title } = Typography;
const { TabPane } = Tabs;

export const SociContext = createContext(null);

export default () => {
  const setPageHeader = useContext(SetPageHeaderContext);
  const history = useHistory();
  const { id } = useParams();
  const [soci] = useSoci(id);

  useEffect(() => setPageHeader(soci.nom_complet), [
    setPageHeader,
    soci.nom_complet,
  ]);

  return (
    <SociContext.Provider value={soci}>
      <PageHeader
        ghost={false}
        title="Soci"
        onBack={() => history.push("/socis")}
      />
      <Container>
        <div className="perfil-soci">
          <Row type="flex" gutter={[41, 41]}>
            <Col xs={24} sm={6} flex={1}>
              <Avatar className="avatar-soci" shape="square">
                {initials(soci.nom_complet)}
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
                <TabPane tab="Associació" key="associacio">
                  <SociTabAssociacio />
                </TabPane>
                <TabPane tab="Musical" key="musical">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </Container>
    </SociContext.Provider>
  );
};
