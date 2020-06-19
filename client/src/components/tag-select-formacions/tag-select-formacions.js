import TagSelect from "ant-design-pro/lib/TagSelect";
import { Space } from "antd";
import React, { useContext } from "react";
import { IconFormacio } from "../../assets/icons";
import { FormacionsListContext } from "../tauler-app/contexts/formacions-context";

export default () => {
  const formacions = useContext(FormacionsListContext);

  return (
    <TagSelect className="" Option={null} hideCheckAll>
      {formacions.map((formacio) => (
        <TagSelect.Option
          key={formacio.id_formacio}
          value={formacio.id_formacio}
        >
          <Space>
            <IconFormacio name={formacio.nom_curt} hasTooltip={false} />
            {formacio.nom_curt}
          </Space>
        </TagSelect.Option>
      ))}
    </TagSelect>
  );
};
