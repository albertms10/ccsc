import { Card, Carousel, Space, Spin, Typography } from "antd";
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
  const [propersAssajos, loadingPropersAssajos] = usePropersAssajos();

  return (
    <div style={{ margin: "0 -1rem" }}>
      <Spin spinning={loadingPropersAssajos}>
        <Carousel style={style}>
          {propersAssajos.map((assaig) => (
            <div key={assaig.id_assaig} className="propers-assajos-wrapper">
              <Link to={`/assajos/${assaig.id_assaig}`}>
                <Card
                  title={
                    <Space>
                      <CalendarAvatar moment={moment(assaig.data_inici)} />
                      {assaig.titol}
                      <StatusIcon
                        tooltip={assaig.estat_esdeveniment}
                        statusId={assaig.id_estat_esdeveniment}
                      />
                      <Typography.Text
                        type="secondary"
                        style={{ fontWeight: "normal" }}
                      >
                        {timeRange(
                          assaig.hora_inici && assaig.data_inici,
                          assaig.hora_final && assaig.data_final
                        )}
                      </Typography.Text>
                    </Space>
                  }
                  hoverable
                >
                  {joinComponents(
                    dateRange(
                      assaig.dia_inici,
                      assaig.hora_inici,
                      assaig.dia_final,
                      assaig.hora_final
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
          ))}
        </Carousel>
      </Spin>
    </div>
  );
};
