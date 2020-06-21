import { PlusOutlined } from "@ant-design/icons";
import { List, Typography } from "antd";
import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedTagsProjectes } from "../../../../components/fixed-tags-projectes";
import { ModalList } from "../../../../components/modal-list";
import { usePostAPI } from "../../../../helpers";
import { fetchMoviments } from "../../../../redux/moviments/moviments-actions";
import { mapFirstOfProperty, timeDuration } from "../../../../utils";
import { AssaigContext } from "../../detall-assaig";

const ModalListMovimentsAssaig = ({ movimentsAssaig, getMovimentsAssaig }) => {
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
      dataSource={mapFirstOfProperty(
        moviments.filter(
          (moviment) =>
            !movimentsAssaig
              .map((moviment) => moviment.id_moviment)
              .includes(moviment.id_moviment)
        ),
        "id_obra"
      )}
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
          {moviment.first && (
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
            actions={[
              ...(moviment.projectes.length > 0
                ? [<FixedTagsProjectes projectes={moviments.projectes} />]
                : []),
            ]}
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

ModalListMovimentsAssaig.propTypes = {
  movimentsAssaig: PropTypes.array,
  getMovimentsAssaig: PropTypes.func,
};

export default ModalListMovimentsAssaig;
