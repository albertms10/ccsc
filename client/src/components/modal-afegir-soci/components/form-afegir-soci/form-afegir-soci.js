import React, { useEffect, useState } from 'react';
import { Alert, Collapse, DatePicker, Descriptions, Divider, Form, Input, Select, Spin, Switch } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

export default ({ form, current, username, loadingUsername, alertProteccio, setAlertProteccio }) => {
  const [dniValidation, setDniValidation] = useState('');

  const [loadingPaisos, setLoadingPaisos] = useState(false);
  const [paisos, setPaisos] = useState([]);
  const [pais, setPais] = useState('');

  useEffect(() => {
    setLoadingPaisos(true);
    fetch('/api/localitzacions/paisos')
      .then(res => res.json())
      .then(data => {
        setPaisos(data);
        setLoadingPaisos(false);
      });
  }, []);

  const validatorDniES = (rule, value) => {
    const XIFRES = 8;

    const letter = value.charAt(value.length - 1);
    if (letter.match(/^[a-z]+$/))
      return Promise.reject('Introdueixi la lletra amb majúscules.');

    const number = parseInt(value.substr(0, value.length - 1));
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';

    if (number.toString().length === XIFRES) {
      if (value === number + letters[number % letters.length]) {
        setDniValidation('success');
        return Promise.resolve();
      }
    } else {
      return Promise.reject(`El número ha de ser de ${XIFRES} xifres.`);
    }

    setDniValidation('error');
    return Promise.reject('La lletra no es correspon amb el número del DNI.');
  };

  return (
    <Form
      colon={false}
      form={form}
      initialValues={{ data_alta: moment() }}
    >
      <div style={{ display: current === 0 ? 'block' : 'none' }}>
        <Divider orientation="left">Dades personals</Divider>
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            name="nom"
            label="Nom"
            style={{ display: 'inline-block', width: 'calc(30% - .5rem)', marginRight: '1rem' }}
            rules={[
              { required: true, message: 'Si us plau, introdueixi el seu nom.' },
              { whitespace: true, message: 'Si us plau, introdueixi el seu nom.' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="cognoms"
            label="Cognoms"
            style={{ display: 'inline-block', width: 'calc(70% - .5rem)' }}
            rules={[
              { required: true, message: 'Si us plau, introdueixi els seus cognoms.' },
              { whitespace: true, message: 'Si us plau, introdueixi els seus cognoms.' },
            ]}>
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            name="nacionalitat"
            label="País de nacionalitat"
            style={{ display: 'inline-block', width: 'calc(30% - .5rem)', marginRight: '1rem' }}
            rules={[
              { required: true, message: 'Si us plau, seleccioneu un país de nacionalitat.' },
            ]}>
            <Select
              showSearch
              loading={loadingPaisos}
              onSelect={value => setPais(value)}
            >
              {paisos.map(pais => <Option key={pais.id_pais}>{pais.nom}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            name="dni"
            label="DNI"
            hasFeedback
            validateStatus={pais === 'es' ? dniValidation : ''}
            style={{ display: 'inline-block', width: '45%', marginRight: '1rem' }}
            rules={[
              { required: true, message: 'Si us plau, introdueixi el seu DNI.' },
              { whitespace: true, message: 'Si us plau, introdueixi el seu DNI.' },
              pais === 'es' ? { validator: validatorDniES } : {},
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="naixement"
            label="Naixement"
            style={{ display: 'inline-block' }}
            rules={[
              { required: true, message: 'Si us plau, introdueixi la seva data de naixement.' },
            ]}>
            <DatePicker
              format="L"
              allowClear={false}
              showToday={false}
              disabledDate={d => !d || d.isAfter(moment())}
            />
          </Form.Item>
        </Form.Item>
        <Divider orientation="left" style={{ marginTop: '2rem' }}>Dades de contacte</Divider>
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            name="email"
            label="Adreça electrònica"
            style={{ display: 'inline-block', width: 'calc(60% - .5rem)', marginRight: '1rem' }}
            rules={[
              { type: 'email', message: 'Si us plau, introdueixi una adreça electrònica vàlida.' },
              { required: true, message: 'Si us plau, introdueixi la seva adreça electrònica.' },
              { whitespace: true, message: 'Si us plau, introdueixi la seva adreça electrònica.' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="telefon"
            label="Telèfon"
            style={{ display: 'inline-block', width: 'calc(40% - .5rem)' }}
            rules={[
              { whitespace: true, message: 'Si us plau, introdueixi un número de telèfon vàlid.' },
            ]}>
            <Input type="number" />
          </Form.Item>
        </Form.Item>
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        >
          <Panel header="Més informació" key="mes_info" style={{ borderBottom: 'none' }}>
            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                name="experiencia_musical"
                label="Experiència musical"
                style={{ display: 'inline-block', width: 'calc(50% - .5rem)', marginRight: '1rem' }}
              >
                <TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
              </Form.Item>
              <Form.Item
                name="estudis_musicals"
                label="Estudis musicals"
                style={{ display: 'inline-block', width: 'calc(50% - .5rem)' }}
              >
                <TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
              </Form.Item>
            </Form.Item>
            <Form.Item
              name="data_alta"
              label="Data d’alta"
            >
              <DatePicker
                format="L"
                allowClear={false}
                disabledDate={d => !d || d.isAfter(moment())}
              />
            </Form.Item>
          </Panel>
        </Collapse>
      </div>
      <div style={{ display: current === 1 ? 'block' : 'none' }}>
        <div className="text-block">
          D’acord amb l’article 5 de la Llei orgànica 15/1999 de protecció de dades de caràcter personal, les
          vostres dades seran incorporades i tractades al fitxer intern el qual és responsable l'Associació
          Musical
          Catalana Crescendo. La finalitat és poder portar a termer les tasques de gestió de l'associació, oferir
          informació relacionada amb l'organització i actuació del Cor de Cambra Sant Cugat, informar de la gestió
          dels òrgans de govern compartir la documentació que s'enderivi de carácter institucional o material
          formatiu que pugui resultar de l'interés dels associats sempre relacionat amb la finalitat de l'entitat.
          Podeu exercir els drets d’accés, rectificació, cancel·lació i oposició mitjançant un escrit adreçat a <a
          href="mailto:secretaria@cordecambrasantcugat.cat">secretaria@cordecambrasantcugat.cat</a>.
        </div>
        <Form.Item className="switch" name="acceptaProteccioDades" valuePropName="checked" wrapperCol={{}}>
          <Switch checkedChildren="Accepto" unCheckedChildren="No accepto" onChange={checked => {
            if (!checked) setAlertProteccio(true);
            else setAlertProteccio(false);
          }} />
        </Form.Item>
        {alertProteccio ? <Alert message="Heu d’acceptar la protecció de dades." type="error" /> : ''}
      </div>
      <div style={{ display: current === 2 ? 'block' : 'none' }}>
        <div className="text-block">
          Atès que el dret a la imatge es troba regulat per l'article 18.1 de la Constitució, per la Llei Orgànica
          1/1982 sobre el dret a l'honor, a la intimitat personal i familiar, i per la Llei Orgànica 15/1999 de
          Protecció de Dades de Caràcter Personal, sol·licitem el seu consentiment per publicar les seva imatge o
          veu, de forma clarament identificable, en fotografies i gravacions corresponents a les activitats
          pròpies
          de l'associació, i que s’exposin públicament a la pàgina web, revistes, YouTube o altres publicacions
          internes o de tercers, així com a reproduir-la públicament per a la promoció de les activitats i serveis
          de les entitats. El present consentiment i autorització s'atorga de forma gratuïta i amb renúncia formal
          a
          qualsevol contraprestació econòmica.
        </div>
        <Form.Item className="switch" name="acceptaDretsImatge" valuePropName="checked" wrapperCol={{}}>
          <Switch checkedChildren="Accepto" unCheckedChildren="No accepto" />
        </Form.Item>
      </div>
      {current === 3 &&
      <ResumSoci data={form.getFieldsValue()} username={username} loadingUsername={loadingUsername} />}
    </Form>
  );
};

const ResumSoci = ({ data, username, loadingUsername }) => {
  return (
    <>
      <Divider orientation="left">Dades personals</Divider>
      <Descriptions size="small">
        <Descriptions.Item label="Nom">{`${data.nom} ${data.cognoms}`}</Descriptions.Item>
        <Descriptions.Item label="Usuari">{
          loadingUsername
            ? <Spin size="small" />
            : username
        }</Descriptions.Item>
        <Descriptions.Item label="DNI">{data.dni}</Descriptions.Item>
        <Descriptions.Item label="Naixement" span={2}>
          {data.naixement && data.naixement.format('LL')}
        </Descriptions.Item>
      </Descriptions>
      {data.experiencia_musical || data.estudis_musicals || data.data_alta
        ? (
          <>
            <Divider orientation="left" style={{ marginTop: '2rem' }}>Informació musical</Divider>
            <Descriptions size="small">
              {data.experiencia_musical ?
                <Descriptions.Item label="Experiència musical"
                                   span={3}>{data.experiencia_musical}</Descriptions.Item> : ''}
              {data.estudis_musicals ?
                <Descriptions.Item label="Estudis musicals" span={3}>{data.estudis_musicals}</Descriptions.Item> : ''}
              {data.data_alta ?
                <Descriptions.Item label="Data d’alta">{data.data_alta.format('LL')}</Descriptions.Item> : ''}
            </Descriptions>
          </>
        )
        : ''
      }
      <Divider orientation="left" style={{ marginTop: '2rem' }}>Dades de contacte</Divider>
      <Descriptions size="small">
        <Descriptions.Item label="Adreça electrònica" span={2}>{data.email}</Descriptions.Item>
        {data.telefon ? <Descriptions.Item label="Telèfon">{data.telefon}</Descriptions.Item> : ''}
      </Descriptions>
      <Divider orientation="left" style={{ marginTop: '2rem' }}>Acceptacions</Divider>
      <Descriptions size="small">
        <Descriptions.Item label="Protecció de dades">
          {data.acceptaProteccioDades ? 'Sí' : 'No'}
        </Descriptions.Item>
        <Descriptions.Item label="Drets d’imatge">
          {data.acceptaDretsImatge ? 'Sí' : 'No'}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
