import { Avatar } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { ContentList } from "../../../../standalone/content-list";
import { SmallBadge } from "../../../../standalone/small-badge";

const ContentListPersones = ({ title, integrants, loading }) => (
  <ContentList
    title={title}
    loading={loading}
    dataSource={integrants.map((integrant) => ({
      id: integrant.id_persona,
      title: integrant.nom_complet,
      description: integrant.veu,
      link: `/socis/${integrant.id_persona}`,
      avatar: (
        <SmallBadge
          count={integrant.abreviatura_veu}
          style={{
            backgroundColor: "#fff",
            color: "#999",
            boxShadow: "0 0 0 1px #d9d9d9 inset",
          }}
        >
          <Avatar shape="circle">
            {integrant.nom[0]}
            {integrant.cognoms[0]}
          </Avatar>
        </SmallBadge>
      ),
    }))}
  />
);

ContentListPersones.propTypes = {
  title: PropTypes.string,
  integrants: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

ContentListPersones.defaultProps = {
  title: "Persones",
  loading: false,
};

export default ContentListPersones;
