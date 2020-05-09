import { Steps } from "antd";
import React from "react";
import { FormAfegirSoci } from "./components/form-afegir-soci";

const { Step } = Steps;

export default ({
  steps,
  form,
  currentPageIndex,
  handleChange,
  username,
  loadingUsername,
  alertProteccio,
  setAlertProteccio,
}) => {
  return (
    <>
      <Steps current={currentPageIndex} size="small" onChange={handleChange}>
        {steps.map((step) => (
          <Step key={step} title={step} />
        ))}
      </Steps>
      <div className="steps-content">
        <FormAfegirSoci
          form={form}
          currentPageIndex={currentPageIndex}
          username={username}
          loadingUsername={loadingUsername}
          alertProteccio={alertProteccio}
          setAlertProteccio={setAlertProteccio}
        />
      </div>
    </>
  );
};
