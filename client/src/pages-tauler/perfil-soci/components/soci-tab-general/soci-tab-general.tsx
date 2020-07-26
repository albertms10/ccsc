import {
  ControlOutlined,
  CustomerServiceOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Descriptions, List, Space, Typography } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import { SiderBrokenContext } from "../../../../components/tauler-app/contexts/sider-context";
import { InfoCard } from "../../../../standalone/info-card";
import { upperCaseFirst } from "../../../../utils";
import { SociContext } from "../../perfil-soci";

const { Item } = Descriptions;

const SociTabGeneral: React.FC = () => {
  const soci = useContext(SociContext);
  const broken = useContext(SiderBrokenContext);

  const descriptionsSize = broken ? "small" : "middle";

  return (
    <Space size="middle" direction="vertical" style={{ marginTop: ".5rem" }}>
      <InfoCard title="Dades personals">
        <Descriptions size={descriptionsSize} layout="vertical">
          <Item label="DNI">
            <Typography.Paragraph className="action-text" copyable>
              {soci.dni}
            </Typography.Paragraph>
          </Item>
          <Item label="Naixement">
            <Typography.Paragraph className="action-text" copyable>
              {moment(soci.naixement).format("LL")}
            </Typography.Paragraph>
          </Item>
        </Descriptions>
      </InfoCard>
      <InfoCard title="Dades de contacte">
        <Descriptions size={descriptionsSize} layout="vertical">
          {soci.telefon && (
            <Item label="Telèfon">
              <Typography.Paragraph className="action-text" copyable>
                {soci.telefon}
              </Typography.Paragraph>
            </Item>
          )}
          <Item label="Adreça electrònica">
            <Typography.Paragraph className="action-text" copyable>
              {soci.email}
            </Typography.Paragraph>
          </Item>
        </Descriptions>
      </InfoCard>
      <InfoCard title="Rols d’usuari">
        <List
          dataSource={soci.roles}
          renderItem={(role) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  role === "direccio_musical" ? (
                    <CustomerServiceOutlined
                      style={{ color: "rgba(0, 0, 0, 0.65)" }}
                    />
                  ) : role === "admin" ? (
                    <ControlOutlined style={{ color: "rgba(0, 0, 0, 0.65)" }} />
                  ) : (
                    <UserOutlined style={{ color: "rgba(0, 0, 0, 0.65)" }} />
                  )
                }
                title={upperCaseFirst(role.split("_").join(" "))}
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
