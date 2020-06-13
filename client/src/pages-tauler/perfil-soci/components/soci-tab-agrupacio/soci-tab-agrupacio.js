import { Space } from "antd";
import React, { useContext } from "react";
import { AvisAcceptacio } from "../../../../components/avis-acceptacio";
import { SettingCardActivitat } from "../../../../components/setting-card-activitat";
import { SociContext } from "../../perfil-soci";
import { useAcceptacions } from "./hooks";

export default () => {
  const soci = useContext(SociContext);
  const [acceptacionsSoci] = useAcceptacions(soci);

  return (
    <Space size="large" direction="vertical" style={{ width: "100%" }}>
      <SettingCardActivitat soci={soci} />
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
