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
          <Item label="DNI">{soci.dni}</Item>
          <Item label="Naixement">{moment(soci.naixement).format("LL")}</Item>
        </Descriptions>
      </InfoCard>
      <InfoCard title="Dades de contacte">
        <Descriptions size={descriptionsSize} layout="vertical">
          <Item label="Adreça electrònica">
            <Typography.Paragraph className="action-text" copyable>
              <a href={`mailto:${soci.email}`}>{soci.email}</a>
            </Typography.Paragraph>
          </Item>
          {soci.telefon ? <Item label="Telèfon">{soci.telefon}</Item> : ""}
        </Descriptions>
      </InfoCard>
    </Space>
  );
};
