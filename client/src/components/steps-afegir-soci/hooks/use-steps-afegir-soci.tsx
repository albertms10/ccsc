import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
} from "antd";
import { ValidateStatus } from "antd/lib/form/FormItem";
import { Pais } from "model";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { DATE_FORMAT } from "../../../constants/constants";
import { useAPI, usePostAPI } from "../../../helpers";
import { InfoCard } from "../../../standalone/info-card";
import { upperCaseFirst } from "../../../utils";
import { AvisAcceptacio } from "../../avis-acceptacio";
import { ResumAfegirSoci } from "../components/resum-afegir-soci";
import { useUsername } from "./index";

const { Option } = Select;
const { TextArea } = Input;

export interface FormStep {
  key: string;
  title: string;
  selfCreationOnly: boolean;
  content: React.ReactNode;
}

export default (
  onSuccessCallback: () => void,
  selfCreation = false,
  fetchURL = "/socis"
) => {
  const { t } = useTranslation(["fields", "validation"]);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [dniValidation, setDniValidation] = useState<ValidateStatus>("");
  const [selectedPais, setSelectedPais] = useState("");

  const [paisos, loadingPaisos] = useAPI<Pais[]>("/localitzacions/paisos", []);
  const [loadingPostSoci, postSoci] = usePostAPI(fetchURL);

  const [username, loadingUsername, getUsername] = useUsername();

  const [form] = Form.useForm();

  // TODO Extreure la lògica a `utils` i retornar una `Promise`
  const validatorDniES = useCallback(
    (rule, value: string) => {
      const XIFRES = 8;

      const letter = value ? value.charAt(value.length - 1) : "";
      if (letter.match(/^[a-z]+$/)) {
        setDniValidation("warning");
        return Promise.reject(t("enter letter uppercase"));
      }

      const number = parseInt(value.substr(0, value.length - 1));
      const letters = "TRWAGMYFPDXBNJZSQVHLCKE";

      if (number.toString().length === XIFRES) {
        if (value === number + letters[number % letters.length]) {
          setDniValidation("success");
          return Promise.resolve();
        }
      } else {
        setDniValidation("");
        return Promise.reject(t("number must be", { number: XIFRES }));
      }

      setDniValidation("error");
      return Promise.reject(t("letter does not correspond"));
    },
    [t]
  );

  const steps: FormStep[] = [
    {
      key: "proteccio",
      title: t("data protection"),
      selfCreationOnly: true,
      content: <AvisAcceptacio nameAvis="proteccio_dades" isForm />,
    },
    {
      key: "dades",
      title: t("partner data"),
      selfCreationOnly: false,
      content: (
        <Space size="middle" direction="vertical">
          <InfoCard title={t("personal data")}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={10}>
                <Form.Item
                  name="nom"
                  label={t("name")}
                  rules={[
                    { required: true, message: t("enter name") },
                    { whitespace: true, message: t("enter name") },
                  ]}
                >
                  <Input autoComplete="given-name" autoFocus />
                </Form.Item>
              </Col>
              <Col xs={24} sm={14} flex={1}>
                <Form.Item
                  name="cognoms"
                  label={t("surname")}
                  rules={[
                    { required: true, message: t("enter surname") },
                    { whitespace: true, message: t("enter surname") },
                  ]}
                >
                  <Input autoComplete="family-name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="id_pais"
                  label={t("country of nationality")}
                  rules={[
                    {
                      required: true,
                      message: t("select country of nationality"),
                    },
                  ]}
                >
                  <Select<string>
                    showSearch
                    loading={loadingPaisos}
                    onSelect={(value) => setSelectedPais(value)}
                    filterOption={(input, option) =>
                      option!.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {paisos.map((pais) => (
                      <Option key={pais.id_pais} value={pais.id_pais}>
                        {pais.nom}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={10}>
                <Form.Item
                  name="dni"
                  label={t("person id")}
                  hasFeedback
                  validateStatus={selectedPais === "es" ? dniValidation : ""}
                  rules={[
                    { required: true, message: t("enter person id") },
                    { whitespace: true, message: t("enter person id") },
                    selectedPais === "es" ? { validator: validatorDniES } : {},
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item
                  name="naixement"
                  label={t("birth date")}
                  rules={[{ required: true, message: t("enter birth date") }]}
                >
                  <DatePicker
                    format="L"
                    allowClear={false}
                    showToday={false}
                    disabledDate={(d) => !d || d.isAfter(moment())}
                  />
                </Form.Item>
              </Col>
            </Row>
          </InfoCard>
          <InfoCard title={t("contact data")}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={14} flex={1}>
                <Form.Item
                  name="email"
                  label={t("email")}
                  rules={[
                    { type: "email", message: t("enter valid email") },
                    { required: true, message: t("enter email") },
                    { whitespace: true, message: t("no whitespace") },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={10}>
                <Form.Item
                  name="telefon"
                  label={t("phone")}
                  rules={[{ whitespace: true, message: t("no whitespace") }]}
                >
                  <Input type="tel" autoComplete="tel" />
                </Form.Item>
              </Col>
            </Row>
          </InfoCard>
          <InfoCard title={t("musical information")}>
            <Row gutter={[16, 16]}>
              <Col md={24} lg={12}>
                <Form.Item
                  name="experiencia_musical"
                  label={t("musical experience")}
                >
                  <TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
                </Form.Item>
              </Col>
              <Col md={24} lg={12}>
                <Form.Item name="estudis_musicals" label={t("musical studies")}>
                  <TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
                </Form.Item>
              </Col>
              {!selfCreation && (
                <Col>
                  <Form.Item name="data_alta" label={t("subscribed date")}>
                    <DatePicker
                      format="L"
                      allowClear={false}
                      disabledDate={(d) => !d || d.isAfter(moment())}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
          </InfoCard>
        </Space>
      ),
    },
    {
      key: "imatge",
      title: t("image rights"),
      selfCreationOnly: true,
      content: <AvisAcceptacio nameAvis="drets_imatge" isForm />,
    },
    {
      key: "resum",
      title: t("dashboard:summary"),
      selfCreationOnly: false,
      content: (
        <ResumAfegirSoci
          form={form}
          username={username}
          loadingUsername={loadingUsername}
        />
      ),
    },
  ];

  const stepsRef: FormStep[] = selfCreation
    ? steps
    : steps.filter((step) => !step.selfCreationOnly);

  const handleOk = (callback: () => void) => {
    form
      .validateFields()
      .then((soci) => {
        setConfirmLoading(true);

        soci.username = username;
        soci.nom = upperCaseFirst(soci.nom);
        soci.cognoms = upperCaseFirst(soci.cognoms);
        soci.naixement = soci.naixement.format(DATE_FORMAT);
        soci.data_alta = soci.data_alta
          ? soci.data_alta.format(DATE_FORMAT)
          : moment().format(DATE_FORMAT);

        postSoci(soci)
          .then(() => {
            message.success(t("entity:subscription successful"));
            if (typeof callback === "function") callback();
          })
          .finally(() => setConfirmLoading(false));
      })
      .catch(handleValidateError);
  };

  const handleValidateError = (_: Error) =>
    setCurrentPageIndex(stepsRef.findIndex(({ key }) => key === "dades"));

  const handleChange = async (pageIndex: number) => {
    if (pageIndex > stepsRef.findIndex(({ key }) => key === "dades"))
      try {
        const { nom, cognoms } = await form.validateFields();
        if (stepsRef[pageIndex].key === "resum") getUsername({ nom, cognoms });
      } catch (error) {
        handleValidateError(error);
        return;
      }

    setCurrentPageIndex(pageIndex);
  };

  const next = async () => await handleChange(currentPageIndex + 1);

  const previous = async () => await handleChange(currentPageIndex - 1);

  const footerActions = [
    <div key="footer" style={{ display: "flex" }}>
      <div style={{ flex: 1, textAlign: "start" }}>
        {currentPageIndex > 0 && (
          <Button key="previous" onClick={previous}>
            {t("prev")}
          </Button>
        )}
      </div>
      <Space>
        {currentPageIndex < stepsRef.length - 1 ? (
          <Button key="next" type="primary" onClick={next}>
            {stepsRef[currentPageIndex].key === "proteccio"
              ? t("entity:agree with the terms")
              : t("next")}
          </Button>
        ) : (
          <Button
            key="ok"
            type="primary"
            onClick={() => handleOk(onSuccessCallback)}
            loading={confirmLoading || loadingPostSoci}
          >
            {t("modals:subscription action")}
          </Button>
        )}
      </Space>
    </div>,
  ];

  return {
    steps: stepsRef,
    form,
    footerActions,
    handleChange,
    currentPageIndex,
    setCurrentPageIndex,
    username,
  };
};
