import { PlusOutlined } from "@ant-design/icons";
import { List, Typography } from "antd";
import React, { useContext } from "react";
import { ModalList } from "../../../../components/modal-list";
import { useAPI, usePostAPI } from "../../../../helpers";
import { AssaigContext } from "../../detall-assaig";

export default ({ getMovimentsAssaig }) => {
  const { id_assaig } = useContext(AssaigContext);
  const [moviments] = useAPI("/api/obres/moviments");
  const [loadingPostMoviment, postMoviment] = usePostAPI(
    `/api/assajos/${id_assaig}/moviments`
  );

  return (
    <ModalList
      title="Afegeix un moviment"
      buttonIcon={<PlusOutlined />}
      dataSource={moviments}
      searchPlaceholder="Cerca moviments"
      loading={loadingPostMoviment}
      searchFilters={(moviment) => ({
        texts: [
          moviment.titol_obra,
          moviment.titol_moviment,
          moviment.subtitol,
          moviment.num_cataleg,
        ],
      })}
      renderItem={(moviment, setVisible) => (
        <List.Item
          onClick={() => {
            postMoviment({
              id_moviment: moviment.id_moviment,
            }).then(() => {
              getMovimentsAssaig();
              setVisible(false);
            });
          }}
        >
          <List.Item.Meta
            avatar={
              <Typography.Text type="secondary">
                {moviment.ordre}
              </Typography.Text>
            }
            title={moviment.titol_moviment}
            description={moviment.titol_obra}
          />
        </List.Item>
      )}
    />
  );
};
