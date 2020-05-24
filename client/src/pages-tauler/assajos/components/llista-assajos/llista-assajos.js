import { List } from "antd";
import moment from "moment";
import React from "react";
import { useAssajosSoci } from "./hooks";

const { Item } = List;

export default () => {
  const [assajos, loading] = useAssajosSoci();

  return (
    <List
      dataSource={assajos}
      loading={loading}
      renderItem={(assaig) => (
        <Item key={assaig.id_assaig}>
          <Item.Meta
            title={`Assaig${assaig.es_general ? " general" : ""}${
              assaig.es_extra ? " extra" : ""
            }`}
            description={moment(assaig.data_inici).format("LLL")}
          />
        </Item>
      )}
    />
  );
};
