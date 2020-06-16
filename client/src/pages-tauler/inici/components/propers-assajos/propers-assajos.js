import { Card, Space, Spin, Typography } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { joinComponents } from "../../../../helpers";
import { CalendarAvatar } from "../../../../standalone/calendar-avatar";
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
          <Link to={`/assajos/${properAssaig.id_assaig}`}>
            <Card
              hoverable
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
                    {timeRange(
                      properAssaig.hora_inici && properAssaig.data_inici,
                      properAssaig.hora_final && properAssaig.data_final
                    )}
                  </Typography.Text>
                </Space>
              }
            >
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
            </Card>
          </Link>
        </div>
      </Spin>
    </div>
  );
};
