import { InfoCircleOutlined } from "@ant-design/icons";
import { Checkbox, Input, List, Popover } from "antd";
import PropTypes from "prop-types";
import React, { useCallback, useContext, useState } from "react";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { eventSearchFilter } from "../../../../utils";
import { AssaigContext } from "../../detall-assaig";
import { useVeuAssaig, useVeus } from "./hooks";

const { Search } = Input;

const PopoverVeusAssaig = ({ getConvocatsAssaig }) => {
  const { id_assaig } = useContext(AssaigContext);

  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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
    <Popover
      title="Veus específiques"
      visible={visible}
      trigger="click"
      placement="bottomLeft"
      onVisibleChange={setVisible}
      content={
        <>
          <Search
            placeholder="Cerca veus"
            value={searchValue}
            onChange={({ target }) => setSearchValue(target.value)}
            allowClear
            style={{ marginBottom: ".5rem" }}
          />
          <Checkbox.Group
            defaultValue={veus
              .filter((veu) => veu.convocada)
              .map((veu) => veu.id_veu)}
            style={{ width: "100%" }}
          >
            <List
              dataSource={
                searchValue.length > 0
                  ? veus.filter((veu) =>
                      eventSearchFilter(searchValue, {
                        texts: [veu.nom, veu.abreviatura],
                      })
                    )
                  : veus
              }
              loading={loadingVeus || loadingVeu}
              size="small"
              split={false}
              locale={{ emptyText: "No s’ha trobat cap veu" }}
              renderItem={(veu) => (
                <List.Item>
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
                </List.Item>
              )}
            />
          </Checkbox.Group>
        </>
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
