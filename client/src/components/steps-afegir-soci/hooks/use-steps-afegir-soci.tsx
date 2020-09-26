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
import { AvisAcceptacio } from "components/avis-acceptacio";
import { FormAfegirSoci } from "components/steps-afegir-soci";
import { DATE_FORMAT } from "constants/constants";
import { useAPI, usePostAPI } from "helpers";
import { Pais } from "model";
import moment from "moment";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { InfoCard } from "standalone/info-card";
import { personIdCheck, personIdMatchers } from "utils/misc";
import { upperCaseFirst } from "utils/strings";
import { ResumAfegirSoci } from "../components/resum-afegir-soci";
import { useUsername } from "./index";

const { Option } = Select;
const { TextArea } = Input;

export interface FormStep {
  key: "protection" | "data" | "image" | "summary";
  title: string;
  selfCreationOnly: boolean;
  content: React.ReactNode;
}

export default (
  onSuccessCallback: () => void,
  selfCreation = false,
  fetchURL = "/socis"
) => {
  const { t } = useTranslation(["validation", "fields"]);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [dniValidateStatus, setDniValidateStatus] = useState<ValidateStatus>(
    ""
  );
  const [selectedPais, setSelectedPais] = useState<Pais["nom"]>("");

  const [paisos, loadingPaisos] = useAPI<Pais[]>("/localitzacions/paisos", []);
  const [loadingPostSoci, postSoci] = usePostAPI<
    FormAfegirSoci & { username: string }
  >(fetchURL);

  const [username, loadingUsername, getUsername] = useUsername();

  const [form] = Form.useForm<FormAfegirSoci>();

  const personIDValidator = useCallback(
    async (rule, value) => {
      try {
        const result = await personIdCheck(value);

        if (result) setDniValidateStatus(result.status);

        return Promise.resolve();
      } catch (e) {
        let res;

        if (e) {
          setDniValidateStatus(e.status);
          res = t(e.reason || "", e.options);
        }

        return Promise.reject(res);
      }
    },
    [t]
  );

  const stepProtection: FormStep = useMemo(
    () => ({
      key: "protection",
      title: t("fields:data protection"),
      selfCreationOnly: true,
      content: <AvisAcceptacio nameAvis="proteccio_dades" isForm />,
    }),
    [t]
  );

  const validateStatus = useMemo(
    () =>
      personIdMatchers.find((matcher) => matcher.state === selectedPais)
        ? dniValidateStatus
        : "",
    [selectedPais, dniValidateStatus]
  );

  const stepData: FormStep = useMemo(
    () => ({
      key: "data",
      title: t("fields:partner data"),
      selfCreationOnly: false,
      content: (
        <Space size="middle" direction="vertical">
          <InfoCard title={t("fields:personal data")}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={10}>
                <Form.Item
                  name="nom"
                  label={t("fields:name")}
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
                  label={t("fields:surname")}
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
                  label={t("fields:country of nationality")}
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
                      !!option &&
                      option.children
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
                  label={t("fields:person id")}
                  hasFeedback
                  validateStatus={validateStatus}
                  rules={[
                    { required: true, message: t("enter person id") },
                    { whitespace: true, message: t("enter person id") },
                    { validator: personIDValidator },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item
                  name="naixement"
                  label={t("fields:birth date")}
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
          <InfoCard title={t("fields:contact data")}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={14} flex={1}>
                <Form.Item
                  name="email"
                  label={t("fields:email address")}
                  rules={[
                    {
                      type: "email",
                      message: t("enter valid email address"),
                    },
                    { required: true, message: t("enter email address") },
                    { whitespace: true, message: t("no whitespace") },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={10}>
                <Form.Item
                  name="telefon"
                  label={t("fields:phone")}
                  rules={[{ whitespace: true, message: t("no whitespace") }]}
                >
                  <Input type="tel" autoComplete="tel" />
                </Form.Item>
              </Col>
            </Row>
          </InfoCard>
          <InfoCard title={t("fields:musical information")}>
            <Row gutter={[16, 16]}>
              <Col md={24} lg={12}>
                <Form.Item
                  name="experiencia_musical"
                  label={t("fields:musical experience")}
                >
                  <TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
                </Form.Item>
              </Col>
              <Col md={24} lg={12}>
                <Form.Item
                  name="estudis_musicals"
                  label={t("fields:musical studies")}
                >
                  <TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
                </Form.Item>
              </Col>
              {!selfCreation && (
                <Col>
                  <Form.Item
                    name="data_alta"
                    label={t("fields:subscribed date")}
                  >
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
    }),
    [t, loadingPaisos, paisos, personIDValidator, selfCreation, validateStatus]
  );

  const stepImage: FormStep = useMemo(
    () => ({
      key: "image",
      title: t("fields:image rights"),
      selfCreationOnly: true,
      content: <AvisAcceptacio nameAvis="drets_imatge" isForm />,
    }),
    [t]
  );

  const stepSummary: FormStep = useMemo(
    () => ({
      key: "summary",
      title: t("dashboard:summary"),
      selfCreationOnly: false,
      content: (
        <ResumAfegirSoci
          form={form}
          username={username}
          loadingUsername={loadingUsername}
        />
      ),
    }),
    [t, form, username, loadingUsername]
  );

  const steps: FormStep[] = useMemo(
    () => [stepProtection, stepData, stepImage, stepSummary],
    [stepProtection, stepData, stepImage, stepSummary]
  );

  const filteredSteps: FormStep[] = useMemo(
    () =>
      selfCreation ? steps : steps.filter((step) => !step.selfCreationOnly),
    [steps, selfCreation]
  );

  const handleValidateError = useCallback(
    (e: Error) => {
      if (e.toString() !== "[object Object]") message.warning(e.toString());
      setCurrentPageIndex(filteredSteps.findIndex(({ key }) => key === "data"));
    },
    [filteredSteps]
  );

  const handleOk = useCallback(
    (callback: () => void) => {
      form
        .validateFields()
        .then((soci) => {
          setConfirmLoading(true);

          postSoci({
            ...(soci as FormAfegirSoci),
            username,
            nom: upperCaseFirst(soci.nom),
            cognoms: upperCaseFirst(soci.cognoms),
            dni: soci.dni.toUpperCase(),
            naixement: soci.naixement.format(DATE_FORMAT),
            data_alta: (soci.data_alta || moment()).format(DATE_FORMAT),
          })
            .then(() => {
              message.success(t("entity:subscription successful"));
              if (typeof callback === "function") callback();
            })
            .finally(() => setConfirmLoading(false));
        })
        .catch(handleValidateError);
    },
    [t, form, handleValidateError, postSoci, username]
  );

  const handleChange = useCallback(
    async (pageIndex: number) => {
      if (pageIndex > filteredSteps.findIndex(({ key }) => key === "data"))
        try {
          const { nom, cognoms } = await form.validateFields();

          if (filteredSteps[pageIndex].key === "summary")
            getUsername({ nom, cognoms });
        } catch (e) {
          handleValidateError(e);
          return;
        }

      setCurrentPageIndex(pageIndex);
    },
    [filteredSteps, form, getUsername, handleValidateError]
  );

  const next = useCallback(
    async () => await handleChange(currentPageIndex + 1),
    [currentPageIndex, handleChange]
  );

  const previous = useCallback(
    async () => await handleChange(currentPageIndex - 1),
    [currentPageIndex, handleChange]
  );

  const footerActions = useMemo(
    () => [
      <div key="footer" style={{ display: "flex" }}>
        <div style={{ flex: 1, textAlign: "start" }}>
          {currentPageIndex > 0 && (
            <Button key="previous" onClick={previous}>
              {t("common:prev")}
            </Button>
          )}
        </div>
        <Space>
          {currentPageIndex < filteredSteps.length - 1 ? (
            <Button key="next" type="primary" onClick={next}>
              {t(
                filteredSteps[currentPageIndex].key === "protection"
                  ? "entity:agree with the terms"
                  : "common:next"
              )}
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
    ],
    [
      confirmLoading,
      currentPageIndex,
      filteredSteps,
      handleOk,
      loadingPostSoci,
      next,
      onSuccessCallback,
      previous,
      t,
    ]
  );

  return {
    steps: filteredSteps,
    form,
    footerActions,
    handleChange,
    currentPageIndex,
    setCurrentPageIndex,
    username,
  };
};
