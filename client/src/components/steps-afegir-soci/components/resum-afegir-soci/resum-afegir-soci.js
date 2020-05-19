import { Descriptions, Space, Spin } from "antd";
import React from "react";
import { SettingCard } from "../../../../standalone/setting-card";
import { StatusIcon } from "../../../../standalone/status-icon";

export default ({
  data,
  username,
  loadingUsername,
  acceptaProteccioDades,
  acceptaDretsImatge,
}) => (
  <Space direction="vertical">
    <SettingCard
      title="Dades personals"
      info={
        <Descriptions size="small">
          <Descriptions.Item label="Nom">{`${data.nom} ${data.cognoms}`}</Descriptions.Item>
          <Descriptions.Item label="Usuari">
            {loadingUsername ? <Spin size="small" /> : username}
          </Descriptions.Item>
          <Descriptions.Item label="DNI">{data.dni}</Descriptions.Item>
          <Descriptions.Item label="Naixement" span={2}>
            {data.naixement && data.naixement.format("LL")}
          </Descriptions.Item>
        </Descriptions>
      }
    />
    {data.experiencia_musical || data.estudis_musicals || data.data_alta ? (
      <SettingCard
        title="Informació musical"
        info={
          <Descriptions size="small">
            {data.experiencia_musical ? (
              <Descriptions.Item label="Experiència musical" span={3}>
                {data.experiencia_musical}
              </Descriptions.Item>
            ) : (
              ""
            )}
            {data.estudis_musicals ? (
              <Descriptions.Item label="Estudis musicals" span={3}>
                {data.estudis_musicals}
              </Descriptions.Item>
            ) : (
              ""
            )}
            {data.data_alta ? (
              <Descriptions.Item label="Data d’alta">
                {data.data_alta.format("LL")}
              </Descriptions.Item>
            ) : (
              ""
            )}
          </Descriptions>
        }
      />
    ) : (
      ""
    )}
    <SettingCard
      title="Dades de contacte"
      info={
        <Descriptions size="small">
          <Descriptions.Item label="Adreça electrònica" span={2}>
            {data.email}
          </Descriptions.Item>
          {data.telefon ? (
            <Descriptions.Item label="Telèfon">
              {data.telefon}
            </Descriptions.Item>
          ) : (
            ""
          )}
        </Descriptions>
      }
    />
    <SettingCard
      title="Acceptacions"
      info={
        <Descriptions size="small">
          <Descriptions.Item label="Protecció de dades">
            <StatusIcon
              statusId={acceptaProteccioDades ? 1 : 3}
              label={acceptaProteccioDades ? "Accepto" : "No accepto"}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Drets d’imatge">
            <StatusIcon
              statusId={acceptaDretsImatge ? 1 : 3}
              label={acceptaDretsImatge ? "Accepto" : "No accepto"}
            />
          </Descriptions.Item>
        </Descriptions>
      }
    />
  </Space>
);
