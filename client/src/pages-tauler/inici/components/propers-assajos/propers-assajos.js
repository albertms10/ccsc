import { Card, Spin, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { CardProperAssaig } from "../../../../components/card-proper-assaig";
import { useAPI } from "../../../../helpers";
import "./propers-assajos.css";

export default ({ style }) => {
  const { id_persona } = useSelector(({ user }) => user.currentUser);
  const [propersAssajos, loadingPropersAssajos] = useAPI(
    `/socis/${id_persona}/propers-assajos?limit=1`
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
