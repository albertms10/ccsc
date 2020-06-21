import { Space } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { IconFormacio } from "../../assets/icons";
import { FormacioPropTypes } from "../../typedef/prop-types";

const IconsFormacions = ({ formacions = [] }) => (
  <Space>
    {formacions.map((formacio) => (
      <IconFormacio key={formacio.id_formacio} name={formacio.nom_curt} />
    ))}
  </Space>
);

IconsFormacions.propTypes = {
  formacions: PropTypes.arrayOf(FormacioPropTypes).isRequired,
};

export default IconsFormacions;
