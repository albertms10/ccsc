import { Descriptions, Space, Spin } from "antd";
import { FormInstance } from "antd/lib/form";
import React from "react";
import { useTranslation } from "react-i18next";
import { InfoCard } from "standalone/info-card";

interface ResumAfegirSociProps {
  form: FormInstance;
  username: string;
  loadingUsername?: boolean;
}

const ResumAfegirSoci: React.FC<ResumAfegirSociProps> = ({
  form,
  username,
  loadingUsername = false,
}) => {
  const { t } = useTranslation("fields");

  const nouSoci = form.getFieldsValue();

  return (
    <Space direction="vertical">
      <InfoCard title={t("personal data")}>
        <Descriptions size="small">
          <Descriptions.Item
            label={t("name")}
          >{`${nouSoci.nom} ${nouSoci.cognoms}`}</Descriptions.Item>
          <Descriptions.Item label={t("username")}>
            <Spin size="small" spinning={loadingUsername}>
              {username}
            </Spin>
          </Descriptions.Item>
          <Descriptions.Item label={t("person id")}>
            {nouSoci.dni && nouSoci.dni.toUpperCase()}
          </Descriptions.Item>
          <Descriptions.Item label={t("birth date")} span={2}>
            {nouSoci.naixement && nouSoci.naixement.format("LL")}
          </Descriptions.Item>
        </Descriptions>
      </InfoCard>
      {(nouSoci.experiencia_musical ||
        nouSoci.estudis_musicals ||
        nouSoci.data_alta) && (
        <InfoCard title={t("musical information")}>
          <Descriptions size="small">
            {nouSoci.experiencia_musical && (
              <Descriptions.Item label={t("musical experience")} span={3}>
                {nouSoci.experiencia_musical}
              </Descriptions.Item>
            )}
            {nouSoci.estudis_musicals && (
              <Descriptions.Item label={t("musical studies")} span={3}>
                {nouSoci.estudis_musicals}
              </Descriptions.Item>
            )}
            {nouSoci.data_alta && (
              <Descriptions.Item label={t("subscribed date")}>
                {nouSoci.data_alta.format("LL")}
              </Descriptions.Item>
            )}
          </Descriptions>
        </InfoCard>
      )}
      <InfoCard title={t("contact data")}>
        <Descriptions size="small">
          <Descriptions.Item label={t("email address")} span={2}>
            {nouSoci.email}
          </Descriptions.Item>
          {nouSoci.telefon && (
            <Descriptions.Item label={t("phone")}>
              {nouSoci.telefon}
            </Descriptions.Item>
          )}
        </Descriptions>
      </InfoCard>
    </Space>
  );
};

export default ResumAfegirSoci;
