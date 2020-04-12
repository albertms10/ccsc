import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { AreaChart } from '@opd/g2plot-react';

export default ({ title, description }) => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetch('/api/socis/historial')
      .then(res => res.json())
      .then(data => setHistorial(data));
  }, []);

  return (
    <Card>
      <AreaChart
        title={{ text: title, visible: !!title }}
        description={{ text: description, visible: !!description }}
        data={historial}
        xField="trimestre"
        yField="socis"
        smooth={true}
        meta={{
          trimestre: { alias: 'Trimestre' },
          socis: { alias: 'Socis' },
        }}
        yAxis={{ min: 0 }}
      />
    </Card>
  );
}
