import {
  ControlOutlined,
  CustomerServiceOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Descriptions, List, Space, Typography } from "antd";
import { SiderBrokenContext } from "components/tauler-app/contexts/sider-context";
import moment from "moment";
import { SociContext } from "pages/tauler/perfil-soci";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { InfoCard } from "standalone/info-card";

const { Item } = Descriptions;

const SociTabGeneral: React.FC = () => {
  const { t } = useTranslation("fields");

  const soci = useContext(SociContext);
  const broken = useContext(SiderBrokenContext);

  const descriptionsSize = broken ? "small" : "middle";

  return (
    <Space size="middle" direction="vertical" style={{ marginTop: ".5rem" }}>
      <InfoCard title={t("personal data")}>
        <Descriptions size={descriptionsSize} layout="vertical">
          <Item label={t("person id")}>
            <Typography.Paragraph className="action-text" copyable>
              {soci.dni}
            </Typography.Paragraph>
          </Item>
          <Item label={t("birth date")}>
            <Typography.Paragraph className="action-text" copyable>
              {moment(soci.naixement).format("LL")}
            </Typography.Paragraph>
          </Item>
        </Descriptions>
      </InfoCard>
      <InfoCard title={t("contact data")}>
        <Descriptions size={descriptionsSize} layout="vertical">
          {soci.telefon && (
            <Item label={t("phone")}>
              <Typography.Paragraph className="action-text" copyable>
                {soci.telefon}
              </Typography.Paragraph>
            </Item>
          )}
          <Item label={t("email address")}>
            <Typography.Paragraph className="action-text" copyable>
              {soci.email}
            </Typography.Paragraph>
          </Item>
        </Descriptions>
      </InfoCard>
      <InfoCard title={t("user roles")}>
        <List
          dataSource={soci.roles}
          renderItem={(role) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  role === "musical_management" ? (
                    <CustomerServiceOutlined
                      style={{ color: "rgba(0, 0, 0, 0.65)" }}
                    />
                  ) : role === "admin" ? (
                    <ControlOutlined style={{ color: "rgba(0, 0, 0, 0.65)" }} />
                  ) : (
                    <UserOutlined style={{ color: "rgba(0, 0, 0, 0.65)" }} />
                  )
                }
                title={t(`sign-in:${role}`)}
                style={{ fontSize: "medium" }}
              />
            </List.Item>
          )}
        />
      </InfoCard>
    </Space>
  );
};

export default SociTabGeneral;
