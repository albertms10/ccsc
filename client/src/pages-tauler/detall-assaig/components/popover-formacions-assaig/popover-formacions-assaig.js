import { Checkbox, Input, List, Popover, Space } from "antd";
import PropTypes from "prop-types";
import React, { useContext, useMemo, useState } from "react";
import { IconFormacio } from "../../../../assets/icons";
import { Authorized } from "../../../../components/authorized";
import { useAPI } from "../../../../helpers";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { eventSearchFilter } from "../../../../utils";
import { AssaigContext } from "../../detall-assaig";
import { useFormacioAssaig } from "./hooks";

const { Search } = Input;

const PopoverFormacionsAssaig = ({ getConvocatsAssaig }) => {
  const { id_assaig } = useContext(AssaigContext);

  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [formacions, loadingFormacions, getFormacions] = useAPI(
    `/api/assajos/${id_assaig}/formacions`
  );
  const [loadingFormacio, changeFormacioAssaig] = useFormacioAssaig(id_assaig);

  const iconsFormacions = useMemo(
    () =>
      formacions &&
      formacions
        .filter((formacio) => formacio.convocada)
        .map((formacio) => (
          <IconFormacio key={formacio.id_formacio} name={formacio.nom_curt} />
        )),
    [formacions]
  );

  return (
    <Authorized
      elseElement={
        <Space style={{ marginLeft: "1rem" }}>
          Formacions:
          {iconsFormacions}
        </Space>
      }
    >
      <Popover
        title="Formacions convocades"
        visible={visible}
        trigger="click"
        placement="bottomLeft"
        onVisibleChange={setVisible}
        content={
          <>
            <Search
              placeholder="Cerca formacions"
              value={searchValue}
              onChange={({ target }) => setSearchValue(target.value)}
              allowClear
              style={{ marginBottom: ".5rem" }}
            />
            <Checkbox.Group
              defaultValue={formacions
                .filter((formacio) => formacio.convocada)
                .map((formacio) => formacio.id_formacio)}
              style={{ width: "100%", display: "block" }}
            >
              <List
                dataSource={
                  searchValue.length > 0
                    ? formacions.filter((formacio) =>
                        eventSearchFilter(searchValue, {
                          texts: [formacio.nom],
                        })
                      )
                    : formacions
                }
                loading={loadingFormacions || loadingFormacio}
                size="small"
                split={false}
                locale={{ emptyText: "No s’ha trobat cap formació" }}
                renderItem={(formacio) => (
                  <List.Item>
                    <Checkbox
                      key={formacio.id_formacio}
                      value={formacio.id_formacio}
                      defaultChecked={true}
                      onChange={({ target }) => {
                        changeFormacioAssaig({
                          id_formacio: target.value,
                          checked: target.checked,
                        }).then(() => {
                          getConvocatsAssaig();
                          getFormacions();
                        });
                      }}
                    >
                      {formacio.nom}
                    </Checkbox>
                  </List.Item>
                )}
              />
            </Checkbox.Group>
          </>
        }
      >
        <BorderlessButton>
          <Space>
            {iconsFormacions}
            Formacions
          </Space>
        </BorderlessButton>
      </Popover>
    </Authorized>
  );
};

PopoverFormacionsAssaig.propTypes = {
  getConvocatsAssaig: PropTypes.func,
};

export default PopoverFormacionsAssaig;
