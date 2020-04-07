import React from 'react';
import { LayoutOutlined } from '@ant-design/icons';
import IconCorDeCambra from './IconCorDeCambra';

export default ({ name, style }) => {
  const icons = {
    'Cor de Cambra': <IconCorDeCambra style={style} />,
  };

  return icons[name] || <LayoutOutlined style={style} />;
}
