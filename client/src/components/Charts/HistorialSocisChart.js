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
          { year: '1991', value: 3 },
          { year: '1992', value: 4 },
          { year: '1993', value: 3.5 },
          { year: '1994', value: 5 },
          { year: '1995', value: 4.9 },
          { year: '1996', value: 6 },
          { year: '1997', value: 7 },
          { year: '1998', value: 9 },
          { year: '1999', value: 13 },
        ]}
        xField="year"
        yField="value"
        smooth={true}
        meta={{
          year: { alias: 'Any' },
          value: { alias: 'Valor' },
        }}
      />
    </Card>
  );
}
