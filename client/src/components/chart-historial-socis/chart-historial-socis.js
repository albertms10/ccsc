import React from 'react';
import { Card } from 'antd';
import { AreaChart } from '@opd/g2plot-react';
import useHistorialSocis from './hooks/useHistorialSocis';

export default ({ title, description }) => {
  const historial = useHistorialSocis();

  return (
    <Card>
      <AreaChart
        title={{ text: title, visible: !!title }}
        description={{ text: description, visible: !!description }}
        data={historial}
        xField="trimestre"
        yField="socis"
        color="#3f8dc4"
        meta={{
          trimestre: { alias: "Trimestre" },
          socis: { alias: "Socis" },
        }}
        yAxis={{ min: 0 }}
      />
    </Card>
  );
};
