import React from 'react';
import moment from 'moment';
import { Calendar, Space } from 'antd';
import { CalendarTag } from '../../../../standalone/calendar-tag';
import { useCalendariEsdeveniments } from './hooks';
import { upperCaseFirst } from '../../../../utils';

import './calendari-agrupacio.css';

export default () => {
  const esdeveniments = useCalendariEsdeveniments();

  const cellRender = (currentDay) => {
    const esdevenimentsActuals = esdeveniments.filter(({ data_inici }) => (
        currentDay.isSame(data_inici, 'day')
      ),
    );

    return (
      <Space direction={'vertical'}>
        {esdevenimentsActuals.map(({ id_esdeveniment, data_inici, tipus, es_general, es_extra }) => (
          <CalendarTag
            key={id_esdeveniment}
            childDey={id_esdeveniment}
            statusId={id_esdeveniment - 1}
            time={moment(data_inici).format('LT')}
            text={`
              ${tipus ? upperCaseFirst(tipus) : 'Esdeveniment'}
              ${es_general ? 'general' : ''}
              ${es_extra ? 'extra' : ''}
            `}
          />
        ))}
      </Space>
    );
  };

  return (
    <Calendar dateCellRender={cellRender} />
  );
};
