import { PersonaConvocada } from "model";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { SelectEstatEsdeveniment } from "../../../../components/select-estat-esdeveniment";
import { useAPI } from "../../../../helpers";
import { ContentListPersones } from "../../../detall-formacio/components/content-list-persones";
import { AssaigContext } from "../../detall-assaig";
import { PopoverFormacionsAssaig } from "../popover-formacions-assaig";
import { PopoverVeusAssaig } from "../popover-veus-assaig";

const ContentListConvocatsAssaig: React.FC = () => {
  const { t } = useTranslation("dashboard");

  const assaig = useContext(AssaigContext);

  const [convocats, loadingConvocats, getConvocatsAssaig] = useAPI<
    PersonaConvocada[]
  >(`/assajos/${assaig.id_assaig}/convocades`, []);

  return (
    <ContentListPersones
      title={t("announced people")}
      persones={convocats}
      loading={loadingConvocats}
      action={<PopoverVeusAssaig getConvocatsAssaig={getConvocatsAssaig} />}
      extra={
        <PopoverFormacionsAssaig getConvocatsAssaig={getConvocatsAssaig} />
      }
      itemExtra={(persona) => (
        <SelectEstatEsdeveniment
          idEsdeveniment={assaig.id_assaig}
          persona={persona}
        />
      )}
    />
  );
};

export default ContentListConvocatsAssaig;
