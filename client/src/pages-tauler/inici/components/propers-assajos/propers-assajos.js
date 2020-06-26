import { Card, Spin, Typography } from "antd";
import React from "react";
import { CardProperAssaig } from "../../../../components/card-proper-assaig";
import { usePropersAssajos } from "./hooks";
import "./propers-assajos.css";

export default ({ style }) => {
  const [propersAssajos, loadingPropersAssajos] = usePropersAssajos(1);

  return (
    <div style={{ margin: "0 -1rem", ...style }}>
      <Spin spinning={loadingPropersAssajos}>
        <div key={propersAssajos.id_assaig} className="propers-assajos-wrapper">
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
