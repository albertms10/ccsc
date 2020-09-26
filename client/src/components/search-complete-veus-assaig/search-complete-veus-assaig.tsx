import { useAPI } from "helpers";
import { Veu } from "model";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  SearchComplete,
  SearchCompleteBaseProps,
} from "standalone/search-complete";
import { searchFilter } from "utils/misc";

interface SearchCompleteVeusAssaigProps extends SearchCompleteBaseProps {
  idAssaig: number;
}

const SearchCompleteVeusAssaig: React.FC<SearchCompleteVeusAssaigProps> = ({
  idAssaig,
  onSelect,
}) => {
  const { t } = useTranslation("actions");

  const [veus, loadingVeus, getVeus] = useAPI<Veu[]>(
    `/assajos/${idAssaig}/veus`,
    []
  );

  const filter = useCallback(
    (value, veu) =>
      searchFilter(value, {
        texts: [veu.nom, veu.abreviatura],
      }),
    []
  );

  const optionRenderObject = useCallback(
    (veu) => ({
      key: veu.id_veu,
      value: veu.id_veu.toString(),
      label: veu.nom,
    }),
    []
  );

  return (
    <SearchComplete
      data={veus}
      onSelect={(value, option) =>
        onSelect(value, option).then(() => getVeus())
      }
      filter={filter}
      placeholder={t("add announced voices")}
      loading={loadingVeus}
      optionRenderObject={optionRenderObject}
    />
  );
};

export default SearchCompleteVeusAssaig;
