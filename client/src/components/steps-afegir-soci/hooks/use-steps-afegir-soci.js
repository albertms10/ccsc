import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";
import { SettingCard } from "../../../standalone/setting-card";
import { SubHeader } from "../../../standalone/sub-header";
import { upperCaseFirst } from "../../../utils";
import { ProteccioDades } from "../../proteccio-dades";
import { ResumAfegirSoci } from "../components/resum-afegir-soci";
import { usePaisos, useUsername } from "./index";

const { Option } = Select;
const { TextArea } = Input;
const { Paragraph } = Typography;

export const textProteccioDades = (
  <>
    <Paragraph>
      D’acord amb l’article 5 de la Llei orgànica 15/1999 de protecció de dades
      de caràcter personal, les vostres dades seran incorporades i tractades al
      fitxer intern el qual és responsable l’Associació Musical Catalana
      Crescendo.
    </Paragraph>
    <Paragraph>
      La finalitat és poder dur a terme les tasques de gestió de l’associació,
      oferir informació relacionada amb l’organització i actuació del Cor de
      Cambra Sant Cugat, informar de la gestió dels òrgans de govern compartir
      la documentació que es derivi de caràcter institucional o material
      formatiu que pugui resultar de l’interès dels associats sempre relacionat
      amb la finalitat de l’entitat.
    </Paragraph>
    <Paragraph>
      Podeu exercir els drets d’accés, rectificació, cancel·lació i oposició
      mitjançant un escrit adreçat a{" "}
      <Tag style={{ marginRight: 2 }}>
        <a href="mailto:secretaria@cordecambrasantcugat.cat">
          secretaria@cordecambrasantcugat.cat
        </a>
      </Tag>
      .
    </Paragraph>
  </>
);

export const textDretsImatge = (
  <Paragraph>
    Atès que el dret a la imatge es troba regulat per l’article 18.1 de la
    Constitució, per la Llei Orgànica 1/1982 sobre el dret a l’honor, a la
    intimitat personal i familiar, i per la Llei Orgànica 15/1999 de Protecció
    de Dades de Caràcter Personal, sol·licitem el seu consentiment per publicar
    la seva imatge o veu, de forma clarament identificable, en fotografies i
    gravacions corresponents a les activitats pròpies de l'associació, i que
    s’exposin públicament a la pàgina web, revistes, YouTube o altres
    publicacions internes o de tercers, així com a reproduir-la públicament per
    a la promoció de les activitats i serveis de les entitats. El present
    consentiment i autorització s’atorga de forma gratuïta i amb renúncia formal
    a qualsevol contraprestació econòmica.
  </Paragraph>
);

