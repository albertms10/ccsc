import { Space } from "antd";
import PropTypes from "prop-types";
import React, { useContext, useMemo } from "react";
import { IconFormacio } from "../../../../assets/icons";
import { PopoverList } from "../../../../components/popover-list";
import { useAPI } from "../../../../helpers";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { AssaigContext } from "../../detall-assaig";
import { useFormacioAssaig } from "./hooks";

const PopoverFormacionsAssaig = ({ getConvocatsAssaig }) => {
  const { id_assaig } = useContext(AssaigContext);

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
    <PopoverList
      title="Formacions convocades"
      searchPlaceholder="Cerca formacions"
      defaultValue={formacions
        .filter((formacio) => formacio.convocada)
        .map((formacio) => formacio.id_formacio)}
      dataSource={formacions.map((formacio) => ({
        ...formacio,
        value: formacio.id_formacio,
        label: formacio.nom,
      }))}
      searchFilters={(formacio) => ({
        texts: [formacio.nom],
      })}
      loading={loadingFormacions || loadingFormacio}
      onChange={({ target }) => {
        changeFormacioAssaig({
          id_formacio: target.value,
          checked: target.checked,
        }).then(() => {
          getConvocatsAssaig();
          getFormacions();
        });
      }}
      action={
        <BorderlessButton>
          <Space>
            {iconsFormacions}
            Formacions
          </Space>
        </BorderlessButton>
      }
      elseElement={
        <Space style={{ marginLeft: "1rem" }}>
          Formacions:
          {iconsFormacions}
        </Space>
      }
      needsAuthorization
    />
  );
};

PopoverFormacionsAssaig.propTypes = {
  getConvocatsAssaig: PropTypes.func,
};

export default PopoverFormacionsAssaig;
