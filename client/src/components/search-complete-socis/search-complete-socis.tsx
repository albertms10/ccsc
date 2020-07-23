import { Avatar, Space } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchComplete } from "../../standalone/search-complete";
import { SearchCompleteBaseProps } from "../../standalone/search-complete/search-complete";
import { fetchSocis } from "../../store/socis/thunks";
import { RootState } from "../../store/types";
import { initials, searchFilter } from "../../utils";

interface SearchCompleteSocisProps extends SearchCompleteBaseProps {}

const SearchCompleteSocis: React.FC<SearchCompleteSocisProps> = ({
  onSelect,
}) => {
  const dispatch = useDispatch();
  const { socis, fetched, loading } = useSelector(
    ({ socis }: RootState) => socis
  );

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

export default SearchCompleteSocis;
