import { Card, Spin, Typography } from "antd";
import { Assaig, Usuari } from "model";
import React from "react";
import { useSelector } from "react-redux";
import { StyledComponent } from "react-types";
import { CardProperAssaig } from "../../../../components/card-proper-assaig";
import { useAPI } from "../../../../helpers";
import { RootState } from "../../../../store/types";
import "./propers-assajos.css";

interface PropersAssajosProps extends StyledComponent {}

const PropersAssajos: React.FC<PropersAssajosProps> = ({ style }) => {
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
                Sense assajos propers
              </Typography.Text>
            </Card>
          )}
        </div>
      </Spin>
    </div>
  );
};

export default PropersAssajos;
