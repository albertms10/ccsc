import { Checkbox, Select, Space } from "antd";
import {
  ConvocatoriaGenerica,
  EstatConfirmacio,
  PersonaConvocada,
} from "model";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAPI } from "../../helpers";
import { StatusIcon } from "../../standalone/status-icon";
import { usePutAssistentEsdeveniment } from "./hooks";

interface SelectEstatEsdevenimentProps {
  idEsdeveniment: number;
  persona: PersonaConvocada;
}

const SelectEstatEsdeveniment: React.FC<SelectEstatEsdevenimentProps> = ({
  idEsdeveniment,
  persona,
}) => {
  const { t } = useTranslation("events");

  const [estatConfirmacio, setEstatConfirmacio] = useState(
    persona.id_estat_confirmacio
  );
  const [retardAssistent, setRetardAssistent] = useState(
    persona.amb_retard ? "amb_retard" : ""
  );

  const [estats, loadingEstats] = useAPI<EstatConfirmacio[]>(
    "/esdeveniments/estats-confirmacio",
    []
  );
  const [
    loadingPutAssistent,
    putAssistentEsdeveniment,
  ] = usePutAssistentEsdeveniment(idEsdeveniment);

  const handleChange = useCallback(
    ({ id_estat_confirmacio, amb_retard }: ConvocatoriaGenerica) => {
      const putEstat = id_estat_confirmacio || estatConfirmacio;
      const putRetard = !!amb_retard;

      putAssistentEsdeveniment({
        id_persona: persona.id_persona,
        id_estat_confirmacio: putEstat,
        amb_retard: putRetard,
      }).then(() => {
        if (estatConfirmacio !== putEstat) setEstatConfirmacio(putEstat);
        if (!!retardAssistent !== putRetard)
          setRetardAssistent(putRetard ? "amb_retard" : "");
      });
    },
    [
      estatConfirmacio,
      persona.id_persona,
      putAssistentEsdeveniment,
      retardAssistent,
    ]
  );

  return (
    <Space>
      {estatConfirmacio === 1 && (
        <Checkbox
          defaultChecked={!!retardAssistent}
          onChange={({ target }) =>
            handleChange({ amb_retard: target.checked })
          }
        >
          {t("is late")}
        </Checkbox>
      )}
      <Select
        loading={loadingEstats || loadingPutAssistent}
        defaultValue={persona.id_estat_confirmacio}
        value={estatConfirmacio}
        bordered={false}
        onChange={(value) => handleChange({ id_estat_confirmacio: value })}
      >
        {estats.map(({ id_estat_confirmacio: id, estat }) => (
          <Select.Option key={id} value={id}>
            <Space>
              <StatusIcon statusId={id} />
              {estat}
            </Space>
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};

export default SelectEstatEsdeveniment;
