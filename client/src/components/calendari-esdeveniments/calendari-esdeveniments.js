import React from 'react';
import { Calendar, Card, Space } from 'antd';
import { TagEsdeveniment } from './components/tag-esdeveniment';
import { useCalendariEsdeveniments } from './hooks';

export default () => {
  const esdeveniments = useCalendariEsdeveniments();

  const cellRender = (currentDay) => {
    const esdevenimentsActuals = esdeveniments.filter(({ data_inici }) => (
        currentDay.isSame(data_inici, 'day')
      ),
    );

    return (
      <Space direction={'vertical'}>
        {esdevenimentsActuals.map(esdeveniment => (
          <TagEsdeveniment key={esdeveniment.id_esdeveniment} esdeveniment={esdeveniment} />
        ))}
      </Space>
    );
  };

  return (
    <Card>
      <Calendar dateCellRender={cellRender} />
    </Card>
  );
};
