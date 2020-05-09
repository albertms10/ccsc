import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { StepsAfegirSoci } from "../steps-afegir-soci";
import { useStepsAfegirSoci } from "../steps-afegir-soci/components/hooks";
import "./modal-afegir-soci.css";

const steps = [
  "Dades del soci",
  "Protecció de dades",
  "Drets d’imatge",
  "Resum",
];

export default ({ getSocis }) => {
  const [visible, setVisible] = useState(false);
  const {
    form,
    handleOk,
    handleChange,
    currentPageIndex,
    setCurrentPageIndex,
    confirmLoading,
    alertProteccio,
    setAlertProteccio,
    username,
    loadingUsername,
    next,
    previous,
  } = useStepsAfegirSoci();

  const showModal = () => setVisible(true);

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Afegeix un soci
      </Button>
      <Modal
        title="Afegir soci"
        width={720}
        onCancel={() => setVisible(false)}
        visible={visible}
        footer={[
          currentPageIndex > 0 ? (
            <Button key="previous" onClick={previous}>
              Anterior
            </Button>
          ) : (
            ""
          ),
          currentPageIndex < steps.length - 1 ? (
            <Button key="next" type="primary" onClick={next}>
              Següent
            </Button>
          ) : (
            <Button
              key="ok"
              type="primary"
              onClick={() =>
                handleOk(() =>
                  getSocis(() => {
                    setVisible(false);
                    setCurrentPageIndex(0);
                    form.resetFields();
                  })
                )
              }
              loading={confirmLoading}
            >
              Afegeix
            </Button>
          ),
        ]}
      >
        <StepsAfegirSoci
          steps={steps}
          form={form}
          currentPageIndex={currentPageIndex}
          handleChange={handleChange}
          username={username}
          loadingUsername={loadingUsername}
          alertProteccio={alertProteccio}
          setAlertProteccio={setAlertProteccio}
        />
      </Modal>
    </>
  );
};
