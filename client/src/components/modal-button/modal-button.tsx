import { Modal } from "antd";
import React, { cloneElement, forwardRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useStatePair } from "react-types";
import { ActionButton } from "standalone/action-button";

export interface ModalButtonBaseProps {
  title?: string;
  button?: React.ReactElement;
  wrapClassName?: string;
  width?: number;
}

interface ModalButtonProps extends ModalButtonBaseProps {
  okText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
  onOk?: (setVisible: React.Dispatch<React.SetStateAction<boolean>>) => void;
  onClick?: () => void;
  footer?: React.ReactNode | null;
  renderModalBody: ([visible, setVisible]: useStatePair<
    boolean
  >) => React.ReactNode;
}

const ModalButton = forwardRef<HTMLButtonElement, ModalButtonProps>(
  (
    {
      title,
      button = <ActionButton mainAction={title as string} />,
      okText,
      cancelText,
      confirmLoading = false,
      onOk,
      width,
      footer,
      renderModalBody,
      wrapClassName,
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation("common");

    const [visible, setVisible] = useState(false);

    useEffect(() => {
      // TODO: Trobar una millor manera d’assignar funcions a una `ref`
      if (ref) {
        // @ts-ignore
        ref.current = {};
        // @ts-ignore
        ref.current.setVisible = setVisible;
      }
    }, [ref]);

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
          okText={okText || t("add")}
          cancelText={cancelText || t("close")}
          confirmLoading={confirmLoading}
          onOk={() => onOk && onOk(setVisible)}
          footer={footer}
          width={width}
          wrapClassName={wrapClassName}
        >
          {renderModalBody([visible, setVisible])}
        </Modal>
      </>
    );
  }
);

ModalButton.displayName = "ModalButton";

export default ModalButton;
