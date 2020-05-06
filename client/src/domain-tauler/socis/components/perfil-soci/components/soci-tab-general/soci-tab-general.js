import React, { useContext } from "react";
import { Descriptions, Space } from "antd";
import moment from "moment";
import { SociContext } from "../../perfil-soci";
import { SubHeader } from "../../../../../../standalone/sub-header";

const { Item } = Descriptions;

export default () => {
  const soci = useContext(SociContext);

  return (
    <Space size="middle" direction="vertical">
      <SubHeader title="Dades personals" />
      <Descriptions size="middle" bordered>
        <Item label="DNI" span={3}>
          {soci.dni}
        </Item>
        <Item label="Naixement">{moment(soci.naixement).format("LL")}</Item>
      </Descriptions>
      <SubHeader title="Dades de contacte" />
      <Descriptions size="middle" bordered>
        <Item label="Adreça electrònica">
          <a href={`mailto:${soci.email}`}>{soci.email}</a>
        </Item>
        {soci.telefon ? <Item label="Telèfon">{soci.telefon}</Item> : ""}
      </Descriptions>
    </Space>
  );
};
