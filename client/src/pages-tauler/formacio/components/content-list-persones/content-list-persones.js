import { Avatar } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { ContentList } from "../../../../standalone/content-list";
import { SmallBadge } from "../../../../standalone/small-badge";

const ContentListPersones = ({ title, persones, loading, extra }) => (
  <ContentList
    title={title}
    loading={loading}
    dataSource={persones.map((persona) => ({
      id: persona.id_persona,
      title: persona.nom_complet,
      description: persona.veu,
      link: `/socis/${persona.id_persona}`,
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
            {persona.nom[0]}
            {persona.cognoms[0]}
          </Avatar>
        </SmallBadge>
      ),
    }))}
    extra={extra}
  />
);

ContentListPersones.propTypes = {
  title: PropTypes.string,
  persones: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  extra: PropTypes.node,
};

ContentListPersones.defaultProps = {
  title: "Persones",
  loading: false,
};

export default ContentListPersones;
