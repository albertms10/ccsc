import { Projecte } from "model";
import React, { useCallback, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FixedTagsProjectes } from "../../../../components/fixed-tags-projectes";
import { PopoverList } from "../../../../components/popover-list";
import { useAPI } from "../../../../helpers";
import { searchFilterProjecte } from "../../../../helpers/search-filters";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { AssaigContext } from "../../detall-assaig";
import { useProjecteAssaig } from "./hooks";

interface PopoverProjectesAssaigProps {
  getMovimentsAssaig: Function;
}

const PopoverProjectesAssaig: React.FC<PopoverProjectesAssaigProps> = ({
  getMovimentsAssaig,
}) => {
  const { t } = useTranslation("actions");

  const { id_assaig } = useContext(AssaigContext);

  const [projectes, loadingProjectes, getProjectes] = useAPI<Projecte[]>(
    `/assajos/${id_assaig}/projectes`,
    []
  );
  const [loadingProjecte, changeProjecteAssaig] = useProjecteAssaig(id_assaig);

  const projectesFiltered = useMemo(
    () => projectes && projectes.filter(({ treballat }) => treballat),
    [projectes]
  );

  const projectesElement = useCallback(
    (textualAction) => (
      <>
        <span style={{ marginRight: 8 }}>
          {projectesFiltered.length > 0
            ? t("dashboard:projects")
            : textualAction}
        </span>
        <FixedTagsProjectes projectes={projectesFiltered} />
      </>
    ),
    [projectesFiltered, t]
  );

  return (
    <PopoverList
      title={t("dashboard:projects")}
      searchPlaceholder={t("search projects")}
      defaultValue={projectesFiltered.map(({ id_projecte }) => id_projecte)}
      dataSource={projectes.map((projecte) => ({
        ...projecte,
        value: projecte.id_projecte.toString(),
        label: projecte.titol,
      }))}
      searchFilters={searchFilterProjecte}
      loading={loadingProjectes || loadingProjecte}
      onChange={({ target }) => {
        changeProjecteAssaig({
          id_projecte: target.value,
          treballat: target.checked,
        }).then(() => {
          getMovimentsAssaig();
          getProjectes();
        });
      }}
      action={
        <BorderlessButton style={{ paddingRight: 0 }}>
          {projectesElement(t("add projects"))}
        </BorderlessButton>
      }
      elseElement={projectesElement(t("no projects"))}
      needsAuthorization
    />
  );
};

export default PopoverProjectesAssaig;
