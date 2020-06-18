import { PageHeader, Space, Spin, Typography } from "antd";
import moment from "moment";
import React, { createContext, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { CalendarAvatar } from "../../standalone/calendar-avatar";
import { Container } from "../../standalone/container";
import { StatusIcon } from "../../standalone/status-icon";
import { timeRange } from "../../utils";
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
          <Space size="middle">
            <CalendarAvatar
              moment={moment(assaig.dia_inici)}
              style={{ transform: "scale(1.4) translate(5px, -3px)" }}
            />
            <Title level={3} style={{ marginLeft: ".75rem" }}>
              {assaig.titol}
            </Title>
            <StatusIcon
              statusId={assaig.id_estat_esdeveniment}
              tooltip={assaig.estat_esdeveniment}
              style={{ transform: "scale(1.3) translate(0, -3px)" }}
            />
            <Title level={4} type="secondary">
              {timeRange(assaig.hora_inici, assaig.hora_final, {
                textual: true,
              })}
            </Title>
          </Space>
          <ContentListConvocatsAssaig />
        </Container>
      </Spin>
    </AssaigContext.Provider>
  );
};
