import { InfoCircleOutlined } from "@ant-design/icons";
import { Checkbox, Popover, Spin } from "antd";
import PropTypes from "prop-types";
import React, { useCallback, useContext, useState } from "react";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { literalList } from "../../../../utils";
import { AssaigContext } from "../../detall-assaig";
import { useVeuAssaig, useVeus } from "./hooks";

const PopoverVeusAssaig = ({ getConvocatsAssaig }) => {
  const { id_assaig } = useContext(AssaigContext);

  const [visible, setVisible] = useState(false);
  const [veus, loadingVeus, getVeus] = useVeus(id_assaig);
  const [loadingVeu, changeVeuAssaig] = useVeuAssaig(id_assaig);

  const getVeusText = useCallback(() => {
    const convocades = veus.filter((veu) => veu.convocada);

    return convocades.length > 0
      ? literalList(convocades.map((veu) => veu.nom))
      : "Totes";
  }, [veus]);

  return (
    <Popover
      title="Veus específiques"
      visible={visible}
      trigger="click"
      placement="topLeft"
      onVisibleChange={setVisible}
      content={
        <Spin spinning={loadingVeus || loadingVeu}>
          <Checkbox.Group
            defaultValue={veus
              .filter((veu) => veu.convocada)
              .map((veu) => veu.id_veu)}
          >
            {veus.map((veu) => (
              <Checkbox
                key={veu.id_veu}
                value={veu.id_veu}
                defaultChecked={true}
                onChange={({ target }) => {
                  changeVeuAssaig({
                    id_veu: target.value,
                    checked: target.checked,
                  }).then(() => {
                    getConvocatsAssaig();
                    getVeus();
                  });
                }}
              >
                {veu.nom}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Spin>
      }
    >
      <BorderlessButton icon={<InfoCircleOutlined />}>
        {getVeusText()}
      </BorderlessButton>
    </Popover>
  );
};

PopoverVeusAssaig.propTypes = {
  getConvocatsAssaig: PropTypes.func,
};

export default PopoverVeusAssaig;
