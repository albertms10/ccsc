import React from 'react';

import './container.css';

export default ({ noPadding, noBackground, children, style }) => (
  <div
    style={{
      padding: noPadding ? 0 : '3rem 10rem',
      backgroundColor: noBackground ? 'none' : '#f4f5f7',
      ...style,
    }}
  >
    {children}
  </div>
)
