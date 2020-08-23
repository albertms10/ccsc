import { Card, Spin, Typography } from "antd";
import { CardProperAssaig } from "components/card-proper-assaig";
import { useAPI } from "helpers";
import { Assaig, Usuari } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { StyledComponent } from "react-types";
import { RootState } from "store/types";
import "./propers-assajos.css";

type PropersAssajosProps = StyledComponent

const PropersAssajos: React.FC<PropersAssajosProps> = ({ style }) => {
  const { t } = useTranslation("dashboard");

  const { id_persona } = useSelector(
    ({ user }: RootState) => user.currentUser
  ) as Usuari;

  const [propersAssajos, loadingPropersAssajos] = useAPI<Assaig[]>(
    `/socis/${id_persona}/propers-assajos?limit=1`,
    []
  );

  return (
    <div style={{ margin: "0 -1rem", ...style }}>
      <Spin spinning={loadingPropersAssajos}>
        <div className="propers-assajos-wrapper">
          {propersAssajos.length > 0 ? (
            <CardProperAssaig assaig={propersAssajos[0]} />
          ) : (
            <Card>
              <Typography.Text type="secondary">
                {t("no upcoming rehearsals")}
              </Typography.Text>
            </Card>
          )}
        </div>
      </Spin>
    </div>
  );
};

export default PropersAssajos;
