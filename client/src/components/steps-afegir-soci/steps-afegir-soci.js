import { Form, Steps } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import "./steps-afegir-soci.css";

const { Step } = Steps;

const StepsAfegirSoci = ({
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

StepsAfegirSoci.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  form: PropTypes.any.isRequired,
  currentPageIndex: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

export default StepsAfegirSoci;
