import { Checkbox, Select, Space } from "antd";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import { useAPI } from "../../helpers";
import { StatusIcon } from "../../standalone/status-icon";
import { usePutAssistentEsdeveniment } from "./hooks";

const SelectEstatEsdeveniment = ({ idEsdeveniment, persona }) => {
  const [estatConfirmacio, setEstatConfirmacio] = useState(
    persona.id_estat_confirmacio
  );
  const [retardAssistent, setRetardAssistent] = useState(
    persona.retard ? "retard" : ""
  );

  const [estats, loadingEstats] = useAPI("/esdeveniments/estats-confirmacio");
  const [
    loadingPutAssistent,
    putAssistentEsdeveniment,
  ] = usePutAssistentEsdeveniment(idEsdeveniment);

  const handleChange = useCallback(
    ({ id_estat_confirmacio, retard }) => {
      const putEstat = id_estat_confirmacio || estatConfirmacio;
      const putRetard = !!retard;

      putAssistentEsdeveniment({
        id_soci: persona.id_soci,
        id_estat_confirmacio: putEstat,
        retard: putRetard,
      }).then(() => {
        if (estatConfirmacio !== putEstat) setEstatConfirmacio(putEstat);
        if (retardAssistent !== putRetard)
          setRetardAssistent(putRetard ? "retard" : "");
      });
    },
    [
      estatConfirmacio,
      persona.id_soci,
      putAssistentEsdeveniment,
      retardAssistent,
    ]
  );

  return (
    <Space>
      {estatConfirmacio === 1 && (
        <Checkbox
          defaultChecked={retardAssistent}
          onChange={({ target }) => handleChange({ retard: target.checked })}
        >
          Amb retard
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

SelectEstatEsdeveniment.propTypes = {
  idEsdeveniment: PropTypes.any,
  persona: PropTypes.object,
};

export default SelectEstatEsdeveniment;
