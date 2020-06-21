import {
  BookOutlined,
  InfoCircleOutlined,
  LayoutOutlined,
} from "@ant-design/icons";
import { Card, Space, Spin, Tag, Typography } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { FixedTagsProjectes } from "../../../../components/fixed-tags-projectes";
import { IconsFormacions } from "../../../../components/icons-formacions";
import { joinComponents } from "../../../../helpers";
import { CalendarAvatar } from "../../../../standalone/calendar-avatar";
import { EventLineItem } from "../../../../standalone/event-line-item";
import { StatusIcon } from "../../../../standalone/status-icon";
import { dateRange, timeRange } from "../../../../utils";
import { usePropersAssajos } from "./hooks";
import "./propers-assajos.css";

export default ({ style }) => {
  const [properAssaig, loadingProperAssaig] = usePropersAssajos(1);

  return (
    <div style={{ margin: "0 -1rem", ...style }}>
      <Spin spinning={loadingProperAssaig}>
        <div key={properAssaig.id_assaig} className="propers-assajos-wrapper">
          <Card
            title={
              <Space>
                <CalendarAvatar moment={moment(properAssaig.data_inici)} />
                {properAssaig.titol}
                <StatusIcon
                  tooltip={properAssaig.estat_esdeveniment}
                  statusId={properAssaig.id_estat_esdeveniment}
                />
                <Typography.Text
                  type="secondary"
                  style={{ fontWeight: "normal" }}
                >
                  {timeRange(properAssaig.hora_inici, properAssaig.hora_final)}
                </Typography.Text>
              </Space>
            }
          >
            <Space direction="vertical">
              <EventLineItem>
                {joinComponents(
                  dateRange(
                    properAssaig.dia_inici,
                    properAssaig.hora_inici,
                    properAssaig.dia_final,
                    properAssaig.hora_final
                  ),
                  (item, index) => (
                    <span key={index}>{item}</span>
                  ),
                  (key) => (
                    <span key={key} style={{ padding: "0 .25rem" }}>
                      ·
                    </span>
                  )
                )}
              </EventLineItem>
              <EventLineItem icon={<LayoutOutlined />}>
                <Space>
                  <FixedTagsProjectes projectes={properAssaig.projectes} />
                  <IconsFormacions formacions={properAssaig.formacions} />
                </Space>
              </EventLineItem>
              {properAssaig.moviments && properAssaig.moviments.length > 0 && (
                <EventLineItem icon={<BookOutlined />}>
                  {properAssaig.moviments.map((moviment) => (
                    <Tag key={moviment.id_moviment}>
                      {moviment.titol_moviment}
                    </Tag>
                  ))}
                </EventLineItem>
              )}
              <EventLineItem icon={<InfoCircleOutlined />}>
                <Link to={`/assajos/${properAssaig.id_assaig}`}>
                  Més detalls
                </Link>
              </EventLineItem>
            </Space>
          </Card>
        </div>
      </Spin>
    </div>
  );
};
