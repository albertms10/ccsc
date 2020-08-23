import { PageHeader, Space, Spin, Typography } from "antd";
import { EventLineItemData } from "components/event-line-item-data";
import { EventLineItemLocalitzacio } from "components/event-line-item-localitzacio";
import { EventLineItemNotes } from "components/event-line-item-notes";
import { SetPageHeaderContext } from "components/tauler-app/components/site-layout";
import { useAPI } from "helpers";
import { Assaig } from "model";
import moment from "moment";
import React, { createContext, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { CalendarAvatar } from "standalone/calendar-avatar";
import { Container } from "standalone/container";
import { ContentListConvocatsAssaig } from "./components/content-list-convocats-assaig";
import { ContentListMovimentsAssaig } from "./components/content-list-moviments-assaig";

const { Title } = Typography;

export const AssaigContext = createContext<Assaig>({} as Assaig);

const DetallAssaig: React.FC = () => {
  const { t } = useTranslation("dashboard");

  const setPageHeader = useContext(SetPageHeaderContext);

  const history = useHistory();
  const { id } = useParams<{ id?: string }>();

  const [assaig, loadingAssaig] = useAPI<Assaig>(
    `/assajos/${id}`,
    {} as Assaig
  );

  useEffect(() => {
    setPageHeader(assaig.titol);
  }, [setPageHeader, assaig.titol]);

  return (
    <AssaigContext.Provider value={assaig}>
      <PageHeader
        ghost={false}
        title={
          <Space size="middle">
            <CalendarAvatar moment={moment(assaig.dia_inici)} />
            <Title level={3} style={{ marginBottom: 0 }}>
              {assaig.titol}
            </Title>
          </Space>
        }
        onBack={() => history.goBack()}
      />
      <Spin spinning={loadingAssaig}>
        <Container>
          <Title level={4}>{t("information")}</Title>
          <Space direction="vertical">
            <EventLineItemData esdeveniment={assaig} />
            <EventLineItemLocalitzacio esdeveniment={assaig} />
            <EventLineItemNotes esdeveniment={assaig} />
          </Space>
        </Container>
        <Container>
          <ContentListMovimentsAssaig />
        </Container>
        <Container>
          <ContentListConvocatsAssaig />
        </Container>
      </Spin>
    </AssaigContext.Provider>
  );
};

export default DetallAssaig;
