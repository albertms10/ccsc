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
import { useDispatch } from "react-redux";
import { DATE_FORMAT } from "../../../constants/constants";
import { fetchAPI, useAPI } from "../../../helpers";
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
  onSuccessCallback: Function,
  selfCreation = false,
  fetchURL = "/socis"
) => {
  const dispatch = useDispatch();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [username, loadingUsername, getUsername] = useUsername();

  const [dniValidation, setDniValidation] = useState<ValidateStatus>("");
  const [paisos, loadingPaisos] = useAPI<Pais[]>("/localitzacions/paisos", []);
  const [selectedPais, setSelectedPais] = useState("");

  const [form] = Form.useForm();

  // TODO Extreure la lògica a `utils` i retornar una `Promise`
  const validatorDniES = useCallback((rule, value: string) => {
    const XIFRES = 8;

    const letter = value ? value.charAt(value.length - 1) : "";
    if (letter.match(/^[a-z]+$/)) {
      setDniValidation("warning");
      return Promise.reject("Introdueixi la lletra amb majúscules.");
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
      return Promise.reject(`El número ha de ser de ${XIFRES} xifres.`);
    }

    setDniValidation("error");
    return Promise.reject("La lletra no es correspon amb el número del DNI.");
  }, []);

  const steps: FormStep[] = [
    {
      key: "proteccio",
      title: "Protecció de dades",
      selfCreationOnly: true,
      content: <AvisAcceptacio nameAvis="proteccio_dades" isForm />,
    },
    {
      key: "dades",
      title: "Dades del soci",
      selfCreationOnly: false,
      content: (
        <Space size="middle" direction="vertical">
          <InfoCard title="Dades personals">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={10}>
                <Form.Item
                  name="nom"
                  label="Nom"
                  rules={[
                    { required: true, message: "Introdueix el nom" },
                    { whitespace: true, message: "Introdueix el nom" },
                  ]}
                >
                  <Input autoComplete="given-name" autoFocus />
                </Form.Item>
              </Col>
              <Col xs={24} sm={14} flex={1}>
                <Form.Item
                  name="cognoms"
                  label="Cognoms"
                  rules={[
                    { required: true, message: "Introdueix els cognoms" },
                    { whitespace: true, message: "Introdueix els cognoms" },
                  ]}
                >
                  <Input autoComplete="family-name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="id_pais"
                  label="País de nacionalitat"
                  rules={[
                    {
                      required: true,
                      message: "Selecciona el país de nacionalitat",
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
                  label="DNI"
                  hasFeedback
                  validateStatus={selectedPais === "es" ? dniValidation : ""}
                  rules={[
                    { required: true, message: "Introdueix el DNI" },
                    { whitespace: true, message: "Introdueix el DNI" },
                    selectedPais === "es" ? { validator: validatorDniES } : {},
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item
                  name="naixement"
                  label="Naixement"
                  rules={[
                    {
                      required: true,
                      message: "Introdueix la data de naixement",
                    },
                  ]}
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
          <InfoCard title="Dades de contacte">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={14} flex={1}>
                <Form.Item
                  name="email"
                  label="Adreça electrònica"
                  rules={[
                    {
                      type: "email",
                      message: "Introdueix una adreça electrònica vàlida",
                    },
                    {
                      required: true,
                      message: "Introdueix l’adreça electrònica",
                    },
                    {
                      whitespace: true,
                      message: "Introdueix l’adreça electrònica",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={10}>
                <Form.Item
                  name="telefon"
                  label="Telèfon"
                  rules={[
                    {
                      whitespace: true,
                      message: "Introdueix un número de telèfon sense espais",
                    },
                  ]}
                >
                  <Input type="tel" autoComplete="tel" />
                </Form.Item>
              </Col>
            </Row>
          </InfoCard>
          <InfoCard title="Informació musical">
            <Row gutter={[16, 16]}>
              <Col md={24} lg={12}>
                <Form.Item
                  name="experiencia_musical"
                  label="Experiència musical"
                >
                  <TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
                </Form.Item>
              </Col>
              <Col md={24} lg={12}>
                <Form.Item label="Estudis musicals" name="estudis_musicals">
                  <TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
                </Form.Item>
              </Col>
              {!selfCreation && (
                <Col>
                  <Form.Item name="data_alta" label="Data d’alta">
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
      title: "Drets d’imatge",
      selfCreationOnly: true,
      content: <AvisAcceptacio nameAvis="drets_imatge" isForm />,
    },
    {
      key: "resum",
      title: "Resum",
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

  const handleOk = (callback: Function) => {
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

        fetchAPI(
          fetchURL,
          () => {
            message.success("S’ha realitzat l’alta de soci correctament.");
            if (typeof callback === "function") callback();
          },
          dispatch,
          { method: "POST", body: JSON.stringify(soci) }
        ).finally(() => setConfirmLoading(false));
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
            Anterior
          </Button>
        )}
      </div>
      <Space>
        {currentPageIndex < stepsRef.length - 1 ? (
          <Button key="next" type="primary" onClick={next}>
            {stepsRef[currentPageIndex].key === "proteccio"
              ? "Ho he llegit i dono el meu consentiment"
              : "Següent"}
          </Button>
        ) : (
          <Button
            key="ok"
            type="primary"
            onClick={() => handleOk(onSuccessCallback)}
            loading={confirmLoading}
          >
            Donar d’alta
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
