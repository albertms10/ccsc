import { Form, Steps } from "antd";
import { FormInstance } from "antd/lib/form";
import { BooleanMap } from "common";
import moment, { Moment } from "moment";
import { Store } from "rc-field-form/lib/interface";
import React from "react";
import { FormStep } from "./hooks/use-steps-afegir-soci";
import "./steps-afegir-soci.css";

const { Step } = Steps;

export interface FormAfegirSoci {
  nom: string;
  cognoms: string;
  id_pais: number;
  dni: string;
  naixement: string;
  email: string;
  telefon?: string;
  experiencia_musical?: string;
  estudis_musicals?: string;
  data_alta: Moment;
  acceptacions: BooleanMap;
}

interface StepsAfegirSociProps {
  steps: FormStep[];
  form: FormInstance<FormAfegirSoci>;
  currentPageIndex: number;
  handleChange: (current: number) => void;
  initialValues?: Store;
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
