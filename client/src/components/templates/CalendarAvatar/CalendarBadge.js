import React from 'react';

import './styles.css';

export default ({ moment }) => (
  <div className="calendar-badge">
    <div className="calendar-badge-month">{moment.format('MMM')}</div>
    <div className="calendar-badge-date">{moment.date()}</div>
  </div>
)
