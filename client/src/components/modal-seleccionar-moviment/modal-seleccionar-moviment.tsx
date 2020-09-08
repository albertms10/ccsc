import { List, Typography } from "antd";
import { FixedTagsProjectes } from "components/fixed-tags-projectes";
import { useMoviments } from "components/llista-moviments/hooks";
import { ModalButtonBaseProps } from "components/modal-button";
import { ModalList } from "components/modal-list";
import { SearchListBaseProps } from "components/search-list";
import { searchFilterMoviment } from "helpers/search-filters";
import { Moviment } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { timeDuration } from "utils/datetime";
import { mapFirstOfProperty } from "utils/lists";

interface ModalSeleccionarMovimentProps
  extends ModalButtonBaseProps,
    SearchListBaseProps {
  dataFilter: (value: Moviment, index: number, array: Moviment[]) => boolean;
  onItemClick: (item: Moviment) => Promise<void | Response>;
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
                ? [
                    <FixedTagsProjectes
                      key="fixed-tags-projectes"
                      projectes={moviment.projectes}
                      noLink
                    />,
                  ]
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
              description={timeDuration(moviment.durada, {
                defaultText: t("common:no duration"),
              })}
            />
          </List.Item>
        </>
      )}
      {...rest}
    />
  );
};

export default ModalSeleccionarMoviment;
