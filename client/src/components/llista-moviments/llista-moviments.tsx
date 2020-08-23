import { Input, List } from "antd";
import { Authorized } from "components/authorized";
import { FixedTagsProjectes } from "components/fixed-tags-projectes";
import { useDeleteAPI } from "helpers";
import { searchFilterMoviment } from "helpers/search-filters";
import { Moviment } from "model";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownBorderlessButton } from "standalone/dropdown-borderless-button";
import { fetchMoviments } from "store/moviments/thunks";
import { linkText, searchFilter } from "utils";
import { useMoviments } from "./hooks";

const { Search } = Input;
const { Item } = List;

interface LlistaMovimentsProps {
  idProjecte: number;
}

const LlistaMoviments: React.FC<LlistaMovimentsProps> = ({ idProjecte }) => {
  const { t } = useTranslation(["dashboard", "modals"]);

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");

  const [moviments, loading] = useMoviments();

  const [
    loadingDeleteMoviment,
    showDeleteConfirm,
  ] = useDeleteAPI(
    `/projectes/${idProjecte}/moviments`,
    t("the movement"),
    () => dispatch(fetchMoviments())
  );

  const getDataSource = useCallback(() => {
    let filteredMoviments: Moviment[] = [];
    if (idProjecte)
      filteredMoviments = moviments.filter(
        (moviment) =>
          moviment.projectes &&
          moviment.projectes.find(
            (projecte) => projecte.id_projecte === idProjecte
          )
      );

    return searchValue.length > 0
      ? filteredMoviments.filter((moviment) =>
          searchFilter(searchValue, searchFilterMoviment(moviment))
        )
      : filteredMoviments;
  }, [moviments, idProjecte, searchValue]);

  return (
    <div className="llista-moviments">
      <Search
        placeholder={t("actions:search repertoire")}
        size="large"
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
        allowClear
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <List
        dataSource={getDataSource()}
        loading={loading || loadingDeleteMoviment}
        renderItem={(moviment) => (
          <Item
            key={moviment.id_moviment}
            actions={[
              ...(moviment.projectes && moviment.projectes.length > 0
                ? [
                    <FixedTagsProjectes
                      key="fixed-tags-projectes"
                      projectes={moviment.projectes}
                    />,
                  ]
                : []),
              <Authorized key="more_options">
                <DropdownBorderlessButton
                  items={[
                    {
                      key: linkText(t("common:delete")),
                      action: t("common:delete"),
                      danger: true,
                      onClick: () => showDeleteConfirm(moviment.id_moviment),
                    },
                  ]}
                />
              </Authorized>,
            ]}
          >
            <Link
              to={`/${linkText(t("works"))}/${moviment.id_obra}/${linkText(
                t("movements")
              )}/${moviment.id_moviment}`}
            >
              <List.Item.Meta
                avatar={moviment.ordre}
                title={moviment.titol_moviment}
                description={moviment.titol_obra}
              />
            </Link>
          </Item>
        )}
      />
    </div>
  );
};

export default LlistaMoviments;
