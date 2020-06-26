import { Card, Spin, Typography } from "antd";
import React from "react";
import { CardProperAssaig } from "../../../../components/card-proper-assaig";
import { usePropersAssajos } from "./hooks";
import "./propers-assajos.css";

export default ({ style }) => {
  const [properAssaig, loadingProperAssaig] = usePropersAssajos(1);

  return (
    <div style={{ margin: "0 -1rem", ...style }}>
      <Spin spinning={loadingProperAssaig}>
        <div key={properAssaig.id_assaig} className="propers-assajos-wrapper">
          {properAssaig.length > 0 ? (
            <CardProperAssaig assaig={properAssaig} />
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
