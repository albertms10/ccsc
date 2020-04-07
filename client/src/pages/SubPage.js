import React from 'react';
import { PageHeader } from 'antd';
import { RightOutlined } from '@ant-design/icons';

import Page from './Page';

import './styles.css';

export default ({ routes, title, subtitle, action, children }) => (
  <>
    <PageHeader
      className="site-page-header"
      title={title}
      breadcrumb={{ separator: <RightOutlined />, routes }}
      subTitle={subtitle}
      extra={[action]}
    />
    <Page>
      {children}
    </Page>
  </>
)
