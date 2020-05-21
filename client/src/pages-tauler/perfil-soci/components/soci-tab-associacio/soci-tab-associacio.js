import { Button, Form, Space, Switch } from "antd";
import React, { useContext } from "react";
import { ProteccioDades } from "../../../../components/proteccio-dades";
import { textDretsImatge } from "../../../../components/steps-afegir-soci/hooks/use-steps-afegir-soci";
import { SettingCard } from "../../../../standalone/setting-card";
import { SociContext } from "../../perfil-soci";
import { useAcceptaDretsImatge, useAcceptacions } from "./hooks";

export default () => {
  const soci = useContext(SociContext);
  const [acceptacions] = useAcceptacions(soci);
  const [acceptaDretsImatge, putAcceptaDretsImatge] = useAcceptaDretsImatge(
    soci
  );

  const [form] = Form.useForm();

  return (
    <Space size="large" direction="vertical">
      <Form form={form} initialValues={acceptacions}>
        <ProteccioDades />
      </Form>
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
