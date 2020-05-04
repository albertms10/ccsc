import React from "react";
import { Descriptions } from "antd";
import moment from "moment";

import "./soci-tab-general.css";

const { Item } = Descriptions;

export default ({ soci }) => (
  <div className="soci-tab-general">
    <Descriptions title="Dades personals">
      <Item label="Telèfon">{soci.telefon}</Item>
      <Item label="Adreça electrònica">{soci.email}</Item>
    </Descriptions>
    <Descriptions title="Dades de contacte">
      <Item label="DNI">{soci.dni}</Item>
      <Item label="Naixement">{moment(soci.naixement).format("LL")}</Item>
    </Descriptions>
  </div>
);
