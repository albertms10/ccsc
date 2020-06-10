import { Descriptions, Space, Typography } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import { SiderBrokenContext } from "../../../../components/tauler-app/contexts/sider-context";
import { InfoCard } from "../../../../standalone/info-card";
import { SociContext } from "../../perfil-soci";

const { Item } = Descriptions;

export default () => {
  const soci = useContext(SociContext);
  const broken = useContext(SiderBrokenContext);

  const descriptionsSize = broken ? "small" : "middle";

  return (
    <Space size="middle" direction="vertical" style={{ marginTop: ".5rem" }}>
      <InfoCard title="Dades personals">
        <Descriptions size={descriptionsSize} layout="vertical">
          <Item label="DNI">
            <Typography.Paragraph className="action-text" copyable>
              {soci.dni}
            </Typography.Paragraph>
          </Item>
          <Item label="Naixement">
            <Typography.Paragraph className="action-text" copyable>
              {moment(soci.naixement).format("LL")}
            </Typography.Paragraph>
          </Item>
        </Descriptions>
      </InfoCard>
      <InfoCard title="Dades de contacte">
        <Descriptions size={descriptionsSize} layout="vertical">
          {soci.telefon && (
            <Item label="Telèfon">
              <Typography.Paragraph className="action-text" copyable>
                {soci.telefon}
              </Typography.Paragraph>
            </Item>
          )}
          <Item label="Adreça electrònica">
            <Typography.Paragraph className="action-text" copyable>
              {soci.email}
            </Typography.Paragraph>
          </Item>
        </Descriptions>
      </InfoCard>
    </Space>
  );
};
