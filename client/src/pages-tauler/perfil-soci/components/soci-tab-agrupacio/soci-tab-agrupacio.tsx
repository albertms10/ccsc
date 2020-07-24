import { Space } from "antd";
import { BooleanMap } from "common";
import React, { useContext } from "react";
import { AvisAcceptacio } from "../../../../components/avis-acceptacio";
import { CollapseCardActivitat } from "../../../../components/collapse-card-activitat";
import { useAPI } from "../../../../helpers";
import { SociContext } from "../../perfil-soci";

const SociTabAgrupacio: React.FC = () => {
  const soci = useContext(SociContext);

  const [acceptacionsSoci] = useAPI<BooleanMap>(
    `/socis/${soci.id_soci}/acceptacions`,
    {}
  );

  return (
    <Space size="large" direction="vertical" style={{ width: "100%" }}>
      <CollapseCardActivitat soci={soci} active />
      <AvisAcceptacio
        nameAvis="proteccio_dades"
        acceptacionsSoci={acceptacionsSoci}
        collapsible
      />
      <AvisAcceptacio
        nameAvis="drets_imatge"
        acceptacionsSoci={acceptacionsSoci}
        collapsible
      />
    </Space>
  );
};

export default SociTabAgrupacio;
