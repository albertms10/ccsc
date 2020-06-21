import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import PropTypes from "prop-types";
import React, { cloneElement, useState } from "react";

const ModalButton = ({
  title,
  button = (
    <Button type="primary" icon={<PlusOutlined />}>
      Nou assaig
    </Button>
  ),
  okText,
  cancelText,
  confirmLoading = false,
  onOk,
  footer,
  renderModalBody,
  wrapClassName,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {cloneElement(button, {
        ...rest,
        onClick: () => {
          if (button.props.onClick) button.props.onClick();
          if (rest.onClick) rest.onClick();
          setVisible(true);
        },
      })}
      <Modal
        title={title}
        visible={visible}
        onCancel={() => setVisible(false)}
        okText={okText}
        cancelText={cancelText}
        confirmLoading={confirmLoading}
        onOk={() => onOk(setVisible)}
        footer={footer}
        wrapClassName={wrapClassName}
      >
        {renderModalBody([visible, setVisible])}
      </Modal>
    </>
  );
};

ModalButton.propTypes = {
  title: PropTypes.string,
  button: PropTypes.node,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmLoading: PropTypes.bool,
  onOk: PropTypes.func,
  footer: PropTypes.node,
  renderModalBody: PropTypes.func.isRequired,
  wrapClassName: PropTypes.string,
};

export default ModalButton;
