import React from 'react';

export default ({ noPadding, children, style }) => (
  <div style={{ ...style, padding: noPadding ? 0 : '3rem 10rem' }}>
    {children}
  </div>
)
