import { Descriptions, Space, Spin } from "antd";
import { FormInstance } from "antd/lib/form";
import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("fields");

  const data = form.getFieldsValue();

  return (
    <Space direction="vertical">
      <InfoCard title={t("personal data")}>
        <Descriptions size="small">
          <Descriptions.Item
            label={t("name")}
          >{`${data.nom} ${data.cognoms}`}</Descriptions.Item>
          <Descriptions.Item label={t("username")}>
            {loadingUsername ? <Spin size="small" /> : username}
          </Descriptions.Item>
          <Descriptions.Item label={t("person id")}>
            {data.dni}
          </Descriptions.Item>
          <Descriptions.Item label={t("birth date")} span={2}>
            {data.naixement && data.naixement.format("LL")}
          </Descriptions.Item>
        </Descriptions>
      </InfoCard>
      {(data.experiencia_musical ||
        data.estudis_musicals ||
        data.data_alta) && (
        <InfoCard title={t("musical information")}>
          <Descriptions size="small">
            {data.experiencia_musical && (
              <Descriptions.Item label={t("musical experience")} span={3}>
                {data.experiencia_musical}
              </Descriptions.Item>
            )}
            {data.estudis_musicals && (
              <Descriptions.Item label={t("musical studies")} span={3}>
                {data.estudis_musicals}
              </Descriptions.Item>
            )}
            {data.data_alta && (
              <Descriptions.Item label={t("subscribed date")}>
                {data.data_alta.format("LL")}
              </Descriptions.Item>
            )}
          </Descriptions>
        </InfoCard>
      )}
      <InfoCard title={t("contact data")}>
        <Descriptions size="small">
          <Descriptions.Item label={t("email")} span={2}>
            {data.email}
          </Descriptions.Item>
          {data.telefon && (
            <Descriptions.Item label={t("phone")}>
              {data.telefon}
            </Descriptions.Item>
          )}
        </Descriptions>
      </InfoCard>
    </Space>
  );
};

export default ResumAfegirSoci;
