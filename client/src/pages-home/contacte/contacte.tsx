import { Form, Input, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { PageSkeleton } from "../../components/home-app/components/page-skeleton";
import { Container } from "../../standalone/container";

const { Paragraph } = Typography;
const { TextArea } = Input;

const Contacte: React.FC = () => {
  const { t } = useTranslation(["home", "validation"]);

  return (
    <PageSkeleton title={t("contact title")}>
      <Paragraph>{t("contact intro")}</Paragraph>
      <Paragraph>{t("contact action")}</Paragraph>
      <Container>
        <Form layout="vertical" size="large">
          <Form.Item
            label="Nom"
            name="nom"
            rules={[{ required: true, message: t("enter name") }]}
          >
            <Input autoFocus />
          </Form.Item>
          <Form.Item
            label="Adreça electrònica"
            name="email"
            rules={[{ required: true, message: t("enter email") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Missatge"
            name="missatge"
            rules={[{ required: true, message: t("enter message") }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Container>
      <Paragraph>
        {t("contact email")}{" "}
        <a href="mailto:info@cordecambrasantcugat.cat">
          info@cordecambrasantcugat.cat
        </a>{" "}
        {t("contact social")}
      </Paragraph>
    </PageSkeleton>
  );
};

export default Contacte;
