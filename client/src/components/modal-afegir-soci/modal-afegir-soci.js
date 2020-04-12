import React, { useState } from 'react';
import { Button, Form, message, Modal, Steps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { FormAfegirSoci } from './components/form-afegir-soci';
import { stripAccents } from '../../utils';
import './modal-afegir-soci.css';

const { Step } = Steps;

export default ({ getSocis }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setConfirmLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [username, setUsername] = useState('');
  const [loadingUsername, setLoadingUsername] = useState(false);
  const [alertProteccio, setAlertProteccio] = useState(false);

  const [form] = Form.useForm();
  const steps = ['Dades del soci', 'Protecció de dades', 'Drets d’imatge', 'Resum'];

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (values.acceptaProteccioDades) {
        setConfirmLoading(true);

        values.username = username;
        values.acceptaDretsImatge = !!values.acceptaDretsImatge;
        values.naixement = values.naixement.format('YYYY-MM-DD');
        values.data_alta = values.data_alta.format('YYYY-MM-DD');

        fetch('/api/socis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        }).then(res => {
          setConfirmLoading(false);
          if (res.ok) {
            setVisible(false);
            message.success(`El soci s'ha afegit correctament.`);
            getSocis(() => {
              setCurrent(0);
              form.resetFields();
            });
          } else {
            message.error(`Hi ha hagut un error en la consulta: ${res.status} ${res.statusText}`);
          }
        });
      } else {
        handleErrorProteccio();
      }
    }).catch(handleValidateError);
  };

  const handleValidateError = error => {
    setCurrent(0);
    console.log(error);
  };

  const handleErrorProteccio = () => {
    setCurrent(1);
    setAlertProteccio(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = async current => {
    try {
      const data = await form.validateFields();

      if (current > 1 && !data.acceptaProteccioDades) {
        handleErrorProteccio();
        return;
      }

      if (current === 3) await generateUsername({ nom: data.nom, cognoms: data.cognoms });
    } catch (error) {
      handleValidateError(error);
      return;
    }

    setCurrent(current);
  };

  const next = () => {
    handleChange(current + 1);
  };

  const previous = () => {
    handleChange(current - 1);
  };

  const generateUsername = async ({ nom, cognoms }) => {
    setLoadingUsername(true);

    const username = stripAccents(
      nom
        .split(' ')
        .map((n, i) => i > 0 ? n[0] : n)
        .join('')
        .toLowerCase()
      + cognoms
        .split(' ')
        .map(n => n[0] === n[0].toUpperCase() ? n[0] : '')
        .join('')
        .toLowerCase(),
    );

    fetch(`/api/usuaris/${username}/first-available-num`)
      .then(res => res.json())
      .then(data => {
        const count = data[0] ? parseInt(data[0].first_available_num) : 0;
        setUsername(`${username}${count > 0 ? count : ''}`);
        setLoadingUsername(false);
      });
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Afegeix un soci
      </Button>
      <Modal
        title="Afegir soci"
        width={720}
        onCancel={handleCancel}
        visible={visible}
        footer={[
          current > 0 ? (<Button key="previous" onClick={previous}>Anterior</Button>) : '',
          current < steps.length - 1
            ? (<Button key="next" type="primary" onClick={next}>Següent</Button>)
            : (<Button key="ok" type="primary" onClick={handleOk} loading={loading}>Afegeix</Button>),
        ]}>
        <Steps current={current} size="small" onChange={handleChange}>
          {steps.map(step => <Step key={step} title={step} />)}
        </Steps>
        <div className="steps-content">
          <FormAfegirSoci
            form={form}
            current={current}
            username={username}
            loadingUsername={loadingUsername}
            alertProteccio={alertProteccio}
            setAlertProteccio={setAlertProteccio} />
        </div>
      </Modal>
    </>
  );
};
