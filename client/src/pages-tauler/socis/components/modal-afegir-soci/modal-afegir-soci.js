import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StepsAfegirSoci } from "../../../../components/steps-afegir-soci";
import { useStepsAfegirSoci } from "../../../../components/steps-afegir-soci/hooks";
import { fetchSocis } from "../../../../store/socis/thunks";

export default () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const {
    steps,
    form,
    footerActions,
    handleChange,
    currentPageIndex,
    setCurrentPageIndex,
  } = useStepsAfegirSoci(() => {
    dispatch(fetchSocis());
    setVisible(false);
    setCurrentPageIndex(0);
    form.resetFields();
  });

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
      >
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
        />
      </Modal>
    </>
  );
};
