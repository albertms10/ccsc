import PropTypes from "prop-types";
import React from "react";
import { useVeus } from "../../pages-tauler/detall-assaig/components/popover-veus-assaig/hooks";
import { SearchComplete } from "../../standalone/search-complete";
import { searchFilter } from "../../utils";

const SearchCompleteVeusAssaig = ({ idAssaig, onSelect }) => {
  const [veus, loadingVeus, getVeus] = useVeus(idAssaig);

  return (
    <SearchComplete
      data={veus}
      onSelect={(value, option) => {
        onSelect(value, option).then(() => getVeus());
      }}
      filter={(value, veu) =>
        searchFilter(value, {
          texts: [veu.nom, veu.abreviatura],
        })
      }
      placeholder="Afegeix veus convocades"
      loading={loadingVeus}
      optionRenderObject={(veu) => ({
        key: veu.id_veu,
        value: veu.id_veu.toString(),
        label: veu.nom,
      })}
    />
  );
};

SearchCompleteVeusAssaig.propTypes = {
  idAssaig: PropTypes.any,
  onSelect: PropTypes.func.isRequired,
};

export default SearchCompleteVeusAssaig;
