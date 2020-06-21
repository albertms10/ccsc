import React, { useContext } from "react";
import { SelectEstatEsdeveniment } from "../../../../components/select-estat-esdeveniment";
import { ContentListPersones } from "../../../formacio/components/content-list-persones";
import { AssaigContext } from "../../detall-assaig";
import { PopoverFormacionsAssaig } from "../popover-formacions-assaig";
import { PopoverVeusAssaig } from "../popover-veus-assaig";
import { useConvocatsAssaig } from "./hooks";

export default () => {
  const assaig = useContext(AssaigContext);

  const [convocats, loadingConvocats, getConvocatsAssaig] = useConvocatsAssaig(
    assaig.id_assaig
  );

  return (
    <ContentListPersones
      title="Convocades"
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
