import React, { useEffect, useState } from 'react';
import { Card, Space, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { MultipleStatistics } from './components';

export default () => {
  const [countSocis, setCountSocis] = useState({});

  useEffect(() => {
    fetch('/api/socis/count')
      .then(res => res.json())
      .then(data => setCountSocis(data[0]));
  }, []);

  return (
    <Link to="/socis">
      <Card hoverable style={{ display: 'inline-block' }}>
        <Space size="large">
          <Statistic
            key="count_actuals"
            title="Socis actius"
            value={countSocis.count_actuals}
            style={{ display: 'inline-block' }}
          />
          <MultipleStatistics
            title="Últim trimestre"
            statistics={[
              {
                key: 'count_altes',
                value: countSocis.count_altes,
                icon: <ArrowUpOutlined />,
                color: '#3f8600',
              },
              {
                key: 'count_baixes',
                value: countSocis.count_baixes,
                icon: <ArrowDownOutlined />,
                color: '#cf1322',
              },
            ]}
          />
        </Space>
      </Card>
    </Link>
  );
}
