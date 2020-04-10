import React from 'react';
import { Badge, Tag } from 'antd';
import moment from 'moment';
import { sentenceCase } from '../../../../utils';

export default ({ esdeveniment: { id_esdeveniment, data_inici, id_estat_esdeveniment, tipus, es_extra } }) => (
  <Tag>
    <Badge
      key={id_esdeveniment}
      status={['success', 'processing', 'error', 'warning'][id_estat_esdeveniment - 1]}
      text={`
        ${moment(data_inici).format('LT')}
        ${tipus ? sentenceCase(tipus) : 'Esdeveniment'}
        ${es_extra ? 'extra' : ''}
      `}
    />
  </Tag>
)
