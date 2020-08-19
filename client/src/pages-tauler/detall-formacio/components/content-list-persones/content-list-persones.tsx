import { Avatar } from "antd";
import { Persona } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ContentList,
  ContentListBaseProps,
} from "../../../../standalone/content-list";
import { SmallBadge } from "../../../../standalone/small-badge";
import { linkText } from "../../../../utils";

interface ContentListPersonesProps extends ContentListBaseProps {
  persones: Persona[];
  itemExtra?: (persona: Persona) => React.ReactNode;
}

const ContentListPersones: React.FC<ContentListPersonesProps> = ({
  title,
  persones,
  loading = false,
  action,
  extra,
  itemExtra,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <ContentList
      title={title || t("people")}
      loading={loading}
      dataSource={persones.map((persona) => ({
        id: persona.id_persona,
        title: persona.nom_complet,
        description: persona.nom_veu,
        link: `/${linkText(t("partners"))}/${persona.id_persona}`,
        extra: itemExtra && itemExtra(persona),
        avatar: (
          <SmallBadge
            count={persona.abreviatura_veu}
            style={{
              backgroundColor: "#fff",
              color: "#999",
              boxShadow: "0 0 0 1px #d9d9d9 inset",
            }}
          >
            <Avatar shape="circle">
              {persona.nom.charAt(0)}
              {persona.cognoms.charAt(0)}
            </Avatar>
          </SmallBadge>
        ),
      }))}
      action={action}
      extra={extra}
    />
  );
};
export default ContentListPersones;
