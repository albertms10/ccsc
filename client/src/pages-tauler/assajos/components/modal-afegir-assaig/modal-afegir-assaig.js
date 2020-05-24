import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
      >
        Afegeix un assaig
      </Button>
      <Modal
        title="Afegir assaig"
        onCancel={() => setVisible(false)}
        visible={visible}
        okText="Afegeix"
        cancelText="Tanca"
      >
        {}
      </Modal>
    </>
  );
};
