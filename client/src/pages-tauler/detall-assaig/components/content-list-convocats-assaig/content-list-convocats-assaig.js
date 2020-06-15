import { Space } from "antd";
import React, { useContext } from "react";
import { IconFormacio } from "../../../../assets/icons";
import { SelectEstatEsdeveniment } from "../../../../components/select-estat-esdeveniment";
import { ContentListPersones } from "../../../formacio/components/content-list-persones";
import { AssaigContext } from "../../detall-assaig";
import { useConvocatsAssaig } from "../../hooks";
import { PopoverVeusAssaig } from "../popover-veus-assaig";

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
      action={
        <Space>
          <PopoverVeusAssaig getConvocatsAssaig={getConvocatsAssaig} />
          <Space>
            {assaig.formacions &&
              assaig.formacions.map((formacio) => (
                <IconFormacio
                  key={formacio.id_formacio}
                  name={formacio.nom_curt}
                />
              ))}
          </Space>
        </Space>
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
