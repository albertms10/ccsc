import { PlusOutlined } from "@ant-design/icons";
import { List, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalList } from "../../../../components/modal-list";
import { usePostAPI } from "../../../../helpers";
import { fetchMoviments } from "../../../../redux/moviments/moviments-actions";
import { timeDuration } from "../../../../utils";
import { AssaigContext } from "../../detall-assaig";
import "./modal-list-moviments-assaig.css";

export default ({ getMovimentsAssaig }) => {
  const dispatch = useDispatch();
  const { moviments, fetched } = useSelector(({ moviments }) => moviments);

  const { id_assaig } = useContext(AssaigContext);

  const [loadingPostMoviment, postMoviment] = usePostAPI(
    `/api/assajos/${id_assaig}/moviments`
  );

  useEffect(() => {
    if (!fetched) dispatch(fetchMoviments());
  }, [fetched, dispatch]);

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
        <>
          {moviment.ordre === 1 && (
            <div className="list-item-header">{moviment.titol_obra}</div>
          )}
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
              description={
                moviment.durada ? timeDuration(moviment.durada) : "Sense durada"
              }
            />
          </List.Item>
        </>
      )}
    />
  );
};
