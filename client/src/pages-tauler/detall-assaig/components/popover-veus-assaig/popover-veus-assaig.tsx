import { FilterFilled } from "@ant-design/icons";
import { Space } from "antd";
import { Veu } from "model";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { PopoverList } from "../../../../components/popover-list";
import { useAPI } from "../../../../helpers";
import { searchFilterVeus } from "../../../../helpers/search-filters";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { AssaigContext } from "../../detall-assaig";
import { useVeuAssaig } from "./hooks";

interface PopoverVeusAssaigProps {
  getConvocatsAssaig: () => void;
}

const PopoverVeusAssaig: React.FC<PopoverVeusAssaigProps> = ({
  getConvocatsAssaig,
}) => {
  const { t } = useTranslation("actions");

  const { id_assaig } = useContext(AssaigContext);

  const [veus, loadingVeus, getVeus] = useAPI<Veu[]>(
    `/assajos/${id_assaig}/veus`,
    []
  );
  const [loadingVeu, changeVeuAssaig] = useVeuAssaig(id_assaig);

  const getVeusText = useCallback(() => {
    const convocades = veus.filter((veu) => veu.convocada);

    return convocades.length > 0 && convocades.length < veus.length
      ? convocades.length >= veus.length - 2
        ? t("common:except value", {
            value: veus
              .filter((veu) => !convocades.includes(veu))
              .map((veu) => veu.abreviatura)
              .join(""),
          })
        : convocades.map((veu) => veu.abreviatura).join("")
      : t("dashboard:all voices");
  }, [veus, t]);

  return (
    <PopoverList
      title={t("dashboard:specific voices")}
      searchPlaceholder={t("search voices")}
      defaultValue={veus
        .filter((veu) => veu.convocada)
        .map((veu) => veu.id_veu)}
      placement="bottomLeft"
      dataSource={veus.map((veu) => ({
        ...veu,
        value: veu.id_veu,
        label: veu.nom,
      }))}
      searchFilters={searchFilterVeus}
      loading={loadingVeus || loadingVeu}
      onChange={({ target }) => {
        changeVeuAssaig({
          id_veu: target.value,
          convocada: target.checked,
        }).then(() => {
          getConvocatsAssaig();
          getVeus();
        });
      }}
      action={
        <BorderlessButton icon={<FilterFilled />}>
          {getVeusText()}
        </BorderlessButton>
      }
      elseElement={
        <Space style={{ marginLeft: "1rem" }}>
          <FilterFilled />
          {getVeusText()}
        </Space>
      }
      needsAuthorization
    />
  );
};

export default PopoverVeusAssaig;
