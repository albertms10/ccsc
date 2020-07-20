import { Input, List } from "antd";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteAPI } from "../../helpers";
import { searchFilterMoviment } from "../../helpers/search-filters";
import { fetchMoviments } from "../../store/moviments/thunks";
import { DropdownBorderlessButton } from "../../standalone/dropdown-borderless-button";
import { searchFilter } from "../../utils";
import { Authorized } from "../authorized";
import { FixedTagsProjectes } from "../fixed-tags-projectes";
import { useMoviments } from "./hooks";

const { Search } = Input;
const { Item } = List;

const LlistaMoviments = ({ idProjecte }) => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");

  const [moviments, loading] = useMoviments();
  const [
    loadingDeleteMoviment,
    showDeleteConfirm,
  ] = useDeleteAPI(`/projectes/${idProjecte}/moviments`, "el moviment", () =>
    dispatch(fetchMoviments())
  );

  const getDataSource = useCallback(() => {
    let filteredMoviments;
    if (idProjecte)
      filteredMoviments = moviments.filter(
        (moviment) =>
          moviment.projectes &&
          moviment.projectes.find(
            (projecte) => projecte.id_projecte === parseInt(idProjecte)
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
        placeholder="Cerca repertori"
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
                ? [<FixedTagsProjectes projectes={moviment.projectes} />]
                : []),
              <Authorized>
                <DropdownBorderlessButton
                  items={[
                    {
                      key: "eliminar",
                      action: "Eliminar",
                      danger: true,
                      onClick: () => showDeleteConfirm(moviment.id_moviment),
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
                title={moviment.titol_moviment}
                avatar={moviment.ordre}
                description={moviment.titol_obra}
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
