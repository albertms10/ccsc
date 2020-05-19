import { Form, Steps } from "antd";
import moment from "moment";
import React from "react";
import "./steps-afegir-soci.css";

const { Step } = Steps;

export default ({
  steps,
  form,
  currentPageIndex,
  handleChange,
  initialValues,
}) => (
  <>
    <Steps current={currentPageIndex} size="small" onChange={handleChange}>
      {steps.map(({ key, title }) => (
        <Step key={key} title={title} />
      ))}
    </Steps>
    <div className="steps-content">
      <Form
        className="form-afegir-soci"
        colon={false}
        form={form}
        initialValues={{ ...initialValues, data_alta: moment() }}
      >
        {steps.map(({ key, content }, index) => (
          <div
            key={key}
            style={{ display: currentPageIndex === index ? "block" : "none" }}
          >
            {content}
          </div>
        ))}
      </Form>
    </div>
  </>
);
