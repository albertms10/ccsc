import { Avatar, Space } from "antd";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSocis } from "../../store/socis/thunks";
import { SearchComplete } from "../../standalone/search-complete";
import { initials, searchFilter } from "../../utils";

const SearchCompleteSocis = ({ onSelect }) => {
  const dispatch = useDispatch();
  const { socis, fetched, loading } = useSelector(({ socis }) => socis);

  useEffect(() => {
    if (!fetched) dispatch(fetchSocis());
  }, [fetched, dispatch]);

  return (
    <SearchComplete
      data={socis}
      onSelect={onSelect}
      filter={(value, option) =>
        searchFilter(value, {
          texts: [option.nom_complet],
        })
      }
      loading={loading}
      optionRenderObject={(persona) => ({
        key: persona.id_persona,
        value: persona.id_persona.toString(),
        date: persona.naixement,
        label: (
          <Space>
            <Avatar>{initials(persona.nom_complet)}</Avatar>
            {persona.nom_complet}
          </Space>
        ),
      })}
    />
  );
};

SearchCompleteSocis.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default SearchCompleteSocis;
