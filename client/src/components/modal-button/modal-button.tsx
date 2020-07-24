import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { cloneElement, useState } from "react";
import { useStatePair } from "react-types";

export interface ModalButtonBaseProps {
  title?: string;
  button?: React.ReactElement;
  wrapClassName?: string;
}

interface ModalButtonProps extends ModalButtonBaseProps {
  okText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
  onOk?: (setVisible: React.Dispatch<React.SetStateAction<boolean>>) => void;
  onClick?: Function;
  footer?: React.ReactNode | null;
  renderModalBody: ([visible, setVisible]: useStatePair<
    boolean
  >) => React.ReactNode;
}

const ModalButton: React.FC<ModalButtonProps> = ({
  title,
  button = (
    <Button type="primary" icon={<PlusOutlined />}>
      Afegeix
    </Button>
  ),
  okText = "Afegeix",
  cancelText = "Tanca",
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
        onOk={() => onOk && onOk(setVisible)}
        footer={footer}
        wrapClassName={wrapClassName}
      >
        {renderModalBody([visible, setVisible])}
      </Modal>
    </>
  );
};

export default ModalButton;
