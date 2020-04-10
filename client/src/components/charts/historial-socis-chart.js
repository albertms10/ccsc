import React from 'react';
import { Card } from 'antd';
import { LineChart } from '@opd/g2plot-react';

export default ({ title, description }) => {
  return (
    <Card>
      <LineChart
        title={{ text: title, visible: !!title }}
        description={{ text: description, visible: !!description }}
        data={[
          { year: '2016', value: 8 },
          { year: '2017', value: 10 },
          { year: '2018', value: 10 },
          { year: '2019', value: 13 },
          { year: '2020', value: 14 },
        ]}
        xField="year"
        yField="value"
        smooth={true}
        meta={{
          year: { alias: 'Any' },
          value: { alias: 'Socis' },
        }}
      />
    </Card>
  );
}
