import { Input, List, Space, Typography } from "antd";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IconFormacio } from "../../../../assets/icons";
import { Authorized } from "../../../../components/authorized";
import { FormacionsListContext } from "../../../../components/tauler-app/contexts/formacions-context";
import { DropdownBorderlessButton } from "../../../../standalone/dropdown-borderless-button";
import { eventSearchFilter } from "../../../../utils";
import { useEliminarObra, useObres } from "./hooks";

const { Item } = List;
const { Text } = Typography;
const { Search } = Input;

export default () => {
  const formacions = useContext(FormacionsListContext);

  const [searchValue, setSearchValue] = useState("");

  const [obres, loading] = useObres();
  const [showDeleteConfirm] = useEliminarObra();

  return (
    <div className="llista-obres">
      <Search
        placeholder="Cerca obres"
        size="large"
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value.toLowerCase())}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <List
        loading={loading}
        dataSource={
          searchValue.length > 0
            ? obres.filter((obra) =>
                eventSearchFilter(searchValue, {
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
                      action: <Text type="danger">Eliminar</Text>,
                      onClick: () => showDeleteConfirm(obra.id_obra),
                    },
                  ]}
                />
              </Authorized>,
            ]}
          >
            <Link to={`/obres/${obra.id_obra}`}>
              <Item.Meta title={obra.titol} />
            </Link>
          </Item>
        )}
      />
    </div>
  );
};
