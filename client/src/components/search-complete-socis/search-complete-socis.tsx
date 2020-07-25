import { Avatar, Space } from "antd";
import React from "react";
import { useSocis } from "../../pages-tauler/socis/hooks";
import { SearchComplete } from "../../standalone/search-complete";
import { SearchCompleteBaseProps } from "../../standalone/search-complete/search-complete";
import { initials, searchFilter } from "../../utils";

interface SearchCompleteSocisProps extends SearchCompleteBaseProps {}

const SearchCompleteSocis: React.FC<SearchCompleteSocisProps> = ({
  onSelect,
}) => {
  const [socis, loading] = useSocis();

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