import { InfoCircleOutlined } from "@ant-design/icons";
import { Space } from "antd";
import PropTypes from "prop-types";
import React, { useCallback, useContext } from "react";
import { PopoverList } from "../../../../components/popover-list";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { AssaigContext } from "../../detall-assaig";
import { useVeuAssaig, useVeus } from "./hooks";

const PopoverVeusAssaig = ({ getConvocatsAssaig }) => {
  const { id_assaig } = useContext(AssaigContext);

  const [veus, loadingVeus, getVeus] = useVeus(id_assaig);
  const [loadingVeu, changeVeuAssaig] = useVeuAssaig(id_assaig);

  const getVeusText = useCallback(() => {
    const convocades = veus.filter((veu) => veu.convocada);

    return convocades.length > 0 && convocades.length < veus.length
      ? convocades.length >= veus.length - 2
        ? "Sense " +
          veus
            .filter((veu) => !convocades.includes(veu))
            .map((veu) => veu.abreviatura)
            .join("")
        : convocades.map((veu) => veu.abreviatura).join("")
      : "Totes";
  }, [veus]);

  return (
    <PopoverList
      title="Veus específiques"
      searchPlaceholder="Cerca veus"
      defaultValue={veus
        .filter((veu) => veu.convocada)
        .map((veu) => veu.id_veu)}
      dataSource={veus.map((veu) => ({
        ...veu,
        value: veu.id_veu,
        label: veu.nom,
      }))}
      searchFilters={(veu) => ({
        texts: [veu.nom, veu.abreviatura],
      })}
      loading={loadingVeus || loadingVeu}
      onChange={({ target }) => {
        changeVeuAssaig({
          id_veu: target.value,
          checked: target.checked,
        }).then(() => {
          getConvocatsAssaig();
          getVeus();
        });
      }}
      action={
        <BorderlessButton icon={<InfoCircleOutlined />}>
          {getVeusText()}
        </BorderlessButton>
      }
      elseElement={
        <Space style={{ marginLeft: "1rem" }}>
          <InfoCircleOutlined />
          {getVeusText()}
        </Space>
      }
      needsAuthorization
    />
  );
};

PopoverVeusAssaig.propTypes = {
  getConvocatsAssaig: PropTypes.func,
};

export default PopoverVeusAssaig;
