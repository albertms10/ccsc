import { Form, Steps } from "antd";
import { FormInstance } from "antd/lib/form";
import moment from "moment";
import React from "react";
import { FormStep } from "./hooks/use-steps-afegir-soci";
import "./steps-afegir-soci.css";

const { Step } = Steps;

interface StepsAfegirSociProps {
  steps: FormStep[];
  form: FormInstance;
  currentPageIndex: number;
  handleChange: (current: number) => void;
  initialValues: {
    [key: string]: any;
  };
}

const StepsAfegirSoci: React.FC<StepsAfegirSociProps> = ({
  steps,
  form,
  currentPageIndex,
  handleChange,
  initialValues = {},
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

export default StepsAfegirSoci;
