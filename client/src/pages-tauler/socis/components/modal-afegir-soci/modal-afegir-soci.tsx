import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { ModalButton } from "../../../../components/modal-button";
import { StepsAfegirSoci } from "../../../../components/steps-afegir-soci";
import { useStepsAfegirSoci } from "../../../../components/steps-afegir-soci/hooks";
import { fetchSocis } from "../../../../store/socis/thunks";

const ModalAfegirSoci: React.FC = () => {
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
    modalButtonRef.current!.setVisible();
    setCurrentPageIndex(0);
    form.resetFields();
  });

  return (
    <ModalButton
      ref={modalButtonRef}
      title="Afegir persona associada"
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
