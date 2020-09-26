import { Avatar, Space } from "antd";
import { useSocis } from "pages/tauler/socis/hooks";
import React, { useCallback } from "react";
import {
  SearchComplete,
  SearchCompleteBaseProps,
} from "standalone/search-complete";
import { searchFilter } from "utils/misc";
import { initials } from "utils/strings";

type SearchCompleteSocisProps = SearchCompleteBaseProps;

const SearchCompleteSocis: React.FC<SearchCompleteSocisProps> = ({
  onSelect,
}) => {
  const [socis, loading] = useSocis();

  const filter = useCallback(
    (value, option) =>
      searchFilter(value, {
        texts: [option.nom_complet],
      }),
    []
  );

  const optionRenderObject = useCallback(
    (persona) => ({
      key: persona.id_persona,
      value: persona.id_persona.toString(),
      date: persona.naixement,
      label: (
        <Space>
          <Avatar>{initials(persona.nom_complet)}</Avatar>
          {persona.nom_complet}
        </Space>
      ),
    }),
    []
  );

  return (
    <SearchComplete
      data={socis}
      onSelect={onSelect}
      filter={filter}
      loading={loading}
      optionRenderObject={optionRenderObject}
    />
  );
};

export default SearchCompleteSocis;
