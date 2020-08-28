import { ModalButton } from "components/modal-button";
import { StepsAfegirSoci } from "components/steps-afegir-soci";
import { useStepsAfegirSoci } from "components/steps-afegir-soci/hooks";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { fetchSocis } from "store/socis/thunks";

const ModalAfegirSoci: React.FC = () => {
  const { t } = useTranslation("actions");

  const dispatch = useDispatch();

  const modalButtonRef = useRef(null);

  const {
    steps,
    form,
    footerActions,
    handleChange,
    currentPageIndex,
    setCurrentPageIndex,
  } = useStepsAfegirSoci(() => {
    dispatch(fetchSocis());
    // @ts-ignore
    modalButtonRef.current && modalButtonRef.current.setVisible();
    setCurrentPageIndex(0);
    form.resetFields();
  });

  return (
    <ModalButton
      ref={modalButtonRef}
      title={t("add partner")}
      width={720}
      footer={footerActions}
      renderModalBody={() => (
        <StepsAfegirSoci
          steps={steps}
          form={form}
          currentPageIndex={currentPageIndex}
          handleChange={handleChange}
        />
      )}
    />
  );
};

export default ModalAfegirSoci;
