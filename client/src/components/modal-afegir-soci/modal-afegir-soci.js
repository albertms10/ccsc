import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { StepsAfegirSoci } from "../steps-afegir-soci";
import { useStepsAfegirSoci } from "../steps-afegir-soci/hooks";

export default ({ getSocis }) => {
  const [visible, setVisible] = useState(false);
  const {
    steps,
    form,
    footerActions,
    handleChange,
    currentPageIndex,
    setCurrentPageIndex,
    alertProteccio,
    setAlertProteccio,
    username,
    loadingUsername,
  } = useStepsAfegirSoci(() =>
    getSocis(() => {
      setVisible(false);
      setCurrentPageIndex(0);
      form.resetFields();
    })
  );

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
        footer={footerActions}
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
