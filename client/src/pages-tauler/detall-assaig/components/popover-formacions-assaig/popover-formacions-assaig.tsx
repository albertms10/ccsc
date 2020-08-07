import { Formacio } from "model";
import React, { useCallback, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IconsFormacions } from "../../../../components/icons-formacions";
import { PopoverList } from "../../../../components/popover-list";
import { useAPI } from "../../../../helpers";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { AssaigContext } from "../../detall-assaig";
import { useFormacioAssaig } from "./hooks";

interface PopoverFormacionsAssaigProps {
  getConvocatsAssaig: () => void;
}

const PopoverFormacionsAssaig: React.FC<PopoverFormacionsAssaigProps> = ({
  getConvocatsAssaig,
}) => {
  const { t } = useTranslation("actions");

  const { id_assaig } = useContext(AssaigContext);

  const [formacions, loadingFormacions, getFormacions] = useAPI<Formacio[]>(
    `/assajos/${id_assaig}/formacions`,
    []
  );
  const [loadingFormacio, changeFormacioAssaig] = useFormacioAssaig(id_assaig);

  const formacionsFiltered = useMemo(
    () => formacions && formacions.filter(({ convocada }) => convocada),
    [formacions]
  );

  const formacionsElement = useCallback(
    (textualAction) => (
      <>
        <span style={{ marginRight: 8 }}>
          {formacionsFiltered.length > 0
            ? t("dashboard:formations")
            : textualAction}
        </span>
        <IconsFormacions formacions={formacionsFiltered} />
      </>
    ),
    [formacionsFiltered, t]
  );

  return (
    <PopoverList
      title={t("dashboard:announced formations")}
      searchPlaceholder={t("search formations")}
      defaultValue={formacionsFiltered.map(
        ({ id_formacio }) => id_formacio as number
      )}
      dataSource={formacions.map((formacio) => ({
        ...formacio,
        value: formacio.id_formacio.toString(),
        label: formacio.nom,
      }))}
      searchFilters={(formacio) => ({
        texts: [formacio.nom],
      })}
      loading={loadingFormacions || loadingFormacio}
      onChange={({ target }) => {
        changeFormacioAssaig({
          id_formacio: target.value,
          convocada: target.checked,
        }).then(() => {
          getConvocatsAssaig();
          getFormacions();
        });
      }}
      action={
        <BorderlessButton>
          {formacionsElement(t("add formations"))}
        </BorderlessButton>
      }
      elseElement={formacionsElement(t("no formations"))}
      needsAuthorization
    />
  );
};

export default PopoverFormacionsAssaig;
