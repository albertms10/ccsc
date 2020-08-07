import { List, Typography } from "antd";
import { Moviment } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { searchFilterMoviment } from "../../helpers/search-filters";
import { mapFirstOfProperty, timeDuration } from "../../utils";
import { FixedTagsProjectes } from "../fixed-tags-projectes";
import { useMoviments } from "../llista-moviments/hooks";
import { ModalButtonBaseProps } from "../modal-button/modal-button";
import { ModalList } from "../modal-list";
import { SearchListBaseProps } from "../search-list/search-list";

interface ModalSeleccionarMovimentProps
  extends ModalButtonBaseProps,
    SearchListBaseProps {
  dataFilter: (value: Moviment, index: number, array: Moviment[]) => boolean;
  onItemClick: (item: Moviment) => Promise<any>;
  thenAction?: () => void;
}

const ModalSeleccionarMoviment: React.FC<ModalSeleccionarMovimentProps> = ({
  dataFilter,
  onItemClick,
  thenAction,
  ...rest
}) => {
  const { t } = useTranslation("actions");

  const [moviments, loading] = useMoviments();

  return (
    <ModalList<Moviment>
      title={t("select movement")}
      dataSource={dataFilter ? moviments.filter(dataFilter) : moviments}
      mapData={(data) => mapFirstOfProperty(data, "id_obra", "primer")}
      searchPlaceholder={t("search movements")}
      loading={loading}
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
                ? [<FixedTagsProjectes projectes={moviment.projectes} noLink />]
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
