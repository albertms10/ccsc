import { List, Typography } from "antd";
import { Moviment } from "model";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchFilterMoviment } from "../../helpers/search-filters";
import { fetchMoviments } from "../../store/moviments/thunks";
import { RootState } from "../../store/types";
import { mapFirstOfProperty, timeDuration } from "../../utils";
import FixedTagsProjectes from "../fixed-tags-projectes/fixed-tags-projectes";
import ModalList from "../modal-list/modal-list";

interface ModalSeleccionarMovimentProps {
  dataFilter: (value: Moviment, index: number, array: Moviment[]) => Moviment;
  onItemClick: (item: Moviment) => Promise<any>;
  thenAction?: Function;
}

const ModalSeleccionarMoviment: React.FC<ModalSeleccionarMovimentProps> = ({
  dataFilter,
  onItemClick,
  thenAction,
  ...rest
}) => {
  const dispatch = useDispatch();
  const { moviments, fetched } = useSelector(
    ({ moviments }: RootState) => moviments
  );

  useEffect(() => {
    if (!fetched) dispatch(fetchMoviments());
  }, [fetched, dispatch]);

  return (
    <ModalList<Moviment>
      title="Selecciona un moviment"
      dataSource={dataFilter ? moviments.filter(dataFilter) : moviments}
      mapData={(data) => mapFirstOfProperty(data, "id_obra", "primer")}
      searchPlaceholder="Cerca moviments"
      searchFilters={searchFilterMoviment}
      renderItem={(moviment, index, setVisible) => (
        <>
          {moviment.primer && (
            <div className="list-item-header">{moviment.titol_obra}</div>
          )}
          <List.Item
            onClick={() => {
              onItemClick(moviment).then(() => {
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

export default ModalSeleccionarMoviment;
