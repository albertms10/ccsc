import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { FixedTag } from "../../standalone/fixed-tag";
import { ProjectePropTypes } from "../../typedef/prop-types-definitions";

const FixedTagsProjectes = ({ projectes = [] }) => (
  <>
    {projectes.map((projecte) => (
      <FixedTag
        key={projecte.id_projecte}
        childKey={projecte.id_projecte}
        tooltip={projecte.titol}
        color={"#" + projecte.color}
      >
        <Link to={`/projectes/${projecte.id_projecte}`}>
          {projecte.inicials}
        </Link>
      </FixedTag>
    ))}
  </>
);

FixedTagsProjectes.propTypes = {
  projectes: PropTypes.arrayOf(ProjectePropTypes),
};

export default FixedTagsProjectes;
