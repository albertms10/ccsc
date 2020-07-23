import { Projecte } from "model";
import React from "react";
import { Link } from "react-router-dom";
import { FixedTag } from "../../standalone/fixed-tag";

interface FixedTagsProjectesProps {
  projectes: Projecte[];
}

const FixedTagsProjectes: React.FC<FixedTagsProjectesProps> = ({
  projectes = [],
}) => (
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

export default FixedTagsProjectes;
