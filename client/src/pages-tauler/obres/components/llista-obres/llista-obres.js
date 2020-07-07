import { Input, List, Space } from "antd";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IconFormacio } from "../../../../assets/icons";
import { Authorized } from "../../../../components/authorized";
import { FormacionsListContext } from "../../../../components/tauler-app/contexts/formacions-context";
import { useDeleteAPI } from "../../../../helpers";
import { fetchObres } from "../../../../redux/obres/obres-actions";
import { DropdownBorderlessButton } from "../../../../standalone/dropdown-borderless-button";
import { searchFilter } from "../../../../utils";
import { useObres } from "./hooks";

const { Item } = List;
const { Search } = Input;

export default () => {
  const dispatch = useDispatch();
  const formacions = useContext(FormacionsListContext);

  const [searchValue, setSearchValue] = useState("");

  const [obres, loading] = useObres();
  const [loadingDelete, showDeleteConfirm] = useDeleteAPI(
    `/obres`,
    "l’obra",
    () => dispatch(fetchObres())
  );

  return (
    <div className="llista-obres">
      <Search
        placeholder="Cerca obres"
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
            key={obres.id_obra}
            actions={[
              ...(formacions.length > 1 &&
              obra.formacions &&
              obra.formacions.length > 0
                ? [
                    <Space>
                      {obra.formacions.map((formacio) => (
                        <IconFormacio
                          key={formacio.id_formacio}
                          name={formacio.nom_curt}
                        />
                      ))}
                    </Space>,
                  ]
                : []),
              <Authorized>
                <DropdownBorderlessButton
                  items={[
                    {
                      key: "eliminar",
                      action: "Eliminar",
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
