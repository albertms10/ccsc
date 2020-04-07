import React, { useEffect, useState } from 'react';
import { Calendar, Card, Space } from 'antd';
import TagEsdeveniment from './components/TagEsdeveniment';

export default () => {
  const [esdeveniments, setEsdeveniments] = useState([]);

  useEffect(() => {
    fetch('/api/esdeveniments')
      .then(res => res.json())
      .then(data => setEsdeveniments(data));
  }, []);

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
