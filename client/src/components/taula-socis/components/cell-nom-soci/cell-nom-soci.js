import { Avatar, Badge, Tooltip, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { SociPropTypes } from "../../../../typedef/prop-types-definitions";
import { closestTimeValue } from "../../../../utils";

const { Text } = Typography;

const CellNomSoci = ({ soci }) => (
  <Link to={`/socis/${soci.id_persona}`}>
    <div className="socis-table-username-wrapper">
      <Tooltip
        title={`${closestTimeValue(soci.dies_activitat)} d’${
          soci.data_inactiu ? "in" : ""
        }activitat`}
      >
        <Badge dot status={soci.es_actiu ? "success" : "danger"}>
          <Avatar className="socis-table-avatar">
            {soci.nom.charAt(0)}
            {soci.cognoms.charAt(0)}
          </Avatar>
        </Badge>
      </Tooltip>
      <div className="socis-table-username-container">
        <Text className="socis-table-username-text">{soci.nom_complet}</Text>
        <Text className="socis-table-username-text" type="secondary">
          {soci.username}
        </Text>
      </div>
    </div>
  </Link>
);

CellNomSoci.propTypes = {
  soci: SociPropTypes,
};

export default CellNomSoci;
