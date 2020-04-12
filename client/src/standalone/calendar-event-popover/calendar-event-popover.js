import React from 'react';
import moment from 'moment';
import { Col, Row, Space } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { BorderlessButton } from '../borderless-button';
import { StatusBadge } from '../status-badge';

export default ({ event }) => (
  <>
    <Space direction="vertical" style={{ width: '20rem' }}>
      <Row>
        <Col span={18}>
          <Space size="middle">
            <StatusBadge
              tooltip={event.estat_esdeveniment}
              statusId={event.id_estat_esdeveniment}
              style={{ transform: 'scale(1.8) translate(5px)' }}
            />
            <div style={{ fontSize: 'large' }}>{event.titol}</div>
          </Space>
        </Col>
        <Col span={6} style={{ textAlign: 'end' }}>
          <BorderlessButton size="small" icon={<EditFilled />}>Edita</BorderlessButton>
        </Col>
      </Row>
      <div style={{ marginLeft: '1.9rem', color: '#333' }}>
        {moment(event.dia_inici).format('dddd, LL')}
        <span style={{ padding: '0 .25rem' }}>·</span>
        {moment(`${event.dia_inici} ${event.hora_inici}`).format('LT') + (event.hora_final ? '–' + moment(`${event.dia_final} ${event.hora_final}`).format('LT') : '')}
      </div>
    </Space>
  </>
)
