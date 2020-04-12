import React, { useState } from 'react';
import moment from 'moment';
import { Popover, Tag } from 'antd';
import { CalendarEventPopover } from '../calendar-event-popover';
import { StatusBadge } from '../status-badge';

import './calendar-tag.css';

export default ({ childKey, event }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibility = (visible) => setVisible(visible);

  return (
    <Popover
      visible={visible}
      content={<CalendarEventPopover hidePopover={() => setVisible(false)} event={event} />}
      trigger="click"
      onVisibleChange={handleVisibility}
      style={{ width: 600 }}
    >
      <Tag className="calendar-tag" key={childKey} style={{ opacity: moment().isAfter(event.data_inici) ? .6 : 1 }}>
        <StatusBadge tooltip={event.estat_esdeveniment} statusId={event.id_estat_esdeveniment} />
        {event.hora_inici
          ? <span className="calendar-tag-time">
              {moment(`${event.dia_inici} ${event.hora_inici}`).format('LT')}
            </span>
          : ''
        }
        <b className="calendar-tag-title">{event.titol}</b>
      </Tag>
    </Popover>
  );
}
