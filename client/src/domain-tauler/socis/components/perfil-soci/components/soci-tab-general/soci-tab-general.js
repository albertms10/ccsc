import React, { useContext } from "react";
import { Descriptions } from "antd";
import moment from "moment";
import { SociContext } from "../../perfil-soci";

const { Item } = Descriptions;

export default () => {
  const soci = useContext(SociContext);

  return (
    <>
      <Descriptions title="Dades personals">
        <Item label="Adreça electrònica">{soci.email}</Item>
        {soci.telefon ? <Item label="Telèfon">{soci.telefon}</Item> : ""}
      </Descriptions>
      <Descriptions title="Dades de contacte">
        <Item label="DNI">{soci.dni}</Item>
        <Item label="Naixement">{moment(soci.naixement).format("LL")}</Item>
      </Descriptions>
    </>
  );
};