export default (
  onSuccessCallback,
  selfCreation = false,
  fetchURL = "/api/socis"
) => {
  const dispatch = useDispatch();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [acceptaDretsImatge, setAcceptaDretsImatge] = useState(false);
  const [username, loadingUsername, getUsername] = useUsername();

  const [dniValidation, setDniValidation] = useState("");
  const [paisos, loadingPaisos] = usePaisos();
  const [selectedPais, setSelectedPais] = useState("");

  const [form] = Form.useForm();

  // TODO Extreure la lògica a `utils` i retornar una `Promise`
  const validatorDniES = useCallback((rule, value) => {
    const XIFRES = 8;

    const letter = value ? value.charAt(value.length - 1) : "";
    if (letter.match(/^[a-z]+$/))
      return Promise.reject("Introdueixi la lletra amb majúscules.");

    const number = parseInt(value.substr(0, value.length - 1));
    const letters = "TRWAGMYFPDXBNJZSQVHLCKE";

    if (number.toString().length === XIFRES) {
      if (value === number + letters[number % letters.length]) {
        setDniValidation("success");
        return Promise.resolve();
      }
    } else {
      return Promise.reject(`El número ha de ser de ${XIFRES} xifres.`);
    }

    setDniValidation("error");
    return Promise.reject("La lletra no es correspon amb el número del DNI.");
  }, []);

  /** @type {FormStep[]} */
  const steps = [
    {
      key: "proteccio",
      title: "Protecció de dades",
      selfCreationOnly: true,
      content: <ProteccioDades />,
    },
    {
      key: "dades",
      title: "Dades del soci",
      selfCreationOnly: false,
      content: (
        <Space size="middle" direction="vertical">
          <Card>
            <SubHeader title="Dades personals" />
            <Divider />
            <Row type="flex" gutter={[16, 16]}>
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
                  name="nacionalitat"
                  label="País de nacionalitat"
                  rules={[
                    {
                      required: true,
                      message: "Selecciona el país de nacionalitat",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    loading={loadingPaisos}
                    onSelect={(value) => setSelectedPais(value)}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {paisos.map((pais) => (
                      <Option key={pais.id_pais}>{pais.nom}</Option>
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
          </Card>
          <Card>
            <SubHeader title="Dades de contacte" />
            <Divider />
            <Row type="flex" gutter={[16, 16]}>
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
          </Card>
          <Card>
            <SubHeader title="Informació musical" />
            <Divider />
            <Row type="flex" gutter={[16, 16]}>
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
              {!selfCreation ? (
                <Col>
                  <Form.Item name="data_alta" label="Data d’alta">
                    <DatePicker
                      format="L"
                      allowClear={false}
                      disabledDate={(d) => !d || d.isAfter(moment())}
                    />
                  </Form.Item>
                </Col>
              ) : (
                ""
              )}
            </Row>
          </Card>
        </Space>
      ),
    },
    {
      key: "imatge",
      title: "Drets d’imatge",
      selfCreationOnly: true,
      content: <SettingCard title="Drets d’imatge" info={textDretsImatge} />,
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
          acceptaProteccioDades={selfCreation}
          acceptaDretsImatge={acceptaDretsImatge}
        />
      ),
    },
  ];

  /** @type {FormStep[]} */
  const stepsRef = selfCreation
    ? steps
    : steps.filter((step) => !step.selfCreationOnly);

  const handleOk = (callback) => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);

        values.accepta_proteccio_dades = selfCreation;
        values.accepta_drets_imatge = selfCreation ? acceptaDretsImatge : false;

        values.acceptacions.drets_imatge = selfCreation
          ? acceptaDretsImatge
          : false;
        values.username = username;
        values.nom = upperCaseFirst(values.nom);
        values.cognoms = upperCaseFirst(values.cognoms);
        values.naixement = values.naixement.format("YYYY-MM-DD");
        values.data_alta = values.data_alta
          ? values.data_alta.format("YYYY-MM-DD")
          : moment().format("YYYY-MM-DD");

        fetchAPI(
          fetchURL,
          () => {
            message.success("S’ha realitzat l’alta de soci correctament.");
            if (typeof callback === "function") callback();
          },
          dispatch,
          { method: "POST", body: JSON.stringify(values) }
        ).finally(() => setConfirmLoading(false));
      })
      .catch(handleValidateError);
  };

  const handleValidateError = (_) => {
    console.log(_);
    setCurrentPageIndex(stepsRef.findIndex(({ key }) => key === "dades"));
  };

  const handleChange = async (pageIndex) => {
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
        {currentPageIndex > 0 ? (
          <Button key="previous" onClick={previous}>
            Anterior
          </Button>
        ) : (
          ""
        )}
      </div>
      <Space>
        {selfCreation && stepsRef[currentPageIndex].key === "imatge" ? (
          <Button
            key="next"
            onClick={() => next().then(() => setAcceptaDretsImatge(false))}
          >
            No accepto
          </Button>
        ) : (
          ""
        )}
        {currentPageIndex < stepsRef.length - 1 ? (
          <Button
            key="next"
            type="primary"
            onClick={() =>
              next().then(() => selfCreation && setAcceptaDretsImatge(true))
            }
          >
            {stepsRef[currentPageIndex].key === "proteccio" ||
            stepsRef[currentPageIndex].key === "imatge"
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
