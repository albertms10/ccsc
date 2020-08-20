import { Avatar, Badge, Tooltip, Typography } from "antd";
import { Soci } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { closestTimeValue, linkText } from "utils";

const { Text } = Typography;

interface CellNomSociProps {
  soci: Soci;
}

const CellNomSoci: React.FC<CellNomSociProps> = ({ soci }) => {
  const { t } = useTranslation("entity");

  return (
    <Link to={`/${linkText(t("dashboard:partners"))}/${soci.id_persona}`}>
      <div className="socis-table-username-wrapper">
        <Tooltip
          title={t(soci.data_inactiu ? "activity days" : "inactivity days", {
            days: closestTimeValue(soci.dies_activitat || 0),
          })}
        >
          <Badge dot status={soci.es_actiu ? "success" : "error"}>
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
};
export default CellNomSoci;
