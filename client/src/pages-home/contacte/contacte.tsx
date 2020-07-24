import { Form, Input, Typography } from "antd";
import React from "react";
import { PageSkeleton } from "../../components/home-app/components/page-skeleton";
import { Container } from "../../standalone/container";

const { Paragraph } = Typography;
const { TextArea } = Input;

const Contacte: React.FC = () => (
  <PageSkeleton title="Contacte">
    <Paragraph>
      Vols contactar amb nosaltres? Creus que t’avens amb el Cor de Cambra Sant
      Cugat? Vols mantenir-te informat sobre les nostres actuacions? T’agradaria
      deixar-nos algun comentari?
    </Paragraph>
    <Paragraph>Endavant! T’estarem agraïts!</Paragraph>
    <Container>
      <Form layout="vertical" size="large">
        <Form.Item
          label="Nom"
          name="nom"
          rules={[{ required: true, message: "Introdueixi el nom" }]}
        >
          <Input autoFocus />
        </Form.Item>
        <Form.Item
          label="Adreça electrònica"
          name="email"
          rules={[
            {
              required: true,
              message:
                "Si us plau, introdueixi la seva adreça electrònica de contacte.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Missatge"
          name="missatge"
          rules={[
            {
              required: true,
              message: "Introdueix el missatge",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Container>
    <Paragraph>
      Si ho prefereixes, pots contactar amb nosaltres, també, amb el correu
      electrònic{" "}
      <a href="mailto:info@cordecambrasantcugat.cat">
        info@cordecambrasantcugat.cat
      </a>{" "}
      o mitjançant les xarxes socials.
    </Paragraph>
  </PageSkeleton>
);

export default Contacte;
