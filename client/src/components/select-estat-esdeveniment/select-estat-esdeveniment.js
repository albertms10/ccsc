import { Select, Space } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { StatusIcon } from "../../standalone/status-icon";
import { useEstatsConfirmacio, usePutAssistentEsdeveniment } from "./hooks";

const SelectEstatEsdeveniment = ({ idEsdeveniment, persona }) => {
  const [estats, loadingEstats] = useEstatsConfirmacio();
  const [
    loadingPutAssistent,
    putAssistentEsdeveniment,
  ] = usePutAssistentEsdeveniment(idEsdeveniment);

  return (
    <Select
      loading={loadingEstats || loadingPutAssistent}
      defaultValue={persona.id_estat_confirmacio}
      bordered={false}
      onChange={(value) => {
        putAssistentEsdeveniment({
          id_soci: persona.id_persona,
          id_estat_confirmacio: value,
          retard: false,
        });
      }}
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
  );
};

SelectEstatEsdeveniment.propTypes = {
  idEsdeveniment: PropTypes.any,
  persona: PropTypes.object,
};

export default SelectEstatEsdeveniment;
