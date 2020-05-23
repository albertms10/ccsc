import { Button, Space, Switch } from "antd";
import React, { useContext } from "react";
import { AvisAcceptacio } from "../../../../components/avis-acceptacio";
import { textDretsImatge } from "../../../../components/steps-afegir-soci/hooks/use-steps-afegir-soci";
import { SettingCard } from "../../../../standalone/setting-card";
import { SociContext } from "../../perfil-soci";
import { useAcceptacions, useAcceptaDretsImatge } from "./hooks";

export default () => {
  const soci = useContext(SociContext);
  const [acceptacionsSoci] = useAcceptacions(soci);
  const [acceptaDretsImatge, putAcceptaDretsImatge] = useAcceptaDretsImatge(
    soci
  );

  return (
    <Space size="large" direction="vertical">
      <AvisAcceptacio acceptacionsSoci={acceptacionsSoci} />
      <SettingCard
        title="Drets d’imatge"
        actionItem={
          <Switch
            checked={acceptaDretsImatge}
            onChange={putAcceptaDretsImatge}
          />
        }
        info={textDretsImatge}
      />
      <SettingCard
        title="Donar-se de baixa"
        actionItem={<Button type="danger">Baixa</Button>}
      />
    </Space>
  );
};
