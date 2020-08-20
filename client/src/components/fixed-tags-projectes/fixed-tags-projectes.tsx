import { Projecte } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ConditionalWrapper } from "standalone/conditional-wrapper";
import { FixedTag } from "standalone/fixed-tag";
import { linkText } from "utils";

interface FixedTagsProjectesProps {
  projectes: Projecte[];
  noLink?: boolean;
}

const FixedTagsProjectes: React.FC<FixedTagsProjectesProps> = ({
  projectes = [],
  noLink = false,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <>
      {projectes.map((projecte) => (
        <FixedTag
          key={projecte.id_projecte}
          childKey={projecte.id_projecte}
          tooltip={projecte.titol}
          color={`#${projecte.color}`}
        >
          <ConditionalWrapper
            condition={!noLink}
            wrapper={(children) => (
              <Link to={`/${linkText(t("projects"))}/${projecte.id_projecte}`}>
                {children}
              </Link>
            )}
          >
            {projecte.inicials}
          </ConditionalWrapper>
        </FixedTag>
      ))}
    </>
  );
};

export default FixedTagsProjectes;
