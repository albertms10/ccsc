import { Button, Space } from "antd";
import React, { useContext } from "react";
import { AvisAcceptacio } from "../../../../components/avis-acceptacio";
import { SettingCard } from "../../../../standalone/setting-card";
import { SociContext } from "../../perfil-soci";
import { useAcceptacions } from "./hooks";

export default () => {
  const soci = useContext(SociContext);
  const [acceptacionsSoci] = useAcceptacions(soci);

  return (
    <Space size="large" direction="vertical">
      <AvisAcceptacio
        nameAvis="proteccio_dades"
        acceptacionsSoci={acceptacionsSoci}
      />
      <AvisAcceptacio
        nameAvis="drets_imatge"
        acceptacionsSoci={acceptacionsSoci}
      />
      <SettingCard
        title="Donar-se de baixa"
        actionItem={<Button type="danger">Baixa</Button>}
      />
    </Space>
  );
};
