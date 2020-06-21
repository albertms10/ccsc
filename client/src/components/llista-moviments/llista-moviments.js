import { Input, List } from "antd";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { searchFilterMoviment } from "../../helpers/search-filters";
import DropdownBorderlessButton from "../../standalone/dropdown-borderless-button/dropdown-borderless-button";
import { eventSearchFilter, timeDuration } from "../../utils";
import Authorized from "../authorized/authorized";
import FixedTagsProjectes from "../fixed-tags-projectes/fixed-tags-projectes";
import { useMoviments } from "./hooks";

const { Search } = Input;
const { Item } = List;

const LlistaMoviments = ({ idProjecte }) => {
  const [searchValue, setSearchValue] = useState("");

  const [moviments, loading] = useMoviments();
  // const [showDeleteConfirm] = useEliminarMoviment();

  const getDataSource = useCallback(() => {
    let filteredMoviments;
    if (idProjecte)
      filteredMoviments = moviments.filter((moviment) =>
        moviment.projectes.find(
          (projecte) => projecte.id_projecte === parseInt(idProjecte)
        )
      );

    return searchValue.length > 0
      ? filteredMoviments.filter((moviment) =>
          eventSearchFilter(searchValue, searchFilterMoviment(moviment))
        )
      : filteredMoviments;
  }, [moviments, idProjecte, searchValue]);

  return (
    <div className="llista-moviments">
      <Search
        placeholder="Cerca moviments"
        size="large"
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
        allowClear
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <List
        dataSource={getDataSource()}
        loading={loading}
        renderItem={(moviment) => (
          <Item
            key={moviment.id_moviment}
            actions={[
              ...(moviment.projectes && moviment.projectes.length > 0
                ? [<FixedTagsProjectes projectes={moviment.projectes} />]
                : []),
              <Authorized>
                <DropdownBorderlessButton
                  items={[
                    {
                      key: "eliminar",
                      action: "Eliminar",
                      danger: true,
                    },
                  ]}
                />
              </Authorized>,
            ]}
          >
            <Link
              to={`/obres/${moviment.id_obra}/moviments/${moviment.id_moviment}`}
            >
              <List.Item.Meta
                title={moviment.titol}
                avatar={moviment.ordre}
                description={timeDuration(moviment.durada)}
              />
            </Link>
          </Item>
        )}
      />
    </div>
  );
};

LlistaMoviments.propTypes = {
  idProjecte: PropTypes.any,
};

export default LlistaMoviments;
