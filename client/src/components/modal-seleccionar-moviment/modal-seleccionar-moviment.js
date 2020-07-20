import { List, Typography } from "antd";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchFilterMoviment } from "../../helpers/search-filters";
import { fetchMoviments } from "../../store/moviments/thunks";
import { mapFirstOfProperty, timeDuration } from "../../utils";
import FixedTagsProjectes from "../fixed-tags-projectes/fixed-tags-projectes";
import ModalList from "../modal-list/modal-list";

const ModalSeleccionarMoviment = ({
  dataFilter,
  onItemClick,
  thenAction,
  ...rest
}) => {
  const dispatch = useDispatch();
  const { moviments, fetched } = useSelector(({ moviments }) => moviments);

  useEffect(() => {
    if (!fetched) dispatch(fetchMoviments());
  }, [fetched, dispatch]);

  return (
    <ModalList
      title="Selecciona un moviment"
      dataSource={dataFilter ? moviments.filter(dataFilter) : moviments}
      mapData={(data) => mapFirstOfProperty(data, "id_obra")}
      searchPlaceholder="Cerca moviments"
      searchFilters={searchFilterMoviment}
      renderItem={(moviment, setVisible) => (
        <>
          {moviment.first && (
            <div className="list-item-header">{moviment.titol_obra}</div>
          )}
          <List.Item
            onClick={() => {
              onItemClick({
                id_moviment: moviment.id_moviment,
              }).then(() => {
                if (typeof thenAction === "function") thenAction();
                setVisible(false);
              });
            }}
            actions={[
              ...(moviment.projectes && moviment.projectes.length > 0
                ? [<FixedTagsProjectes projectes={moviment.projectes} />]
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
              description={timeDuration(moviment.durada)}
            />
          </List.Item>
        </>
      )}
      {...rest}
    />
  );
};

ModalSeleccionarMoviment.propTypes = {
  loading: PropTypes.bool,
  dataFilter: PropTypes.func,
  onItemClick: PropTypes.func.isRequired,
};

export default ModalSeleccionarMoviment;
