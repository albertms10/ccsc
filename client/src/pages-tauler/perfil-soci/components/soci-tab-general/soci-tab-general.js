import { Descriptions, Space } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import { SiderBrokenContext } from "../../../../components/tauler-app/contexts/sider-context";
import { SubHeader } from "../../../../standalone/sub-header";
import { SociContext } from "../../perfil-soci";

const { Item } = Descriptions;

export default () => {
  const soci = useContext(SociContext);
  const broken = useContext(SiderBrokenContext);

  const descriptionsSize = broken ? "small" : "middle";

  return (
    <Space size="middle" direction="vertical" style={{ marginTop: ".5rem" }}>
      <SubHeader title="Dades personals" />
      <Descriptions size={descriptionsSize} layout="vertical">
        <Item label="DNI">{soci.dni}</Item>
        <Item label="Naixement">{moment(soci.naixement).format("LL")}</Item>
      </Descriptions>
      <SubHeader title="Dades de contacte" />
      <Descriptions size={descriptionsSize} layout="vertical">
        <Item label="Adreça electrònica">
          <a href={`mailto:${soci.email}`}>{soci.email}</a>
        </Item>
        {soci.telefon ? <Item label="Telèfon">{soci.telefon}</Item> : ""}
      </Descriptions>
    </Space>
  );
};