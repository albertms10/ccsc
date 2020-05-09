import { Descriptions, Divider, Spin } from "antd";
import React from "react";

export default ({ data, username, loadingUsername }) => (
  <>
    <Divider orientation="left">Dades personals</Divider>
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
    {data.experiencia_musical || data.estudis_musicals || data.data_alta ? (
      <>
        <Divider orientation="left" style={{ marginTop: "2rem" }}>
          Informació musical
        </Divider>
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
      </>
    ) : (
      ""
    )}
    <Divider orientation="left" style={{ marginTop: "2rem" }}>
      Dades de contacte
    </Divider>
    <Descriptions size="small">
      <Descriptions.Item label="Adreça electrònica" span={2}>
        {data.email}
      </Descriptions.Item>
      {data.telefon ? (
        <Descriptions.Item label="Telèfon">{data.telefon}</Descriptions.Item>
      ) : (
        ""
      )}
    </Descriptions>
    <Divider orientation="left" style={{ marginTop: "2rem" }}>
      Acceptacions
    </Divider>
    <Descriptions size="small">
      <Descriptions.Item label="Protecció de dades">
        {data.accepta_proteccio_dades ? "Sí" : "No"}
      </Descriptions.Item>
      <Descriptions.Item label="Drets d’imatge">
        {data.accepta_drets_imatge ? "Sí" : "No"}
      </Descriptions.Item>
    </Descriptions>
  </>
);
