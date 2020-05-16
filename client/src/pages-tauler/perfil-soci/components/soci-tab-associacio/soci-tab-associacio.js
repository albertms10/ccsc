import { Alert, Button, Space, Switch } from "antd";
import React, { useContext } from "react";
import {
  textDretsImatge,
  textProteccioDades,
} from "../../../../components/steps-afegir-soci/components/form-afegir-soci/form-afegir-soci";
import { SettingCard } from "../../../../standalone/setting-card";
import { SociContext } from "../../perfil-soci";
import { useAcceptaDretsImatge, useAcceptaProteccioDades } from "./hooks";

export default () => {
  const soci = useContext(SociContext);
  const [
    acceptaProteccioDades,
    putAcceptaProteccioDades,
  ] = useAcceptaProteccioDades(soci);
  const [acceptaDretsImatge, putAcceptaDretsImatge] = useAcceptaDretsImatge(
    soci
  );

  return (
    <Space size="large" direction="vertical">
      <SettingCard
        title="Protecció de dades"
        alert={
          <Alert
            type="warning"
            showIcon
            message="Has d’acceptar la protecció de dades."
          />
        }
        alertCondition={!acceptaProteccioDades}
        actionItem={
          <Switch
            checked={acceptaProteccioDades}
            disabled={acceptaProteccioDades}
            onChange={putAcceptaProteccioDades}
          />
        }
        actionTooltip="Cal acceptar la protecció de dades"
        info={textProteccioDades}
      />
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
