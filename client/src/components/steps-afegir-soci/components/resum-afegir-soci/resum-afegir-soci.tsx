import { Descriptions, Space, Spin } from "antd";
import { FormInstance } from "antd/lib/form";
import React from "react";
import { InfoCard } from "../../../../standalone/info-card";

interface ResumAfegirSoci {
  form: FormInstance;
  username: string;
  loadingUsername?: boolean;
}

const ResumAfegirSoci: React.FC<ResumAfegirSoci> = ({
  form,
  username,
  loadingUsername = false,
}) => {
  const data = form.getFieldsValue();

  return (
    <Space direction="vertical">
      <InfoCard title="Dades personals">
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
      </InfoCard>
      {(data.experiencia_musical ||
        data.estudis_musicals ||
        data.data_alta) && (
        <InfoCard title="Informació musical">
          <Descriptions size="small">
            {data.experiencia_musical && (
              <Descriptions.Item label="Experiència musical" span={3}>
                {data.experiencia_musical}
              </Descriptions.Item>
            )}
            {data.estudis_musicals && (
              <Descriptions.Item label="Estudis musicals" span={3}>
                {data.estudis_musicals}
              </Descriptions.Item>
            )}
            {data.data_alta && (
              <Descriptions.Item label="Data d’alta">
                {data.data_alta.format("LL")}
              </Descriptions.Item>
            )}
          </Descriptions>
        </InfoCard>
      )}
      <InfoCard title="Dades de contacte">
        <Descriptions size="small">
          <Descriptions.Item label="Adreça electrònica" span={2}>
            {data.email}
          </Descriptions.Item>
          {data.telefon && (
            <Descriptions.Item label="Telèfon">
              {data.telefon}
            </Descriptions.Item>
          )}
        </Descriptions>
      </InfoCard>
    </Space>
  );
};

export default ResumAfegirSoci;
