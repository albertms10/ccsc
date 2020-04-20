import React from "react";
import { useParams } from "react-router-dom";
import { SubPage } from "../../../../standalone/sub-page";
import { useSoci } from "./hooks";

export default () => {
  const { idSoci } = useParams();
  const [soci] = useSoci(idSoci);

  return (
    <SubPage
      title={soci.nom_complet}
      subtitle={soci.username ?? "Sense usuari"}
    />
  );
};
