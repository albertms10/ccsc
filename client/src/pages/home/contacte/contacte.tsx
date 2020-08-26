import { Form, Input, Typography } from "antd";
import { PageSkeleton } from "components/home-app/components/page-skeleton";
import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "standalone/container";

const { Paragraph } = Typography;
const { TextArea } = Input;

const Contacte: React.FC = () => {
  const { t } = useTranslation(["validation", "fields", "home"]);

  return (
    <PageSkeleton title={t("home:contact title")}>
      <Paragraph>{t("home:contact intro")}</Paragraph>
      <Paragraph>{t("home:contact action")}</Paragraph>
      <Container>
        <Form layout="vertical" size="large">
          <Form.Item
            label={t("fields:name")}
            name="nom"
            rules={[{ required: true, message: t("enter name") }]}
          >
            <Input autoFocus />
          </Form.Item>
          <Form.Item
            label={t("fields:email")}
            name="email"
            rules={[{ required: true, message: t("enter email") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("fields:message")}
            name="missatge"
            rules={[{ required: true, message: t("enter message") }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Container>
      <Paragraph>
        {t("home:contact email")}{" "}
        <a href="mailto:info@cordecambrasantcugat.cat">
          info@cordecambrasantcugat.cat
        </a>{" "}
        {t("home:contact social")}
      </Paragraph>
    </PageSkeleton>
  );
};

export default Contacte;
