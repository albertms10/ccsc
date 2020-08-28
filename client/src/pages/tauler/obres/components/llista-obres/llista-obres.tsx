import { Input, List, Space } from "antd";
import { IconFormacio } from "assets/icons";
import { Authorized } from "components/authorized";
import { FormacionsListContext } from "components/tauler-app/contexts/formacions-context";
import { useDeleteAPI } from "helpers";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DropdownBorderlessButton } from "standalone/dropdown-borderless-button";
import { fetchObres } from "store/obres/thunks";
import { searchFilter } from "utils";
import { useObres } from "./hooks";

const { Item } = List;
const { Search } = Input;

const LlistaObres: React.FC = () => {
  const { t } = useTranslation("actions");

  const dispatch = useDispatch();

  const formacions = useContext(FormacionsListContext);

  const [searchValue, setSearchValue] = useState("");

  const [obres, loading] = useObres();

  const [loadingDelete, showDeleteConfirm] = useDeleteAPI(
    "/obres",
    "l’obra",
    () => dispatch(fetchObres())
  );

  return (
    <div className="llista-obres">
      <Search
        placeholder={t("search works")}
        size="large"
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
        allowClear
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <List
        loading={loading || loadingDelete}
        dataSource={
          searchValue.length > 0
            ? obres.filter((obra) =>
                searchFilter(searchValue, {
                  texts: [obra.titol],
                })
              )
            : obres
        }
        renderItem={(obra) => (
          <Item
            key={obra.id_obra}
            actions={[
              ...(formacions.length > 1 &&
              obra.formacions &&
              obra.formacions.length > 0
                ? [
                    <Space key="formacions">
                      {obra.formacions.map((formacio) => (
                        <IconFormacio
                          key={formacio.id_formacio}
                          name={formacio.nom_curt}
                        />
                      ))}
                    </Space>,
                  ]
                : []),
              <Authorized key="more_options">
                <DropdownBorderlessButton
                  items={[
                    {
                      key: t("common:delete"),
                      action: t("common:delete"),
                      danger: true,
                      onClick: () => showDeleteConfirm(obra.id_obra),
                    },
                  ]}
                />
              </Authorized>,
            ]}
          >
            <Link to={`/obres/${obra.id_obra}`}>
              <Item.Meta title={obra.titol} description={obra.subtitol} />
            </Link>
          </Item>
        )}
      />
    </div>
  );
};

export default LlistaObres;
